import type { Metadata } from "next";
import { Fraunces, Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-serif",
  display: "swap",
});

const plusJakartaSans = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

const jetbrainsMono = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500", "600"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "Baibhav Kumar — Staff Fullstack AI Engineer & Systems Architect",
  description: "Portfolio and Architectural Field Notes for Baibhav Kumar. Building high-scale multi-agent DAGs, hybrid vector engines, real-time Rust LLMOps gateways, and human-in-the-loop AI infrastructure.",
  keywords: [
    "Staff Fullstack AI Engineer",
    "GenAI Systems Architect",
    "LangGraph",
    "pgvector",
    "TypeScript",
    "Python",
    "Rust",
    "PySpark",
    "Human in the Loop AI",
    "System Architecture"
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${fraunces.variable} ${plusJakartaSans.variable} ${jetbrainsMono.variable}`}>
      <body className="antialiased bg-[#FAF8F5] text-[#1C1917] font-sans selection:bg-[#D97706] selection:text-white min-h-screen">
        {children}
      </body>
    </html>
  );
}
