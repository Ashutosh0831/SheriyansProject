import { generateAiContnet } from "@/lib/gemini";
import { generateProjectDescBody } from "@/types/ai.types";
import { apiResponse } from "@/types/api.types";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest){

    try{
        const body: generateProjectDescBody = await req.json();

    const {projectName, projectIdea, techStack} = body;

    if(!projectName || !projectIdea || !techStack) return NextResponse.json({
        success: false,
        message: "All fields are required"
    },{
        status: 400
    })

    const prompt = ` You are an expert resume writer specializing in ATS-friendly project descriptions.

Generate a professional and concise project description using the following details:

Project Name: ${projectName} Project Idea: ${projectIdea} Tech Stack: ${techStack}

Instructions:

Generate 3 to 5 concise, impactful bullet points describing the project.
Number each point sequentially, starting from 1.
Explain the project's purpose, key features, implementation, and technical contributions based on the provided project idea.
Naturally incorporate relevant technologies from the provided tech stack into the appropriate points.
Start each point with a strong action verb, such as Developed, Designed, Implemented, Built, Integrated, or Optimized.
Highlight relevant technical concepts, functionality, problem-solving, architecture, API integration, database management, or user experience when applicable to the project.
Focus on what was built, how it was implemented, and what problem it addresses.
Include measurable results only if they are explicitly provided. Never invent statistics, performance improvements, user counts, or other achievements.
Do not introduce features, technologies, or implementation details that are unsupported by the provided information.
Avoid repetitive statements, generic descriptions, first-person pronouns, and unnecessary adjectives.
Use professional language suitable for a resume and optimize the wording for ATS compatibility.
Keep each bullet point concise, clear, and achievement-oriented without exaggerating the project's scope.
If the project idea lacks implementation details, use reasonable high-level descriptions without claiming unverified technical work.
Return only the numbered bullet points as plain text, with each point on a separate line.

Strict Output Requirements:

Generate 3 to 5 numbered bullet points.
Start numbering from 1 and maintain sequential numbering.
Return only the project description points.
Do not include headings, the project name, introductory text, explanations, Markdown formatting, or additional commentary.
Ensure the output is ready to paste directly into a resume.

`;

    const result = await generateAiContnet(prompt)

    const projectDesc = result;

    return NextResponse.json<apiResponse>({
        success: true,
        message: "Project Description created successfully.",
        data:{
            projectDesc
        }
    },{
        status: 201
    })

    }catch(error){
        console.log("Error at projection description generation", error)
        return NextResponse.json<apiResponse>({
            success: false,
            message: "An error occurred"
        },{
            status: 500
        })
    }
}