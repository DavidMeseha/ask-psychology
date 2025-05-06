"use client";

import { useState, useEffect, useRef } from "react";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { LoginModal } from "@/components/auth/login-modal";
import { Label } from "./ui/label";
import { RadioGroup, RadioGroupItem } from "./ui/radio-group";
import { ReplyType } from "@/types";
import { replyTypes } from "@/constants";

export function QuestionForm() {
  const { data: session } = useSession();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const textareaRef = useRef<HTMLTextAreaElement>(null);
  const [replyType, setReplyType] = useState<ReplyType>("no-reply");
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

    setError(false);
    setSuccess(false);
    setIsSending(true);

    try {
      const response = await fetch("/api/questions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          message: textareaRef.current?.value,
          replyType,
        }),
      });

      if (response.status === 429) {
        const data: { message: string; remainingTime: number } =
          await response.json();

        const hours = Math.ceil(data.remainingTime / (1000 * 60 * 60));
        setError(
          `لقد تجاوزت الحد المسموح به من الأسئلة. يرجى المحاولة بعد ${hours} ساعة`
        );
        return;
      }

      if (!response.ok) {
        throw new Error("Failed to submit question");
      }

      setSuccess(true);
      textareaRef.current.value = "";
    } catch {
      setError("فشل في إرسال سؤالك. يرجى المحاولة مرة أخرى.");
    } finally {
      setIsSending(false);
    }
  }

  return (
    <>
      <h2 className="text-2xl font-bold mb-4 ms-4">اطرح سؤالاً</h2>

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

        <div className="flex items-center gap-6">
          <h4 className="font-bold me-4">كيف تريد الرد ؟</h4>

          <RadioGroup
            defaultValue="no-reply"
            value={replyType}
            onValueChange={(value) => setReplyType(value as ReplyType)}
            className="flex items-center gap-6"
          >
            {replyTypes.map((type) => (
              <Label
                htmlFor={type.name}
                className="flex items-center gap-1 cursor-pointer"
                key={type.name}
              >
                {type.label}
                <RadioGroupItem
                  value={type.name}
                  id={type.name}
                  className="text-secondary"
                />
              </Label>
            ))}
          </RadioGroup>
        </div>

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
