import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { connectToDatabase } from "@/lib/mongodb";
import { QuestionModel } from "@/models/question";
import { authOptions } from "@/lib/auth";

// Rate limit settings
const RATE_LIMIT_WINDOW = 24 * 60 * 60 * 1000; // 24 hours in milliseconds
const MAX_QUESTIONS_PER_DAY = 3;

export async function POST(request: Request) {
  try {
    const session = await getServerSession(authOptions);

    if (!session || !session.user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const { message, replyType, contactInfo } = await request.json();

    if (!message || !replyType || (replyType === "private" && !contactInfo)) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    await connectToDatabase();

    // Check rate limit
    const timeWindow = new Date(Date.now() - RATE_LIMIT_WINDOW);
    const recentQuestions = await QuestionModel.countDocuments({
      userId: session.user.id,
      createdAt: { $gt: timeWindow },
    });

    if (recentQuestions >= MAX_QUESTIONS_PER_DAY) {
      return NextResponse.json(
        {
          message:
            "لقد تجاوزت الحد المسموح به من الأسئلة اليومية. يرجى المحاولة غداً",
          remainingTime:
            RATE_LIMIT_WINDOW -
            (Date.now() -
              (
                await QuestionModel.findOne({
                  userId: session.user.id,
                  createdAt: { $gt: timeWindow },
                })
                  .sort({ createdAt: 1 })
                  .select("createdAt")
              ).createdAt.getTime()),
        },
        { status: 429 }
      );
    }

    // Create question in database
    await QuestionModel.create({
      userId: session.user.id,
      userEmail: session.user.email,
      userName: session.user.name,
      subject: `Question`,
      message,
      replyType,
      contactInfo,
      createdAt: new Date(),
    });

    return NextResponse.json(
      { message: "Question submited successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Question submission error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
