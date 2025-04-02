import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { connectToDatabase } from "@/lib/mongodb";
import { QuestionModel } from "@/models/question";
// import { sendQuestionEmail } from "@/lib/email";
import { authOptions } from "@/lib/auth";

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

    console.log(session.user);

    // Create question in database
    await QuestionModel.create({
      userId: session.user.id,
      userEmail: session.user.email,
      userName: session.user.name,
      subject: `Question from ${session.user.name}`,
      message,
      status: "pending",
      createdAt: new Date(),
    });

    // // Send email to admin
    // await sendQuestionEmail({
    //   from: process.env.ADMIN_EMAIL!,
    //   to: process.env.PERSONAL_EMAIL!,
    //   subject: `Question from ${session.user.name}`,
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
