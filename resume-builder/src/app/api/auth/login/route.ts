import { connectDb } from "@/lib/db";
import { generateToken } from "@/lib/jwt";
import { userModel } from "@/models/user";
import { apiResponse } from "@/types/api.types";
import { loginBody } from "@/types/user.types";
import { log } from "console";
import { NextRequest, NextResponse } from "next/server";



export async function POST(req: NextRequest){

    try{

        await connectDb()
        
        const body: loginBody = await req.json() 

        const {email, password} = body

        if(!email || !password){
            return NextResponse.json<apiResponse>({
                success: false,
                message: "All fields are required"
            },{
                status: 400
            })
        }

        const isUser = await userModel.findOne({email})

        if(!isUser){
            return NextResponse.json({
                success: false,
                message: "User does not exists."
            },{
                status: 404
            })
        }

        const matchPass = isUser.comparePass(password)

        if(!matchPass) return NextResponse.json({
            success: false,
            message: "Invalid Credentials"
        },{
            status: 401
        })

        const token = generateToken({
            userId: isUser._id.toString()
        })

        const response = NextResponse.json({
            success: true,
            message: "User logged in successfully"
        },{
            status: 200
        })

        response.cookies.set('token', token,{
            httpOnly: true,
            sameSite: 'lax',
            maxAge: 60 * 60 * 1000
        })

        return response
        

    }catch(error){
        log("An error occurred in login", error)
        return NextResponse.json({
            success: false,
            message: "An error occured",
            errror: {
                error
            }
        },{
            status: 500
        })
    }
}