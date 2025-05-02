import {connect} from '@/dbConfig/dbConfig';
import User from '@/models/userModel';
import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';
import jwt from 'jsonwebtoken'

export async function POST(request : NextRequest){
    try {
        await connect()
        const req = await request.json()
        const {email, password} = req;
        console.log('Login attempt for:', email);

        const user = await User.findOne({email})
        if(!user){
            console.log('User not found:', email);
            return NextResponse.json({error: "User does not exist"}, {status: 400})
        }

        const isValidPassword = await bcrypt.compare(password, user.password)
        if(!isValidPassword){
            console.log('Invalid password for:', email);
            return NextResponse.json({error: "Invalid password"}, {status: 400})
        }

        const tokenData = {
            id: user._id,
            email: user.email,
            isAdmin: false
        }

        const token = jwt.sign(tokenData, "TOKEN_SECRET", {expiresIn: '1d'})
        console.log('Token generated for:', email);

        const response = NextResponse.json({
            message: 'Login Successful', 
            success: true,
            user: {
                email: user.email,
                isAdmin: false
            }
        })

        response.cookies.set("token", token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            sameSite: 'strict',
            path: '/',
            maxAge: 24 * 60 * 60 // 1 day in seconds
        })

        return response;

    } catch (error: any) {
        console.error('Login error:', error);
        return NextResponse.json({error: error.message}, {status: 500})
    }
}