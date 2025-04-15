"use client";

import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { MessageCircle, PhoneCall, UserCircle2 } from "lucide-react";

export function InstructionsModal({
  isOpen,
  onClose,
}: {
  isOpen: boolean;
  onClose: () => void;
}) {
  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-[425px] bg-white overflow-auto h-full">
        <DialogHeader>
          <DialogTitle>كيف يعمل الموقع ؟</DialogTitle>
        </DialogHeader>

        <div className="space-y-4">
          <div className="flex flex-col items-center text-center p-6 bg-white/50 rounded-lg border border-primary/20">
            <UserCircle2 className="h-12 w-12 text-secondary mb-4" />
            <h3 className="font-semibold text-primary mb-2">
              شارك مشكلتك مجهولاً
            </h3>
            <p className="text-primary/80">
              اكتب ما يؤلمك دون الكشف عن هويتك. لا نطلب اسمك أو بياناتك الشخصية.
            </p>
          </div>

          <div className="flex flex-col items-center text-center p-6 bg-white/50 rounded-lg border border-primary/20">
            <MessageCircle className="h-12 w-12 text-secondary mb-4" />
            <h3 className="font-semibold text-primary mb-2">اختر نوع الرد</h3>
            <p className="text-primary/80">
              يمكنك اختيار &quot;رد عام&quot; للنشر المجهول، أو طلب تواصل شخصي
              للحصول على دعم أعمق.
            </p>
          </div>

          <div className="flex flex-col items-center text-center p-6 bg-white/50 rounded-lg border border-primary/20">
            <PhoneCall className="h-12 w-12 text-secondary mb-4" />
            <h3 className="font-semibold text-primary mb-2">تواصل شخصي</h3>
            <p className="text-primary/80">
              إذا احتجت لدعم أعمق، يمكنك ترك وسيلة تواصلك (هاتف أو فيسبوك)
              وسنتواصل معك بخصوصية تامة.
            </p>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
