import { NextResponse } from "next/server";

export async function GET(){
    try {
        const res = await NextResponse.json(
            {
                message : "logout success",
                success : true
            }
        )
        res.cookies.set("token", "", { httpOnly : true, expires : new Date(0) });
        return res;
    } catch (error : any) {
        return NextResponse.json({error : error.message}, {status : 500})
    }
}