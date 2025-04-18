"use client";

import { useState } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { formatDistanceToNow } from "date-fns";
import { ar } from "date-fns/locale";

interface Question {
  _id: string;
  userId: string;
  userName: string;
  userEmail: string;
  subject: string;
  message: string;
  status: "pending" | "answered";
  createdAt: string;
}

interface QuestionsListProps {
  questions: Question[];
}

export function QuestionsList({ questions }: QuestionsListProps) {
  const [questionsList] = useState(questions);
  const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(
    null
  );

  function formatDate(dateString: string) {
    return formatDistanceToNow(new Date(dateString), {
      addSuffix: true,
      locale: ar,
    });
  }

  return (
    <>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>الموضوع</TableHead>
              <TableHead>من</TableHead>
              <TableHead>التاريخ</TableHead>
              <TableHead>الإجراءات</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {questionsList.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-6">
                  لا توجد أسئلة
                </TableCell>
              </TableRow>
            ) : (
              questionsList.map((question) => (
                <TableRow key={question._id}>
                  <TableCell>{question.subject}</TableCell>
                  <TableCell>
                    {question.userName} ({question.userEmail})
                  </TableCell>
                  <TableCell>{formatDate(question.createdAt)}</TableCell>
                  <TableCell>
                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => setSelectedQuestion(question)}
                    >
                      عرض
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <Dialog
        open={!!selectedQuestion}
        onOpenChange={() => setSelectedQuestion(null)}
      >
        <DialogContent className="sm:max-w-[600px] bg-white">
          <DialogHeader className="border-b pb-8 border-b-black/30">
            <DialogTitle>{selectedQuestion?.subject}</DialogTitle>
            <DialogDescription>
              {selectedQuestion?.userName} ({selectedQuestion?.userEmail})
            </DialogDescription>
          </DialogHeader>

          <p className="whitespace-pre-wrap p-4">{selectedQuestion?.message}</p>
        </DialogContent>
      </Dialog>
    </>
  );
}
