"use client"

import { useState } from "react"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"
import { formatDistanceToNow } from "date-fns"

interface Question {
  _id: string
  userId: string
  userName: string
  userEmail: string
  subject: string
  message: string
  status: "pending" | "answered"
  createdAt: string
}

interface QuestionsListProps {
  questions: Question[]
}

export function QuestionsList({ questions }: QuestionsListProps) {
  const [questionsList] = useState(questions)
  const [selectedQuestion, setSelectedQuestion] = useState<Question | null>(null)

  function formatDate(dateString: string) {
    return formatDistanceToNow(new Date(dateString), { addSuffix: true })
  }

  return (
    <>
      <div className="rounded-md border">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Subject</TableHead>
              <TableHead>From</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Actions</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {questionsList.length === 0 ? (
              <TableRow>
                <TableCell colSpan={5} className="text-center py-6">
                  No questions found
                </TableCell>
              </TableRow>
            ) : (
              questionsList.map((question) => (
                <TableRow key={question._id}>
                  <TableCell>{question.subject}</TableCell>
                  <TableCell>
                    {question.userName} ({question.userEmail})
                  </TableCell>
                  <TableCell>
                    <Badge variant={question.status === "answered" ? "outline" : "default"}>{question.status}</Badge>
                  </TableCell>
                  <TableCell>{formatDate(question.createdAt)}</TableCell>
                  <TableCell>
                    <Button variant="outline" size="sm" onClick={() => setSelectedQuestion(question)}>
                      View
                    </Button>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>

      <Dialog open={!!selectedQuestion} onOpenChange={() => setSelectedQuestion(null)}>
        <DialogContent className="sm:max-w-[600px]">
          <DialogHeader>
            <DialogTitle>{selectedQuestion?.subject}</DialogTitle>
            <DialogDescription>
              From {selectedQuestion?.userName} ({selectedQuestion?.userEmail})
            </DialogDescription>
          </DialogHeader>

          <div className="mt-4 p-4 bg-muted rounded-md">
            <p className="whitespace-pre-wrap">{selectedQuestion?.message}</p>
          </div>

          <div className="flex justify-end gap-2 mt-4">
            <Button variant="outline" onClick={() => setSelectedQuestion(null)}>
              Close
            </Button>
            <Button>Reply</Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  )
}

