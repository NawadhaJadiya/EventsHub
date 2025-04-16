import {connect} from '@/dbConfig/dbConfig';
import User from '@/models/userModel';
import { NextRequest, NextResponse } from 'next/server';
import bcrypt from 'bcryptjs';


export async function POST(request : NextRequest){
    try {
        await connect();
        const reqBody = await request.json()
        const {name, email, instituteName, enrollmentNumber, phoneNumber, course, branch_specialization, admissionYear, password} = reqBody

        console.log(reqBody)

        if (!email || !password || !name || !instituteName || !enrollmentNumber || !phoneNumber || !course || !branch_specialization || !admissionYear) {
            return NextResponse.json(
                { error: "All fields are required" },
                { status: 400 }
            );
        }

        const existingUser = await User.findOne({
            $or: [
                { email },
                { enrollmentNumber },
                { phoneNumber},
            ]
        });

        if (existingUser) {
            return NextResponse.json(
                { error: "User with this email or enrollment number or phone number already exists" },
                { status: 400 }
            );
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt)

        const newUser = new User({
            name, 
            email, 
            instituteName,
            enrollmentNumber,
            phoneNumber,
            course,
            branch_specialization,
            admissionYear,
            password : hashedPassword
        });

        const savedUser = await newUser.save()

        console.log(savedUser)

        return NextResponse.json({
            message: "User created successfully",
            user: {
                id: savedUser._id,
                name: savedUser.name,
                email: savedUser.email
            }
        }, {status : 201})
    } catch (error : any) {
        console.error('Signup error:', error);
        
        if (error.name === 'ValidationError') {
            return NextResponse.json(
                { error: error.message },
                { status: 400 }
            );
        }
        
        if (error.code === 11000) {
            return NextResponse.json(
                { error: "User with this email or enrollment number already exists" },
                { status: 400 }
            );
        }

        return NextResponse.json({error : "Internal server error"}, {status : 500})
    }
}