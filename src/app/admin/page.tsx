import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UsersList } from "@/components/admin/users-list";
import { QuestionsList } from "@/components/admin/questions-list";
import { connectToDatabase } from "@/lib/mongodb";
import { UserModel } from "@/models/user";
import { QuestionModel } from "@/models/question";
import { authOptions } from "@/lib/auth";
import Link from "next/link";
import Image from "next/image";

export default async function AdminPage() {
  const session = await getServerSession(authOptions);

  if (!session || session.user?.role !== "admin") {
    redirect("/");
  }

  await connectToDatabase();

  const users = await UserModel.find().sort({ createdAt: -1 }).lean();
  const questions = await QuestionModel.find().sort({ createdAt: -1 }).lean();

  return (
    <div className="container py-4 px-2">
      <div className="flex justify-between items-center">
        <h1 className="text-3xl font-bold text-center sm:text-start">
          لوحة التحكم
        </h1>
        <Link href="/" className="text-2xl font-bold">
          <Image src={"/sero_logo_s.png"} width={100} height={100} alt="sero" />
        </Link>
      </div>

      <Tabs defaultValue="questions" className="w-full">
        <TabsList className="mb-6 w-full">
          <TabsTrigger className="bg-primary text-white mx-1" value="questions">
            الأسئلة
          </TabsTrigger>
          <TabsTrigger className="bg-primary text-white mx-1" value="users">
            المستخدمين
          </TabsTrigger>
        </TabsList>

        <TabsContent value="questions">
          <QuestionsList questions={JSON.parse(JSON.stringify(questions))} />
        </TabsContent>

        <TabsContent value="users">
          <UsersList users={JSON.parse(JSON.stringify(users))} />
        </TabsContent>
      </Tabs>
    </div>
  );
}
