import {connect} from '@/dbConfig/dbConfig';
import Admin from '@/models/adminModel';
import { NextRequest, NextResponse } from 'next/server';
import jwt from 'jsonwebtoken'

export async function POST(request : NextRequest){
    try {
        await connect()
        const req = await request.json()
        const {email, password} = req;
        console.log(req);

        const admin = await Admin.findOne({email})
        if(!admin){
            return NextResponse.json({error: "admin does not exist"}, {status: 400})

        }
        const isValidPassword = await (password == admin.password)
        if(!isValidPassword){
            return NextResponse.json({error: "Invalid password"}, {status: 400})
        }

        const tokenData = {
            id: admin._id,
            email: admin.email,
            isAdmin : true
        }

        const token = jwt.sign(tokenData, "TOKEN_SECRET", {expiresIn: '10d'})
        const response = NextResponse.json({
            token: token,
            message : 'Login Succesful', 
            success : true,
        })

        response.cookies.set("token", token, {
            httpOnly : true
        })

        return response;


    } catch (error : any) {
        return NextResponse.json({error : error.message}, {status : 500})
    }
}