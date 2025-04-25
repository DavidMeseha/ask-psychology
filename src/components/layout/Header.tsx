import Image from "next/image";
import Link from "next/link";
import React from "react";
import { AuthButtons } from "../auth-buttons";

export default function Header() {
  return (
    <header className="flex justify-between px-4">
      <Link href="/" className="text-2xl font-bold">
        <Image
          src={"/sero_logo_s.png"}
          width={120}
          height={120}
          alt="sero | سيرو في النور"
        />
      </Link>
      <div className="py-4">
        <AuthButtons />
      </div>
    </header>
  );
}
