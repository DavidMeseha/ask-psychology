import { ReplyType } from "@/types";

export function submitQuestion(body: {
  message: string;
  replyType: ReplyType;
  contactInfo: string;
}) {
  return fetch("/api/questions", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(body),
  });
}
