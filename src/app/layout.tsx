import MainLayout from "@/components/layouts/MainLayout";
import { Noto_Kufi_Arabic } from "next/font/google";
import "./globals.css";

const notoKufiArabic = Noto_Kufi_Arabic({
  subsets: ["arabic"],
  variable: "--font-arabic",
});

export const metadata = {
  title: "أسأل في علم النفس",
  description: "مكان للمشاركه او الاستفسار في موضيع تخص علم النفس",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="ar" dir="rtl">
      <body
        className={`${notoKufiArabic.className} bg-gradient-to-br from-slate-50 via-slate-200 to-slate-50`}
      >
        <div className="min-h-screen max-w-7xl mx-auto">
          <MainLayout>{children}</MainLayout>
        </div>
      </body>
    </html>
  );
}
