import { NextResponse } from "next/server";
import { getServerSession } from "next-auth/next";
import { connectToDatabase } from "@/lib/mongodb";
import { UserModel } from "@/models/user";
import { NextRequest } from "next/server";

type Props = {
  params: Promise<{
    id: string;
  }>;
};

export async function GET(request: NextRequest, props: Props) {
  try {
    const session = await getServerSession();

    if (!session || session.user?.role !== "admin") {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const userId = (await props.params).id;

    await connectToDatabase();

    const user = await UserModel.findById(userId);

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json(user);
  } catch (error) {
    console.error("Admin get user error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}

export async function DELETE(request: NextRequest, props: Props) {
  try {
    const session = await getServerSession();

    if (!session || session.user?.role !== "admin") {
      return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
    }

    const userId = (await props.params).id;

    await connectToDatabase();

    const user = await UserModel.findByIdAndDelete(userId);

    if (!user) {
      return NextResponse.json({ message: "User not found" }, { status: 404 });
    }

    return NextResponse.json(
      { message: "User deleted successfully" },
      { status: 200 }
    );
  } catch (error) {
    console.error("Admin delete user error:", error);
    return NextResponse.json(
      { message: "Internal server error" },
      { status: 500 }
    );
  }
}
