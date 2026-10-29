import { generateAiContnet } from "@/lib/gemini";
import { generateSummaryBody } from "@/types/ai.types";
import { apiResponse } from "@/types/api.types";
import { NextRequest, NextResponse } from "next/server";

export async function POST(req: NextRequest) {
  try {
    const body: generateSummaryBody = await req.json();

    const { exprienceLevel, skills, jobTitle } = body;

    if (!exprienceLevel || !skills || !jobTitle)
      return NextResponse.json(
        {
          success: false,
          message: "Fileds are missing",
        },
        {
          status: 400,
        },
      );

    const prompt = ` You are an expert resume writer specializing in ATS (Applicant Tracking System) optimization.

Generate a professional, concise, and impactful resume summary using the following details:

Job Title: ${jobTitle} Skills: ${skills} Experience Level: ${exprienceLevel}

Instructions:

Write a resume summary between 50 and 80 words.
Tailor the summary specifically to the given job title, skills, and experience level.
Naturally incorporate relevant industry keywords to improve ATS compatibility.
Highlight key skills, professional strengths, and relevant expertise.
Use professional language, strong action-oriented wording, and a confident tone.
For entry-level candidates or freshers, emphasize relevant skills, knowledge, projects, and potential without inventing work experience.
Do not fabricate qualifications, achievements, certifications, or experience.
Avoid generic statements, unnecessary adjectives, personal pronouns, bullet points, and first-person language.
Return only the resume summary as plain text.
Do not include headings, titles, labels, quotation marks, markdown formatting, explanations, or word counts.
Strict output requirements:

Minimum: 50 words.
Maximum: 80 words.
Output must contain only the resume summary.
Ensure the final summary is ATS-friendly, grammatically correct, and ready to paste directly into a resume.
`;

    const result = await generateAiContnet(prompt)

    const summary = result;
    
    return NextResponse.json<apiResponse>({
        success: true,
        message: "Summary created successfully",
        data:{
            summary: summary
        }
    },{
        status: 201
    })
  } catch (error) {
    console.log("Error in generating summary api", error);
    return NextResponse.json<apiResponse>(
      {
        success: false,
        message: " Something went wrong",
      },
      {
        status: 500,
      },
    );
  }
}
