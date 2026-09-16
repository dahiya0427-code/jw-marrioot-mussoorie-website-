import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import "@/app/(frontend)/globals.css";
import { Ticker } from "@/components/Ticker";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import FrontendNotFound from "@/app/(frontend)/not-found";
import { PROPERTY_NAME } from "@/lib/property";

// This project has two independent root-level route groups —
// app/(frontend) and app/(payload) — each defining its own <html>/<body>
// (Payload's own admin shell needs a separate document from the public
// site). Neither group's not-found.tsx is reachable for a URL that
// matches NEITHER group, so Next.js falls back to its generic built-in
// 404 unless a not-found.tsx exists at this true app root. Because
// nothing above this file provides <html>/<body>, this one has to
// supply its own — it deliberately mirrors app/(frontend)/layout.tsx's
// document shell and reuses that group's on-brand 404 content instead
// of duplicating the copy.
const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: `Page not found | ${PROPERTY_NAME}`,
};

export default function RootNotFound() {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">
        <Ticker />
        <Header />
        <main className="flex-1">
          <FrontendNotFound />
        </main>
        <Footer />
      </body>
    </html>
  );
}
