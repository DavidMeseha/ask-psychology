import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UsersList } from "@/components/admin/users-list";
import { QuestionsList } from "@/components/admin/questions-list";
import { connectToDatabase } from "@/lib/mongodb";
import { UserModel } from "@/models/user";
import { QuestionModel } from "@/models/question";
import { authOptions } from "@/lib/auth";

export default async function AdminPage() {
  const session = await getServerSession(authOptions);

  if (!session || session.user?.role !== "admin") {
    redirect("/");
  }

  await connectToDatabase();

  const users = await UserModel.find().sort({ createdAt: -1 }).lean();
  const questions = await QuestionModel.find().sort({ createdAt: -1 }).lean();

  return (
    <div className="container py-10">
      <h1 className="text-3xl font-bold mb-8">Admin Dashboard</h1>

      <Tabs defaultValue="questions" className="w-full">
        <TabsList className="mb-6">
          <TabsTrigger className="bg-white text-black mx-1" value="questions">
            Questions
          </TabsTrigger>
          <TabsTrigger className="bg-white text-black mx-1" value="users">
            Users
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
