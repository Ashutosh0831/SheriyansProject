import { generateAiContnet } from "@/lib/gemini";
import { improveResumeBody } from "@/types/ai.types";
import { apiResponse } from "@/types/api.types";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest){
    try{

        const body: improveResumeBody =await req.json();

        const {content} = body;

         if(!content) return NextResponse.json({
            success: false,
            message: "Filed is required"
         },{
            status: 400
         })

         const prompt = `Act as an expert resume writer, ATS optimization specialist, and professional recruiter.

Your task is to analyze and improve the following resume content for ATS compatibility, readability, and recruiter impact.

Input: {content}

Instructions

1. Analyze the content

Identify weak, vague, repetitive, or generic statements.
Identify missing context, unclear responsibilities, and opportunities to highlight achievements.
Preserve all factual information, including job titles, employment dates, skills, qualifications, and project details.

2. Improve the writing

Rewrite sentences and bullet points using concise, professional language.
Start experience bullets with strong action verbs.
Emphasize accomplishments, technical contributions, problem-solving, and business impact.
Use the Action + Task + Method/Technology + Result structure wherever appropriate.
Remove unnecessary words, clichés, redundancy, and passive language.

3. Optimize for ATS

Use standard industry terminology and relevant keywords already supported by the content.
Improve keyword relevance and placement without keyword stuffing.
Use clear, conventional section headings where applicable.
Prefer simple, readable bullet points and plain text.
Avoid tables, graphics, icons, and decorative formatting in the rewritten resume.

4. Strengthen achievements

Highlight measurable results, scope, efficiency improvements, cost savings, performance gains, and business impact when supported by the input.
Never invent numbers, percentages, metrics, responsibilities, skills, projects, or achievements.
If a statement could be strengthened with missing information, suggest what information is needed instead of making assumptions.

5. Preserve the original context

Maintain the original meaning, intent, and factual accuracy.
Do not change job titles, technologies, certifications, qualifications, or employment dates.
Do not add unsupported skills or keywords.
If no job description is provided, optimize the content for general ATS compatibility without assuming a specific role.
Output format

A. Improved Resume Content Provide the complete rewritten content, ready to copy and use.

B. Key Improvements Briefly list the most important changes made to improve clarity, impact, professionalism, and ATS compatibility.

C. Missing Information Identify any missing metrics, achievements, technical details, or context that could make the content stronger. Include questions or placeholders only where necessary.

D. ATS Optimization Checklist Confirm whether the content uses relevant terminology, clear headings, concise bullet points, consistent language, and recruiter-friendly wording.

Final requirements
Return polished, professional, ATS-friendly content.
Prioritize quality, clarity, relevance, and factual accuracy.
Do not provide unnecessary explanations or repeat the original content.
Do not claim a specific ATS score or guarantee shortlisting.
If the input contains only a section of a resume, optimize that section rather than inventing a complete resume.
If the input is empty or unusable, ask the user to provide the resume content.`


     const improvedContent = await generateAiContnet(prompt);

     return NextResponse.json({
        success: true,
        message: "Content improved successfully",
        data:{
            improvedContent
     }
    },
    {
        status: 201
     })


    }catch(error){
        console.log("An error occurred during imporivng resume",error);
        NextResponse.json<apiResponse>({
            success: false,
            message: "An error occurred",
        },{
            status: 500
        })
    }
}