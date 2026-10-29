import { connectDb } from "@/lib/db";
import { getUser } from "@/lib/getUser";
import resumeModel from "@/models/resume";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    await connectDb();
    const userId = await getUser();
    const resumes = await resumeModel
      .find({ userId })
      .sort({ updatedAt: -1 })
      .select("-userId");

    return NextResponse.json(
      {
        success: true,
        message: "Resumes fetched successfully",
        data: { resumes },
      },
      { status: 200 },
    );
  } catch (error) {
    const isAuthError =
      error instanceof Error &&
      (error.message === "Token not found" ||
        error.message === "Unauthorised" ||
        error.name === "JsonWebTokenError" ||
        error.name === "TokenExpiredError");

    return NextResponse.json(
      {
        success: false,
        message: isAuthError ? "Please sign in to continue." : "Unable to load resumes.",
      },
      { status: isAuthError ? 401 : 500 },
    );
  }
}
