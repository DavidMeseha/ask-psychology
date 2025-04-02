import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { connectToDatabase } from "@/lib/mongodb"
import { QuestionModel } from "@/models/question"
import { sendQuestionEmail } from "@/lib/email"

export async function POST(request: Request) {
  try {
    const session = await getServerSession()

    if (!session || !session.user) {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const { subject, message } = await request.json()

    if (!subject || !message) {
      return NextResponse.json({ message: "Missing required fields" }, { status: 400 })
    }

    await connectToDatabase()

    // Create question in database
    await QuestionModel.create({
      userId: session.user.id,
      userEmail: session.user.email,
      userName: session.user.name,
      subject,
      message,
      status: "pending",
      createdAt: new Date(),
    })

    // Send email to admin
    await sendQuestionEmail({
      from: process.env.ADMIN_EMAIL!,
      to: process.env.PERSONAL_EMAIL!,
      subject: `New Question: ${subject}`,
      userName: session.user.name as string,
      userEmail: session.user.email as string,
      message,
    })

    return NextResponse.json({ message: "Question submitted successfully" }, { status: 201 })
  } catch (error) {
    console.error("Question submission error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}

