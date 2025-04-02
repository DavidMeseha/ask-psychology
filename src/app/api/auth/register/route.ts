import { NextResponse } from "next/server";
import { hash } from "bcryptjs";
import { connectToDatabase } from "@/lib/mongodb";
import { UserModel } from "@/models/user";
// import { sendVerificationEmail } from "@/lib/email";

export async function POST(request: Request) {
  try {
    const { name, email, password } = await request.json();

    if (!name || !email || !password) {
      return NextResponse.json(
        { message: "Missing required fields" },
        { status: 400 }
      );
    }

    await connectToDatabase();

    // Check if user already exists
    const existingUser = await UserModel.findOne({ email });

    if (existingUser) {
      return NextResponse.json(
        { message: "User with this email already exists" },
        { status: 409 }
      );
    }

    // Hash password
    const hashedPassword = await hash(password, 10);

    // Create verification token
    const verificationToken = crypto.randomUUID();

    // Create user
    await UserModel.create({
      name,
      email,
      password: hashedPassword,
      emailVerified: false,
      verificationToken,
      role: "user",
    });

    // Send verification email
    // await sendVerificationEmail(email, verificationToken);

    return NextResponse.json(
      { message: "User registered successfully" },
      { status: 201 }
    );
  } catch (error) {
    console.error("Registration error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
