import Image from "next/image";
import Link from "next/link";
import React from "react";
import { AuthButtons } from "../auth-buttons";
import { Youtube, Instagram, Facebook } from "lucide-react";

export default function Header() {
  return (
    <header className="flex justify-between px-4">
      <div className="py-4 w-1/3 bottom-2.5 start-5 space-x-2 hidden sm:block">
        <Link
          className="inline-block bg-primary rounded-full p-1 hover:scale-110 transition-transform duration-200"
          href="https://www.facebook.com/profile.php?id=61573532942122"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Facebook className="h-5 w-5 fill-white text-transparent" />
        </Link>
        <Link
          className="inline-block bg-red-700 text-white rounded-full p-1 hover:scale-110 transition-transform duration-200"
          href="https://www.youtube.com/@SeroFeELNooor"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Youtube className="h-5 w-5" />
        </Link>
        <Link
          className="inline-block bg-pink-600 text-white rounded-full p-1 hover:scale-110 transition-transform duration-200"
          href="https://www.instagram.com/sero_fe_elnoor"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Instagram className="h-5 w-5" />
        </Link>
      </div>
      <div className="text-2xl font-bold w-1/3 flex justify-center">
        <Link href="/">
          <Image
            src={"/sero_logo_s.png"}
            width={120}
            height={120}
            alt="sero | سيرو في النور"
          />
        </Link>
      </div>
      <div className="py-4 w-1/3 flex justify-end">
        <AuthButtons />
      </div>
    </header>
  );
}
