import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Scalar — Find your bottlenecks. Automate them away.",
  description:
    "Scalar diagnoses the hidden bottlenecks in your business and builds custom AI automations to clear them — so you can scale without burning out.",
  metadataBase: new URL("https://scalarhk.com"),
  openGraph: {
    title: "Scalar — Find your bottlenecks. Automate them away.",
    description:
      "AI-powered bottleneck diagnosis and automation for SMEs and solopreneurs. Join the waitlist.",
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
