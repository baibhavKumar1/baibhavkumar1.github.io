import type { Metadata } from "next";
import { Space_Grotesk, Poppins, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const spaceGrotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-heading",
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const poppins = Poppins({
  subsets: ["latin"],
  variable: "--font-body",
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
  title: "Baibhav Kumar — Fullstack AI Engineer",
  description: "Portfolio and Engineering Design Docs for Baibhav Kumar. Building high-scale multi-agent DAGs, hybrid vector engines, LLMOps telemetry gateways, and PySpark ETL feature pipelines.",
  keywords: [
    "Fullstack AI Engineer",
    "AI Systems Engineer",
    "LangGraph",
    "pgvector",
    "TypeScript",
    "Python",
    "PySpark",
    "DuckDB",
    "System Architecture"
  ],
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${spaceGrotesk.variable} ${poppins.variable} ${jetbrainsMono.variable}`}>
      <body className="antialiased bg-white text-[#1447e6] font-sans selection:bg-[#1447e6] selection:text-white">
        {children}
      </body>
    </html>
  );
}
