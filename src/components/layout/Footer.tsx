import Link from "next/link";
import React from "react";
import { Facebook, Instagram, Youtube } from "lucide-react";

export default function Footer() {
  return (
    <footer className="fixed bottom-2.5 start-5 space-x-2">
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
    </footer>
  );
}
