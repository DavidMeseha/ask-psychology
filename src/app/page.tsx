import Link from "next/link";
import { QuestionForm } from "@/components/question-form";
import { AuthButtons } from "@/components/auth-buttons";
import { HeroSection } from "@/components/hero-section";

export default function Home() {
  return (
    <div className="w-full max-w-7xl mx-4">
      <header className="flex items-center justify-between py-4">
        <Link href="/" className="text-2xl font-bold">
          سايكولوجي
        </Link>
        <AuthButtons />
      </header>

      <main className="container flex flex-col items-center justify-center py-12">
        <HeroSection />

        <section className="w-full max-w-2xl mx-auto mt-12 p-6 bg-card rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-6 text-center">
            اطرح سؤالاً
          </h2>
          <QuestionForm />
        </section>
      </main>

      <footer className="container py-6 mt-auto">
        <div className="text-center text-muted-foreground">
          <p>© {new Date().getFullYear()} مند سابورت. جميع الحقوق محفوظة.</p>
        </div>
      </footer>
    </div>
  );
}
