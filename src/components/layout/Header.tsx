import Image from "next/image";
import Link from "next/link";
import React from "react";
import { AuthButtons } from "../auth-buttons";
import SocialLinks from "./social-links";

export default function Header() {
  return (
    <header className="flex justify-between px-4">
      <div className="py-4 w-1/3 bottom-2.5 start-5 space-x-2 hidden sm:block">
        <SocialLinks />
      </div>
      <div className="text-2xl font-bold sm:w-1/3 flex sm:justify-center h-32">
        <Link href="/">
          <Image
            src={"/sero_logo_s.png"}
            width={128}
            height={128}
            alt="sero | سيرو في النور"
          />
        </Link>
      </div>
      <div className="py-4 sm:w-1/3 flex justify-end">
        <AuthButtons />
      </div>
    </header>
  );
}
