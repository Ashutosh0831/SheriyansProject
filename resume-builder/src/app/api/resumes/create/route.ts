import { connectDb } from "@/lib/db";
import { getUser } from "@/lib/getUser";
import resumeModel from "@/models/resume";
import { NextResponse } from "next/server";


export async function POST(){
    try{
        await connectDb()

        const user_id = await getUser()

        const newResume = await resumeModel.create({
            userId: user_id,
            title: 'Untitled resume',
            summary: '',
            personalInfo: {},
            workExperience: [],
            projects: [],
            education: [],
            certifications: '',
            Skills: [],
        })

        return NextResponse.json({
            success: true,
            message: "Resume Created successfully.",
            data: newResume
        },{
            status: 201
        })

        

    }catch(error){
        console.log("An error occured at resume:", error);
        return NextResponse.json({
            success: false,
            message: "Something went wrong",
            error:{
                error
            }
        },{
            status: 500
        })
    }
}