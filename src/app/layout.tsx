import type { Metadata } from "next";
import Script from "next/script";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { UnitProvider } from "@/lib/units";

export const metadata: Metadata = {
  metadataBase: new URL("https://www.tallyard.com"),
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
    url: "https://www.tallyard.com",
    siteName: "Tallyard",
    type: "website",
    images: [{ url: "/og-default.png", width: 1200, height: 630, alt: "Tallyard — Calculators that show their work" }],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og-default.png"],
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <Script
          src="https://www.googletagmanager.com/gtag/js?id=G-7LB5KS70CD"
          strategy="afterInteractive"
        />
        <Script id="ga-init" strategy="afterInteractive">
          {`window.dataLayer = window.dataLayer || [];
function gtag(){dataLayer.push(arguments);}
gtag('js', new Date());
gtag('config', 'G-7LB5KS70CD');`}
        </Script>
        <Script
  id="ms-clarity"
  strategy="afterInteractive"
  dangerouslySetInnerHTML={{
    __html: `(function(c,l,a,r,i,t,y){c[a]=c[a]||function(){(c[a].q=c[a].q||[]).push(arguments)};t=l.createElement(r);t.async=1;t.src="https://www.clarity.ms/tag/"+i+"?ref=bwt";y=l.getElementsByTagName(r)[0];y.parentNode.insertBefore(t,y);})(window, document, "clarity", "script", "wp47rtb8ix");`,
  }}
/>
      </head>
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
