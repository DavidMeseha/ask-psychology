import Link from "next/link";
import { QuestionForm } from "@/components/question-form";
import { AuthButtons } from "@/components/auth-buttons";
import { HeroSection } from "@/components/hero-section";
import Image from "next/image";
import { Facebook, Instagram, Youtube } from "lucide-react";

export default function Home() {
  return (
    <div className="w-full max-w-7xl px-4">
      <header className="flex justify-between">
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

      <main className="container flex flex-col items-center justify-center py-8">
        <HeroSection />

        <section className="w-full max-w-2xl mx-auto mt-12 py-4 px-2 bg-card rounded-lg">
          <h2 className="text-2xl font-bold mb-4 ms-4">اطرح سؤالاً</h2>
          <QuestionForm />
        </section>
      </main>

      <footer className="fixed bottom-2.5 start-5 space-x-2">
        <Link
          className="inline-block bg-primary rounded-full p-1"
          href="https://www.facebook.com/profile.php?id=61573532942122"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Facebook className="h-5 w-5 fill-white text-transparent" />
        </Link>
        <Link
          className="inline-block bg-red-700 text-white rounded-full p-1"
          href="https://www.youtube.com/@SeroFeELNooor"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Youtube className="h-5 w-5" />
        </Link>
        <Link
          className="inline-block bg-pink-600 text-white rounded-full p-1"
          href="https://www.instagram.com/sero_fe_elnoor"
          target="_blank"
          rel="noopener noreferrer"
        >
          <Instagram className="h-5 w-5" />
        </Link>
      </footer>
    </div>
  );
}
