import { Suspense } from "react"
import Link from "next/link"
import { QuestionForm } from "@/components/question-form"
import { AuthButtons } from "@/components/auth-buttons"
import { HeroSection } from "@/components/hero-section"

export default function Home() {
  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-background/80">
      <header className="container flex items-center justify-between py-4">
        <Link href="/" className="text-xl font-bold">
          MindSupport
        </Link>
        <AuthButtons />
      </header>

      <main className="container flex flex-col items-center justify-center py-12">
        <HeroSection />

        <section className="w-full max-w-2xl mx-auto mt-12 p-6 bg-card rounded-lg shadow-lg">
          <h2 className="text-2xl font-bold mb-6">Ask a Question</h2>
          <Suspense fallback={<div className="h-[300px] flex items-center justify-center">Loading form...</div>}>
            <QuestionForm />
          </Suspense>
        </section>
      </main>

      <footer className="container py-6 mt-auto">
        <div className="text-center text-muted-foreground">
          <p>© {new Date().getFullYear()} MindSupport. All rights reserved.</p>
        </div>
      </footer>
    </div>
  )
}

