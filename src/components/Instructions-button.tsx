"use client";

import { Button } from "@/components/ui/button";
import { FileText } from "lucide-react";
import { InstructionsModal } from "./instructions-modal";
import { useState } from "react";

export function InstructionsButton() {
  const [isOpen, setIsOpen] = useState(false);
  return (
    <>
      <Button
        variant="default"
        className="flex items-center gap-2 text-white"
        onClick={() => setIsOpen(true)}
      >
        <FileText className="h-5 w-5" />
        <span>كيف يعمل ؟</span>
      </Button>
      <InstructionsModal isOpen={isOpen} onClose={() => setIsOpen(false)} />
    </>
  );
}
