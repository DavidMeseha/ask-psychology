import { redirect } from "next/navigation";
import { getServerSession } from "next-auth/next";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { UsersList } from "@/components/admin/users-table";
import { QuestionsList } from "@/components/admin/questions-table";
import { connectToDatabase } from "@/lib/mongodb";
import { UserModel } from "@/models/user";
import { QuestionModel } from "@/models/question";
import { authOptions } from "@/lib/auth";
import { Card } from "@/components/ui/card";

export default async function AdminPage() {
  const session = await getServerSession(authOptions);
  if (!session || session.user?.role !== "admin") redirect("/");

  await connectToDatabase();

  const users = await UserModel.find({
    _id: { $ne: session.user.id },
  })
    .sort({ createdAt: -1 })
    .lean();

  const questions = await QuestionModel.find()
    .limit(20)
    .sort({ createdAt: -1 })
    .lean();

  return (
    <main className="container mx-auto py-4 px-2">
      <Tabs defaultValue="questions" className="w-full">
        <div className="flex items-center justify-between mb-6">
          <TabsList>
            <TabsTrigger
              className="data-[state=active]:bg-primary data-[state=active]:text-white bg-primary/7 mx-1"
              value="questions"
            >
              الأسئلة
            </TabsTrigger>
            <TabsTrigger
              className="data-[state=active]:bg-primary data-[state=active]:text-white bg-primary/7 mx-1"
              value="users"
            >
              المستخدمين
            </TabsTrigger>
          </TabsList>
          <h1 className="text-3xl font-bold text-center sm:text-start">
            لوحة التحكم
          </h1>
        </div>

        <Card className="bg-white border-none">
          <TabsContent value="questions">
            <QuestionsList questions={JSON.parse(JSON.stringify(questions))} />
          </TabsContent>

          <TabsContent value="users">
            <UsersList users={JSON.parse(JSON.stringify(users))} />
          </TabsContent>
        </Card>
      </Tabs>
    </main>
  );
}
