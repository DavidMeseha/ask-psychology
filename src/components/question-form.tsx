"use client";

import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { LoginModal } from "@/components/auth/login-modal";
import { ReplyType } from "@/types";
import ReplyTypeRadioGroup from "./reply-type-radio-group";
import useSubmitQuestion from "@/hooks/useSubmitQuestion";
import DynamicHeightTextArea from "./ui/dynamic-text-area";

export function QuestionForm() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [replyType, setReplyType] = useState<ReplyType>("no-reply");
  const [message, setMessage] = useState("");

  const { data: session } = useSession();
  const { error, isPending, mutate, success } = useSubmitQuestion();

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!session) return setIsLoginModalOpen(true);
    await mutate({ message, replyType });
    setMessage("");
  };

  return (
    <>
      <h2 className="text-2xl font-bold mb-4 ms-4">اطرح سؤالاً</h2>

      <div className="mb-8">
        <form onSubmit={submit}>
          <div className="border flex items-end rounded-xl mb-2">
            <div className="w-full h-full">
              <DynamicHeightTextArea
                disabled={isPending}
                onChange={(e) => setMessage(e.target.value)}
                id="message"
                className="block w-full px-2 py-4 resize-none overflow-hidden focus:border-none focus:outline-0"
                rows={1}
                placeholder="صف سؤالك بالتفصيل..."
              />
            </div>

            <Button
              disabled={isPending}
              type="submit"
              className="bg-primary text-white px-4 m-2"
            >
              {isPending ? "جاري الإرسال" : "إرسال"}
            </Button>
          </div>

          <ReplyTypeRadioGroup
            onChange={(value) => setReplyType(value)}
            value={replyType}
          />
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
