import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Founder Systems Audit | Find Where Your Business Is Leaking Time, Leads & Sales",
  description:
    "Complete a free founder systems audit covering sales pipeline, lead capture, follow-up, operations, AI workflows, reporting, BD, and investor-readiness. Get a clear score and action plan.",
  metadataBase: new URL("https://scalarhk.com"),
  openGraph: {
    title: "Free Founder Systems Audit — Scalar",
    description:
      "See where your business is leaking time, leads, and sales — then get a practical score and recommendations.",
    type: "website",
    url: "https://scalarhk.com",
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={`${geist.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-[#06080f] text-white">
        {children}
      </body>
    </html>
  );
}
