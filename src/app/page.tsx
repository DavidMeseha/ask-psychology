import QuestionSection from "@/components/question-section";
import { HeroSection } from "@/components/hero-section";

export default function Home() {
  return (
    <div className="w-full max-w-7xl px-4">
      <main className="container mx-auto">
        <section className="mt-4">
          <HeroSection />
        </section>

        <section className="w-full max-w-2xl mx-auto mt-12 py-4 px-2 bg-card rounded-lg">
          <QuestionSection />
        </section>
      </main>
    </div>
  );
}
