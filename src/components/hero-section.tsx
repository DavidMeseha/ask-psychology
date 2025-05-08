"use client";

import { useRef } from "react";
import { InstructionsButton } from "./Instructions-button";
import verses from "@/bible-verses.json";
import { Quote } from "lucide-react";
import { motion } from "framer-motion";

export function HeroSection() {
  const ref = useRef<Date>(new Date());
  const month = ref.current.getMonth();
  const day = ref.current.getDate();
  const verse = verses[month][day];

  return (
    <>
      {/* Content Container */}
      <div className="max-w-4xl mx-auto px-4">
        {/* Daily Verse */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="bg-white/50 backdrop-blur-sm rounded-2xl p-4 mb-12 shadow-sm"
        >
          <div className="flex items-start gap-2">
            <Quote className="h-5 w-5 text-primary/60 flex-shrink-0 mt-1" />
            <p className="text-sm text-muted-foreground">
              {verse.verse}
              <span className="text-nowrap block mt-1 text-xs text-primary/60">
                ({verse.reference})
              </span>
            </p>
          </div>
        </motion.div>

        {/* Hero Title */}
        <motion.h1
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="text-4xl font-bold tracking-tight sm:text-5xl md:text-6xl text-center"
        >
          <span className="inline-block bg-gradient-to-r from-[#003092] via-[#00879e] to-[#ffab5b] text-transparent bg-clip-text pb-2 hero">
            مساحة آمنة للمشاركة
          </span>
        </motion.h1>

        {/* Description */}
        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.2 }}
          className="mt-8 text-lg text-muted-foreground text-center leading-relaxed"
        >
          مساحتك الآمنة للإرشاد والدعم النفسي هنا يمكنك أن تطرح سؤالك، تشارك
          مشكلتك، مخاوفك، معوقاتك الروحية أو أي شيء يزعجك بخصوصية تامة وبدون
          الكشف عن هويتك.
        </motion.p>

        {/* CTA Button */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.4 }}
          className="mt-12 flex justify-center"
        >
          <InstructionsButton />
        </motion.div>
      </div>
    </>
  );
}
