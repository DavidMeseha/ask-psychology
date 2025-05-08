"use client";

import React, { useState } from "react";
import { useSession } from "next-auth/react";
import { AnimatePresence, motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { LoginModal } from "@/components/auth/login-modal";
import { ReplyType } from "@/types";
import ReplyTypeRadioGroup from "./reply-type-radio-group";
import useSubmitQuestion from "@/hooks/useSubmitQuestion";
import DynamicHeightTextArea from "./ui/dynamic-text-area";
import { Input } from "./ui/input";
import { InfoIcon } from "lucide-react";

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.3,
    },
  },
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 },
};

export default function QuestionSection() {
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [replyType, setReplyType] = useState<ReplyType>();
  const [message, setMessage] = useState("");
  const [contactInfo, setContactInfo] = useState("");

  const { data: session } = useSession();
  const { error, isPending, mutate, success } = useSubmitQuestion({
    onSuccess: () => {
      setMessage("");
      setContactInfo("");
      setReplyType(undefined);
    },
  });

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!session) return setIsLoginModalOpen(true);
    await mutate({ message, replyType, contactInfo });
  };

  return (
    <motion.div
      variants={container}
      initial="hidden"
      whileInView="show"
      viewport={{ once: true }}
      className="space-y-6"
    >
      {/* Header Section */}
      <motion.div
        variants={item}
        className="flex justify-between items-start gap-2 sm:items-end sm:flex-row flex-col"
      >
        <h2 className="text-2xl font-bold ms-4 text-nowrap">اطرح سؤالاً</h2>

        {/* Status Messages */}
        {error && (
          <motion.p
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-xs text-red-500 text-center"
          >
            {error}
          </motion.p>
        )}
        {success && (
          <motion.p
            initial={{ opacity: 0, x: 20 }}
            animate={{ opacity: 1, x: 0 }}
            className="text-xs text-green-500 text-center"
          >
            تم إرسال سؤالك بنجاح
          </motion.p>
        )}
      </motion.div>

      {/* Form Section */}
      <motion.form variants={item} onSubmit={submit} className="space-y-4">
        {/* Question Input Area */}
        <motion.div
          variants={item}
          className="border rounded-xl flex items-end overflow-hidden"
        >
          <DynamicHeightTextArea
            disabled={isPending}
            onChange={(e) => setMessage(e.target.value)}
            value={message}
            id="message"
            className="block w-full px-4 py-4 resize-none overflow-hidden focus:border-none focus:outline-0"
            rows={1}
            placeholder="صف سؤالك بالتفصيل..."
          />

          <Button
            disabled={isPending || !message.length}
            type="submit"
            className="bg-primary text-white m-2"
          >
            {isPending ? "جاري الإرسال" : "إرسال"}
          </Button>
        </motion.div>

        {/* Reply Type Selection */}
        <motion.div variants={item}>
          <ReplyTypeRadioGroup
            onChange={(value) => setReplyType(value)}
            value={replyType ?? "none"}
          />
        </motion.div>

        {/* Contact Info Input - Only shows for private reply */}
        <AnimatePresence>
          {replyType === "private" && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="space-y-2"
            >
              <Input
                type="text"
                value={contactInfo}
                onChange={(e) => setContactInfo(e.target.value)}
                placeholder="رابط فيسبوك، رقم موبايل، أو بريد إلكتروني..."
                className="focus-visible:ring-primary"
              />
              <div className="flex gap-2 text-xs text-muted-foreground">
                <InfoIcon className="h-4 w-4 flex-shrink-0" />
                <p>
                  يمكنك إضافة وسيلة تواصل مثل رابط فيسبوك، رقم موبايل، أو بريد
                  إلكتروني. لإمكانية الرد على استفسارك
                </p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </motion.form>

      {/* Login Modal */}
      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
      />
    </motion.div>
  );
}
