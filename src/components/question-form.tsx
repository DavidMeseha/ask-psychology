"use client";

import { useState, useEffect, useRef } from "react";
import { useRouter } from "next/navigation";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { LoginModal } from "@/components/auth/login-modal";

export function QuestionForm() {
  const { data: session } = useSession();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const router = useRouter();
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [isSending, setIsSending] = useState(false);
  const [error, setError] = useState<false | string>(false);
  const [success, setSuccess] = useState(false);

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

    if (textareaRef.current.value.length < 15)
      return setError("اكتب سؤالك بالتفصيل");

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

      setSuccess(true);
      router.refresh();
    } catch {
      setError("فشل في إرسال سؤالك. يرجى المحاولة مرة أخرى.");
    } finally {
      setIsSending(false);
    }
  }

  return (
    <>
      <div className="space-y-2 mb-8">
        <form onSubmit={onSubmit} className="border flex items-end rounded-xl">
          <div className="w-full h-full">
            <textarea
              ref={textareaRef}
              id="message"
              className="block w-full px-2 py-4 resize-none overflow-hidden focus:border-none focus:outline-0"
              rows={1}
              placeholder="صف سؤالك بالتفصيل..."
            />
            {<p className="text-sm text-destructive"></p>}
          </div>

          <Button
            disabled={isSending}
            type="submit"
            className="bg-primary text-white px-4 m-2"
          >
            {isSending ? "جاري الإرسال" : "إرسال"}
          </Button>
        </form>

        {error ? (
          <div className="text-xs text-red-500 text-center">{error}</div>
        ) : null}

        {success ? (
          <div className="text-xs text-green-500 text-center">
            تم إرسال سؤالك بنجاح
          </div>
        ) : null}
      </div>
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
      />
    </>
  );
}
