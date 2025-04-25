import { InstructionsButton } from "./Instructions-button";

export function HeroSection() {
  return (
    <section className="text-center py-4">
      <h1 className="hero text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl bg-gradient-to-r from-[#003092] via-[#00879e] to-[#ffab5b] text-transparent bg-clip-text">
        مساحة آمنة للمشاركة
      </h1>
      <p className="mt-6 text-lg text-primary/80 max-w-2xl mx-auto">
        مساحتك الآمنة للإرشاد والدعم النفسي هنا يمكنك أن تطرح سؤالك، تشارك
        مشكلتك، مخاوفك، معوقاتك الروحية أو أي شيء يزعجك بخصوصية تامة وبدون الكشف
        عن هويتك.
      </p>
      <div className="mt-8 flex justify-center">
        <InstructionsButton />
      </div>
    </section>
  );
}
