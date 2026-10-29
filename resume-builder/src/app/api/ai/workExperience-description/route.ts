import { generateAiContnet } from "@/lib/gemini";
import { generateWorkExperienceDescBody } from "@/types/ai.types";
import { apiResponse } from "@/types/api.types";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest){

    try{
        const body: generateWorkExperienceDescBody = await req.json();

        const {experienceLevel, skills, companyName, workDuration, workedAs} = body
        if(!experienceLevel || !skills || !companyName || !workDuration || !workedAs) return NextResponse.json({
            success: false,
            message: "All fields are required",
        },{
            status: 400
        })

        const prompt = ` You are an expert resume writer specializing in professional, ATS-friendly resumes.

Generate a tailored work experience section using the following details:

Experience Level: ${experienceLevel} Skills: ${skills} Company Name: ${companyName} Work Duration: ${workDuration} Job Title: ${workedAs}

Instructions:

Generate 3 to 5 concise, impactful, and professional work experience points.
in bullet points.
Tailor every point to the job title, experience level, and provided skills.
Start each point with a strong action verb, such as Developed, Implemented, Designed, Managed, Optimized, or Maintained.
Incorporate relevant technical skills and industry keywords naturally to improve ATS compatibility.
Focus on relevant responsibilities, technical contributions, problem-solving, and professional accomplishments.
Do not invent projects, responsibilities, achievements, technologies, metrics, or business outcomes.
If specific responsibilities are not provided, generate general role-relevant examples without presenting unsupported claims as verified facts.
Never fabricate employment history. If the experience level indicates a fresher, focus on relevant practical skills and appropriate entry-level contributions without implying unverified professional experience.
Use past tense for completed employment and present tense for current employment only when the status is clear.
Keep each point concise, specific, grammatically correct, and recruiter-friendly.
Use measurable results only when supported by the provided information.
Do not repeat the same skills or responsibilities unnecessarily.

Strict Output Requirements:

Generate 3 to 5 numbered points.
Return only sumary not points.
Do not include headings, company names, job titles, dates, introductions, explanations, Markdown formatting, or additional commentary.
Ensure the output is ready to use in a resume builder.
`;

   const result = await generateAiContnet(prompt);

   const workExperienceDesc = result;

   return NextResponse.json<apiResponse>({
    success: true,
    message: "Work Experience Description created successfully.",
    data:{
        workExperienceDesc
    },
   },{
    status: 201
   })

   
    }catch(error){
        console.log("An error occured at wrok experience generation", error)
        return NextResponse.json<apiResponse>({
            success: false,
            message: "An error occurred",
        },{
            status: 500
        })
    }
}