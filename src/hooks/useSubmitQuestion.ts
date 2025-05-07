import { submitQuestion } from "@/services/question";
import { ReplyType } from "@/types";
import { useState } from "react";

type SubmitQuestionFunctionParams = {
  message: string;
  replyType: ReplyType;
};

export default function useSubmitQuestion() {
  const [error, setError] = useState<false | string>(false);
  const [success, setSuccess] = useState(false);
  const [isPending, setIsPending] = useState(false);

  async function mutate({ message, replyType }: SubmitQuestionFunctionParams) {
    if (!message) return;
    if (message.length < 15)
      return setError("اكتب سؤالك بالتفصيل");

    setError(false);
    setSuccess(false);
    setIsPending(true);

    try {
      const response = await submitQuestion({
        message,
        replyType,
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
    } catch {
      setError("فشل في إرسال سؤالك. يرجى المحاولة مرة أخرى.");
    } finally {
      setIsPending(false);
    }
  }

  return { error, success, mutate, isPending };
}
