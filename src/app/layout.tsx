import type { Metadata } from "next";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { UnitProvider } from "@/lib/units";

export const metadata: Metadata = {
  metadataBase: new URL("https://tallyard.com"),
  title: {
    default: "Tallyard — Calculators that show their work",
    template: "%s | Tallyard",
  },
  description:
    "Transparent calculators for home improvement and DIY. Every formula public, every source cited, no signup required.",
  openGraph: {
    title: "Tallyard — Calculators that show their work",
    description:
      "Transparent calculators for home improvement and DIY. Every formula public, every source cited.",
    url: "https://tallyard.com",
    siteName: "Tallyard",
    type: "website",
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
        <UnitProvider>
          <Header />
          <main>{children}</main>
          <Footer />
        </UnitProvider>
      </body>
    </html>
  );
}
