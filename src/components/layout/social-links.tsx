import { Facebook, Youtube, Instagram } from "lucide-react";
import Link from "next/link";
import React from "react";

export default function SocialLinks() {
  return (
    <>
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
    </>
  );
}
