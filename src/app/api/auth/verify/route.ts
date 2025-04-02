import { NextResponse } from "next/server"
import { connectToDatabase } from "@/lib/mongodb"
import { UserModel } from "@/models/user"

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url)
    const token = searchParams.get("token")

    if (!token) {
      return NextResponse.redirect(new URL("/?error=invalid-token", request.url))
    }

    await connectToDatabase()

    const user = await UserModel.findOne({ verificationToken: token })

    if (!user) {
      return NextResponse.redirect(new URL("/?error=invalid-token", request.url))
    }

    user.emailVerified = true
    user.verificationToken = undefined
    await user.save()

    return NextResponse.redirect(new URL("/?verified=true", request.url))
  } catch (error) {
    console.error("Email verification error:", error)
    return NextResponse.redirect(new URL("/?error=verification-failed", request.url))
  }
}

