import type { Metadata } from "next";
import { Fraunces, Inter } from "next/font/google";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { JsonLd } from "@/components/seo/JsonLd";
import { PROPERTY_NAME } from "@/lib/property";
import { buildHotelSchema } from "@/lib/schema";

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

const SITE_URL = process.env.NEXT_PUBLIC_SERVER_URL ?? "http://localhost:3000";

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: PROPERTY_NAME,
    template: `%s | ${PROPERTY_NAME}`,
  },
  description:
    "JW Marriott Mussoorie Walnut Grove Resort & Spa — a luxury mountain retreat.",
};

export default function RootLayout({ children }: LayoutProps<"/">) {
  return (
    <html
      lang="en"
      className={`${fraunces.variable} ${inter.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col font-sans">
        {/*
          Hotel schema (which subsumes Organization/NAP in the schema.org
          hierarchy — see lib/schema.ts) rendered once, site-wide, so every
          page carries the same structured data without repeating it.
        */}
        <JsonLd data={buildHotelSchema()} />
        <Header />
        <main className="flex-1">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
