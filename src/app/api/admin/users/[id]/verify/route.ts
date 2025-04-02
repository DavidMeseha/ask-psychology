import { NextResponse } from "next/server"
import { getServerSession } from "next-auth/next"
import { connectToDatabase } from "@/lib/mongodb"
import { UserModel } from "@/models/user"

export async function POST(request: Request, { params }: { params: { id: string } }) {
  try {
    const session = await getServerSession()

    if (!session || session.user?.role !== "admin") {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
    }

    const userId = params.id

    await connectToDatabase()

    const user = await UserModel.findById(userId)

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 })
    }

    user.emailVerified = true
    await user.save()

    return NextResponse.json({ message: "User email verified successfully" }, { status: 200 })
  } catch (error) {
    console.error("Admin verify user error:", error)
    return NextResponse.json({ message: "Internal server error" }, { status: 500 })
  }
}

