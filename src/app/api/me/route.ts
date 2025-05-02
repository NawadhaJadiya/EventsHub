import { NextResponse, NextRequest } from 'next/server';
import jwt from 'jsonwebtoken';

export async function GET(request: NextRequest) {
    const token = request.cookies.get('token')?.value;
    console.log('Token received in /api/me:', token ? 'Present' : 'Missing');

    if (!token) {
        console.log('No token found in /api/me request');
        return NextResponse.json({ 
            isLoggedIn: false,
            error: 'No authentication token found'
        }, { status: 401 });
    }

    try {
        const decoded: any = jwt.verify(token, 'TOKEN_SECRET');
        console.log('Token successfully decoded:', {
            isAdmin: decoded.isAdmin,
            email: decoded.email,
            id: decoded.id
        });
        
        return NextResponse.json({
            isLoggedIn: true,
            isAdmin: decoded.isAdmin,
            email: decoded.email,
            id: decoded.id,
        });
    } catch (err) {
        console.error('Token verification failed:', err);
        return NextResponse.json({ 
            isLoggedIn: false,
            error: 'Invalid or expired token'
        }, { status: 401 });
    }
}
