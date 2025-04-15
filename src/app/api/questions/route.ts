import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { connectToDatabase } from "@/lib/mongodb";
import { QuestionModel } from "@/models/question";
// import { sendQuestionEmail } from "@/lib/email";
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

    const { message } = await request.json();

    if (!message) {
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
      createdAt: new Date(),
    });

    // // Send email to admin
    // await sendQuestionEmail({
    //   from: process.env.ADMIN_EMAIL!,
    //   to: process.env.PERSONAL_EMAIL!,
    //   subject: `Question`,
    //   userName: session.user.name as string,
    //   userEmail: session.user.email as string,
    //   message,
    // });

    return NextResponse.json(
      { message: "Question submitted successfully" },
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
