import { submitQuestion } from "@/services/question";
import { ReplyType } from "@/types";
import { useState } from "react";

type SubmitQuestionFunctionParams = {
  message: string;
  replyType: ReplyType | undefined;
  contactInfo: string;
};

export default function useSubmitQuestion({
  onSuccess,
}: {
  onSuccess?: () => void;
}) {
  const [error, setError] = useState<false | string>(false);
  const [success, setSuccess] = useState(false);
  const [isPending, setIsPending] = useState(false);

  async function mutate({
    message,
    replyType,
    contactInfo,
  }: SubmitQuestionFunctionParams) {
    if (!message) return;

    setError(false);
    setSuccess(false);
    setIsPending(true);

    if (!replyType)
      return setError(
        "يجب اختيار طريقة للرد او التواصل لمعرفة كيفية التعامل مع استفسارك"
      );

    if (replyType === "private" && contactInfo.length < 8)
      return setError("أضف وسيلة تواصل حتي يمكننا رد علي استفسارك يشكل خاص");

    if (message.length < 10) return setError("اكتب سؤالك بالتفصيل");

    try {
      const response = await submitQuestion({
        message,
        replyType,
        contactInfo,
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
      onSuccess?.();
    } catch {
      setError("فشل في إرسال سؤالك. يرجى المحاولة مرة أخرى.");
    } finally {
      setIsPending(false);
    }
  }

  return { error, success, mutate, isPending };
}
