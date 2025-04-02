"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { z } from "zod";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { toast } from "@/components/ui/use-toast";
import { LoginModal } from "@/components/auth/login-modal";

const questionSchema = z.object({
  subject: z.string().min(5, "Subject must be at least 5 characters"),
  message: z.string().min(20, "Message must be at least 20 characters"),
});

type QuestionFormValues = z.infer<typeof questionSchema>;

export function QuestionForm() {
  const { data: session } = useSession();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const router = useRouter();

  const form = useForm<QuestionFormValues>({
    resolver: zodResolver(questionSchema),
    defaultValues: {
      subject: "",
      message: "",
    },
  });

  async function onSubmit(data: QuestionFormValues) {
    if (!session) {
      setIsLoginModalOpen(true);
      return;
    }

    try {
      const response = await fetch("/api/questions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });

      if (!response.ok) {
        throw new Error("Failed to submit question");
      }

      toast({
        title: "Question submitted",
        description: "Your question has been sent to our team.",
      });

      form.reset();
      router.refresh();
    } catch {
      toast({
        title: "Error",
        description: "Failed to submit your question. Please try again.",
        variant: "destructive",
      });
    }
  }

  return (
    <>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <div className="space-y-2">
          <Label htmlFor="subject">Subject</Label>
          <Input
            id="subject"
            placeholder="Brief subject of your question"
            {...form.register("subject")}
          />
          {form.formState.errors.subject && (
            <p className="text-sm text-destructive">
              {form.formState.errors.subject.message}
            </p>
          )}
        </div>

        <div className="space-y-2">
          <Label htmlFor="message">Your Question</Label>
          <Textarea
            id="message"
            placeholder="Describe your question in detail..."
            className="min-h-[150px]"
            {...form.register("message")}
          />
          {form.formState.errors.message && (
            <p className="text-sm text-destructive">
              {form.formState.errors.message.message}
            </p>
          )}
        </div>

        <Button type="submit" className="w-full">
          Submit Question
        </Button>
      </form>

      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
      />
    </>
  );
}
