import { connectDb } from "@/lib/db";
import { getUser } from "@/lib/getUser";
import resumeModel from "@/models/resume";
import { apiResponse } from "@/types/api.types";
import { NextRequest, NextResponse } from "next/server";

export async function GET(req: NextRequest,{params}:{params:Promise<{resumeId:string}>}){
    try{
        await connectDb()

        const userId = await getUser();

        const {resumeId} = await params;

        const resume = await resumeModel.findOne({_id: resumeId,userId})

        if(!resume) return NextResponse.json<apiResponse>({
            success: false,
            message: "Resume not found"
        },{
            status: 404
        })

        return NextResponse.json<apiResponse>({
            success: true,
            message: "resume fetched success fully",
            data:{
                resume
            }
        },{
            status:200
        })
        
    }catch(error){
        console.log("An error occur at resumeid", error);
        return NextResponse.json<apiResponse>({
            success: false,
            message:"An error occurred"
        },{
            status:500
        })
    }
}


export async function PATCH(req: NextRequest,{params}:{params:Promise<{resumeId:string}>}){
    try{
        await connectDb()

        const userId = await getUser();

        const body = await req.json()

        const {resumeId} = await params;
        const allowedFields = [
            "title",
            "summary",
            "personalInfo",
            "workExperience",
            "projects",
            "education",
            "certifications",
            "Skills",
        ] as const;
        const updates = Object.fromEntries(
            allowedFields
                .filter((field) => Object.hasOwn(body, field))
                .map((field) => [field, body[field]])
        );

        const updateResume = await resumeModel.findOneAndUpdate({
            _id: resumeId,
            userId
        }, {
            $set: updates,
        }, {
            new: true,
            runValidators: true
        })

        if(!updateResume) return NextResponse.json<apiResponse>({
            success: false,
            message: "updateResume failed to update"
        },{
            status: 400
        })

        return NextResponse.json<apiResponse>({
            success: true,
            message: "resume updated success fully",
            data:{
                updateResume
            }
        },{
            status:200
        })
        
    }catch(error){
        console.log("An error occur at resumeid", error);
        return NextResponse.json<apiResponse>({
            success: false,
            message:"An error occurred"
        },{
            status:500
        })
    }
}

export async function DELETE(
    _req: NextRequest,
    { params }: { params: Promise<{ resumeId: string }> },
) {
    try {
        await connectDb();
        const userId = await getUser();
        const { resumeId } = await params;
        const deleted = await resumeModel.findOneAndDelete({
            _id: resumeId,
            userId,
        });

        if (!deleted) {
            return NextResponse.json<apiResponse>(
                { success: false, message: "Resume not found" },
                { status: 404 },
            );
        }

        return NextResponse.json<apiResponse>(
            { success: true, message: "Resume deleted successfully" },
            { status: 200 },
        );
    } catch (error) {
        console.log("An error occurred while deleting resume", error);
        return NextResponse.json<apiResponse>(
            { success: false, message: "An error occurred" },
            { status: 500 },
        );
    }
}