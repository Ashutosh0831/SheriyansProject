import { generateAiContnet } from "@/lib/gemini";
import { generateSkillsBody } from "@/types/ai.types";
import { apiResponse } from "@/types/api.types";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest){
    try{

        const body: generateSkillsBody = await req.json();

        const{experienceLevel, jobTitle} = body;

        if(!experienceLevel || !jobTitle) return NextResponse.json({
            success: false,
            message: "All fields are required"
        },{
            status: 400
        })

        const prompt = ` You are an expert resume writer and ATS optimization specialist.

Generate a relevant, professional, and ATS-friendly skills list for a resume using the following details:

Job Title: ${jobTitle} Experience Level: ${experienceLevel}

Instructions:

Generate 8 to 15 relevant skills tailored to the specified job title and experience level.
Prioritize technical skills, job-specific competencies, tools, technologies, and relevant professional skills.
Include relevant keywords commonly used in job descriptions for the target role to improve ATS compatibility.
Use the existing skills as a reference and include relevant additional skills where appropriate.
Avoid duplicate skills, overly generic terms, and unrelated competencies.
Do not invent certifications, qualifications, or claim proficiency that has not been established.
Use concise, industry-standard skill names.
Prefer hard skills and technical competencies over generic soft skills.
Return the skills as a single line of plain text, separated by commas.
Do not include headings, labels, bullet points, numbering, explanations, markdown formatting, or introductory text.

Strict output requirements:

Generate 8 to 15 skills.
Output only the comma-separated skills list array.
Ensure the output is ATS-friendly and ready to paste directly into a resume.

`;
     const result =  await generateAiContnet(prompt)

     const skills = result

     return NextResponse.json<apiResponse>({
        success: true,
        message: "Skills are generated successfully.",
        data:{
            skills
        }
     },{
        status: 201
     })

    }catch(error){
        console.log("An error occured in skills genearation ", error)
        return NextResponse.json<apiResponse>({
            success: false,
            message: "An error occured",
        },{
            status: 500
        })
    }
}