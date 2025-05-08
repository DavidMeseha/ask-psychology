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
import { ReplyType } from "@/types";
import { replayTypesMap } from "@/constants";
import useCopyToClipboard from "@/hooks/useCopyToClipboard";
import { Check, Copy } from "lucide-react";

interface Question {
  _id: string;
  userId: string;
  userName: string;
  userEmail: string;
  subject: string;
  message: string;
  status: "pending" | "answered";
  replyType: ReplyType;
  contactInfo: string | null;
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
              <TableHead>الرد</TableHead>
              <TableHead>من</TableHead>
              <TableHead>وسيلة التواصل</TableHead>
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
                  <TableCell>
                    {question.replyType
                      ? replayTypesMap[question.replyType]
                      : question.subject}
                  </TableCell>
                  <TableCell>{question.userName}</TableCell>
                  <TableCell>
                    <ContactInfo
                      contactInfo={question.contactInfo}
                      userEmail={question.userEmail}
                    />
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

function ContactInfo({
  contactInfo,
  userEmail,
}: {
  userEmail: string;
  contactInfo: string | null;
}) {
  const { copyToClipboard, success } = useCopyToClipboard();

  return (
    <div className="flex gap-1">
      {contactInfo || userEmail}{" "}
      {success ? (
        <span className="p-1">
          <Check className="h-4 w-4 text-green-500" />
        </span>
      ) : (
        <button
          onClick={() => copyToClipboard(contactInfo || userEmail)}
          className="p-1"
        >
          <Copy className="h-4 w-4 text-primary" />
        </button>
      )}
    </div>
  );
}
