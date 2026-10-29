import { connectDb } from "@/lib/db";
import { generateToken } from "@/lib/jwt";
import { userModel } from "@/models/user";
import { apiResponse } from "@/types/api.types";
import { registerBody } from "@/types/user.types";
import { log } from "console";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest){
    try{

        await connectDb()

        const body: registerBody =await req.json()

        const {name, email, password, phone} = body

        if(!name || !email || !password){
            return NextResponse.json<apiResponse>({
                success: false, message: "All fields are required"
            },{
                status: 400
            })
        }

        const isUser = await userModel.findOne({email})

        if(isUser){
            return NextResponse.json<apiResponse>({
                success: false,
                message: "User already exists."
            },{
                status: 409
            })
        }

        const user = await userModel.create({
            name, email, password, phone
        })

        const token = generateToken({userId:user._id.toString()})

        const response = NextResponse.json({
            success: true, 
            message: "User registred successfully",
            data:{
                _id: user._id,
                name: user.name,
                email: user.email,
                phone: user.phone,
            }
        }, {
            status: 201
        })

        response.cookies.set('token', token,{
            httpOnly: true,
            sameSite: 'lax',
            maxAge: 60 * 60 * 1000
        })

        return response


    }catch(err){
        log("Error in register api", err)
        return NextResponse.json<apiResponse>({
            success: false,
            message: "An error occurred saving",
            error: {
                err
            }
        },{
            status: 500
        })
    }
}