"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { toast } from "@/components/ui/use-toast";
import { LoginModal } from "@/components/auth/login-modal";

export function QuestionForm() {
  const { data: session } = useSession();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const router = useRouter();
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState<false | string>(false);

  useEffect(() => {
    const textarea = textareaRef.current;
    if (!textarea) return;

    const adjustHeight = () => {
      textarea.style.height = "auto";
      textarea.style.height = `${textarea.scrollHeight}px`;
    };

    textarea.addEventListener("input", adjustHeight);
    return () => textarea.removeEventListener("input", adjustHeight);
  }, []);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!textareaRef.current) return;
    if (!session) return setIsLoginModalOpen(true);

    console.log(textareaRef.current?.value);

    if (textareaRef.current.value.length < 15)
      return setError("Write your question in details");

    setIsSending(true);

    try {
      const response = await fetch("/api/questions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: textareaRef.current?.value }),
      });

      if (!response.ok) {
        throw new Error("Failed to submit question");
      }

      toast({
        title: "Question submitted",
        description: "Your question has been sent to our team.",
      });

      router.refresh();
    } catch {
      toast({
        title: "Error",
        description: "Failed to submit your question. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsSending(false);
    }
  }

  return (
    <>
      <div className="space-y-2">
        <form onSubmit={onSubmit} className="border flex items-end rounded-xl">
          <div className="w-full p-4">
            <textarea
              ref={textareaRef}
              id="message"
              className="block w-full resize-none overflow-hidden focus:border-none focus:outline-0"
              rows={1}
              placeholder="Describe your question in detail..."
            />
            {<p className="text-sm text-destructive"></p>}
          </div>

          <Button
            disabled={isSending}
            type="submit"
            className="bg-white text-black px-4 me-2 mb-2"
            onClick={() => {}}
          >
            {isSending ? "Sending" : "Send"}
          </Button>
        </form>

        {error ? (
          <div className="text-xs text-red-500 text-center">{error}</div>
        ) : null}
      </div>
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
      />
    </>
  );
}
