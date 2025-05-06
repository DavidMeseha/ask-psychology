import { QuestionForm } from "@/components/question-form";
import { HeroSection } from "@/components/hero-section";

export default function Home() {
  return (
    <div className="w-full max-w-7xl px-4">
      <main className="container flex flex-col items-center justify-center py-8 mx-auto">
        <HeroSection />

        <section className="w-full max-w-2xl mx-auto mt-12 py-4 px-2 bg-card rounded-lg">
          <QuestionForm />
        </section>
      </main>
    </div>
  );
}
