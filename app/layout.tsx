import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";
import Navigation from "@/components/Navigation";

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

const BASE_URL = "https://mukulkumar.dev";

export const metadata: Metadata = {
  metadataBase: new URL(BASE_URL),
  title: "Mukul Kumar — Applied AI Engineer",
  description:
    "Applied AI Engineer specializing in Computer Vision, NLP, and Production ML Systems. 8+ years building enterprise-grade AI with 5 filed patents and research published at KDD.",
  keywords: [
    "AI Engineer",
    "Computer Vision",
    "NLP Engineer",
    "Machine Learning",
    "Document AI",
    "OCR",
    "TensorRT",
    "Computer Vision Consultant",
    "AI Consultant India",
    "Production ML",
    "Mukul Kumar",
    "BITS Pilani AI",
  ],
  authors: [{ name: "Mukul Kumar", url: BASE_URL }],
  creator: "Mukul Kumar",
  alternates: {
    canonical: BASE_URL,
  },
  openGraph: {
    title: "Mukul Kumar — Applied AI Engineer",
    description:
      "Applied AI Engineer specializing in Computer Vision, NLP, and Production ML Systems. 8+ years building enterprise-grade AI, 5 filed patents, research published at KDD.",
    type: "website",
    url: BASE_URL,
    siteName: "Mukul Kumar",
    locale: "en_US",
  },
  twitter: {
    card: "summary_large_image",
    site: "@mukulkr",
    creator: "@mukulkr",
    title: "Mukul Kumar — Applied AI Engineer",
    description:
      "Applied AI Engineer specializing in Computer Vision, NLP, and Production ML Systems.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en" className={inter.variable}>
      <body>
        <Navigation />
        {children}
      </body>
    </html>
  );
}
