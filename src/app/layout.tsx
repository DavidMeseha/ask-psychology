import MainLayout from "@/components/layout/MainLayout";
import { Noto_Kufi_Arabic } from "next/font/google";
import "./globals.css";
import Image from "next/image";

const notoKufiArabic = Noto_Kufi_Arabic({
  subsets: ["arabic"],
  variable: "--font-arabic",
});

export async function generateMetadata() {
  return {
    title: "Sero | سيرو في النور",
    description: "مكان للمشاركه او الاستفسار في موضيع تخص علم النفس",
    metadataBase: new URL("https://sero-fe-elnoor-space.vercel.app"),
    icons: {
      icon: "/favicon.ico",
    },
    other: {
      "preload-images": "/white-glow-light-effect-png1.webp",
    },
  };
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl">
      <body className={`${notoKufiArabic.className} bg-primary/5 pb-28`}>
        <div className="relative overflow-clip">
          {/* Light Image Effect */}
          <div className="absolute top-0 right-[-930px] sm:right-auto sm:left-1/2 sm:-translate-x-1/2 w-[2000px] h-[1150px] pointer-events-none">
            <Image
              src="/white-glow-light-effect-png1.webp"
              alt=""
              fill
              priority
              loading="eager"
              fetchPriority="high"
              className="object-contain object-top opacity-20 light-image-transformation"
              style={{ top: -90 }}
            />
          </div>

          <div className="min-h-screen max-w-7xl mx-auto relative">
            <MainLayout>{children}</MainLayout>
          </div>
        </div>
      </body>
    </html>
  );
}
