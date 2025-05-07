"use client";

import { SessionProvider } from "next-auth/react";
import React from "react";
import Header from "./Header";
import { AppProgressProvider as ProgressProvider } from "@bprogress/next";
import Footer from "./Footer";
export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <SessionProvider>
      <ProgressProvider
        color="#003092"
        height="4px"
        options={{ showSpinner: false }}
        shallowRouting
      >
        <Header />
        {children}
        <Footer />
      </ProgressProvider>
    </SessionProvider>
  );
}
