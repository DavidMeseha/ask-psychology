"use client";

import { SessionProvider } from "next-auth/react";
import React from "react";
import Header from "./Header";
import Footer from "./Footer";
export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProvider>
      <Header />
      {children}
      <Footer />
    </SessionProvider>
  );
}
