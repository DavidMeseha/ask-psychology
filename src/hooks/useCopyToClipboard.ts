import { useState } from "react";

export default function useCopyToClipboard() {
  const [error, setError] = useState<false | string>(false);
  const [success, setSuccess] = useState(false);

  const copyToClipboard = async (text: string) => {
    try {
      await navigator.clipboard.writeText(text);
      setSuccess(true);
      setTimeout(() => setSuccess(false), 1000);
    } catch {
      setError("لم يتم النسخ حاول مرة اخري");
    }
  };

  return { copyToClipboard, error, success };
}
