import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";

export const metadata: Metadata = {
  metadataBase: new URL("https://tallyard.com"),
  title: {
    default: "Tallyard — Calculators for home improvement and DIY",
    template: "%s | Tallyard",
  },
  description:
    "Transparent, well-designed calculators for home improvement and DIY projects. Every formula is public and cited.",
  applicationName: "Tallyard",
  keywords: [
    "diy calculator",
    "home improvement calculator",
    "construction calculator",
    "renovation calculator",
  ],
  authors: [{ name: "Tallyard" }],
  creator: "Tallyard",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://tallyard.com",
    siteName: "Tallyard",
    title: "Tallyard — Calculators for home improvement and DIY",
    description:
      "Transparent, well-designed calculators for home improvement and DIY projects.",
  },
  twitter: {
    card: "summary",
    title: "Tallyard",
    description:
      "Transparent, well-designed calculators for home improvement and DIY projects.",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  alternates: {
    canonical: "/",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body>
        <Header />
        <main>{children}</main>
        <Footer />
      </body>
    </html>
  );
}
