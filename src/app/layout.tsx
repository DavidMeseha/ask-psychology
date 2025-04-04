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
        className={`${notoKufiArabic.className} min-h-screen max-w-7xl bg-gradient-to-br from-black via-gray-900 to-black mx-auto`}
      >
        <MainLayout>{children}</MainLayout>
      </body>
    </html>
  );
}
