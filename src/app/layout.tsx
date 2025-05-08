import MainLayout from "@/components/layout/MainLayout";
import { Noto_Kufi_Arabic } from "next/font/google";
import "./globals.css";

const notoKufiArabic = Noto_Kufi_Arabic({
  subsets: ["arabic"],
  variable: "--font-arabic",
});

export const metadata = {
  title: "Sero | سيرو في النور",
  description: "مكان للمشاركه او الاستفسار في موضيع تخص علم النفس",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl">
      <body className={`${notoKufiArabic.className} bg-primary/5 pb-20`}>
        <div className="min-h-screen max-w-7xl mx-auto">
          <MainLayout>{children}</MainLayout>
        </div>
      </body>
    </html>
  );
}
