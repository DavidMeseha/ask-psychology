"use client";

import { useState } from "react";
import { useSession, signOut } from "next-auth/react";
import { Button } from "@/components/ui/button";
import { LoginModal } from "@/components/auth/login-modal";
import { RegisterModal } from "@/components/auth/register-modal";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { User } from "lucide-react";
import Link from "next/link";

export function AuthButtons() {
  const { data: session, status } = useSession();
  const [isLoginModalOpen, setIsLoginModalOpen] = useState(false);
  const [isRegisterModalOpen, setIsRegisterModalOpen] = useState(false);

  if (status === "loading") {
    return (
      <div className="h-9 w-[88px] flex justify-center items-center text-primary/20 border border-primary/20 rounded-md">
        تحميل ...
      </div>
    );
  }

  if (session) {
    return (
      <DropdownMenu dir="rtl">
        <DropdownMenuTrigger className="gap-2 px-3 h-9 hover:bg-accent" asChild>
          <Button variant="outline">
            <User className="h-4 w-4 text-primary" />
            <span className="sm:inline-block hidden font-medium">
              {session.user?.name?.split(" ")[0] || "حسابي"}
            </span>
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent
          align="end"
          className="w-48 p-1 bg-white/95 backdrop-blur-sm"
        >
          <DropdownMenuItem
            dir="ltr"
            className="px-3 py-2 text-sm font-medium text-primary cursor-default"
          >
            <span className="truncate">{session.user?.email}</span>
          </DropdownMenuItem>
          <DropdownMenuSeparator className="my-1 bg-primary/20" />
          {session.user?.role === "admin" && (
            <DropdownMenuItem
              className="px-3 py-2 text-sm hover:bg-accent hover:text-primary transition-colors rounded-md cursor-pointer"
              asChild
            >
              <Link href="/admin">لوحة التحكم</Link>
            </DropdownMenuItem>
          )}
          <DropdownMenuItem
            onClick={() => signOut()}
            className="px-3 py-2 text-sm text-destructive hover:bg-red-50 transition-colors rounded-md cursor-pointer"
          >
            تسجيل الخروج
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    );
  }

  return (
    <>
      <div className="flex gap-2">
        <Button variant="outline" onClick={() => setIsLoginModalOpen(true)}>
          تسجيل الدخول
        </Button>
        <Button
          className="bg-primary text-white hidden sm:inline-block"
          onClick={() => setIsRegisterModalOpen(true)}
        >
          إنشاء حساب
        </Button>
      </div>

      <LoginModal
        isOpen={isLoginModalOpen}
        onClose={() => setIsLoginModalOpen(false)}
        switchTab={() => {
          setIsLoginModalOpen(false);
          setIsRegisterModalOpen(true);
        }}
      />
      <RegisterModal
        isOpen={isRegisterModalOpen}
        onClose={() => setIsRegisterModalOpen(false)}
        switchTab={() => {
          setIsLoginModalOpen(true);
          setIsRegisterModalOpen(false);
        }}
      />
    </>
  );
}
