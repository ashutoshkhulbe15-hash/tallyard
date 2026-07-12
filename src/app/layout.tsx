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
    title: "Tallyard: Calculators that show their work",
    description:
      "Transparent calculators for home improvement and DIY. Every formula public, every source cited.",
    url: "https://www.tallyard.com",
    siteName: "Tallyard",
    type: "website",
    images: [{ url: "/og-default.png", width: 1200, height: 630, alt: "Tallyard" }],
  },
  twitter: {
    card: "summary_large_image",
    images: ["/og-default.png"],
  },
};

// Sitewide entity schema. Organization establishes the Tallyard brand entity
// (helps the "tallyard" brand query and AI-engine citation); WebSite ties
// every page back to the publisher.
const orgSchema = {
  "@context": "https://schema.org",
  "@graph": [
    {
      "@type": "Organization",
      "@id": "https://www.tallyard.com/#organization",
      name: "Tallyard",
      url: "https://www.tallyard.com",
      logo: {
        "@type": "ImageObject",
        url: "https://www.tallyard.com/og-default.png",
        width: 1200,
        height: 630,
      },
      description:
        "Free home improvement calculators that show their work. Every formula public, every source cited against published standards (IRC, NEC, AWC, TCNA).",
      founder: {
        "@type": "Person",
        name: "Ash K.",
        url: "https://www.tallyard.com/about",
        sameAs: ["https://www.linkedin.com/in/ash-k-5baa5016a/"],
      },
    },
    {
      "@type": "WebSite",
      "@id": "https://www.tallyard.com/#website",
      name: "Tallyard",
      url: "https://www.tallyard.com",
      publisher: { "@id": "https://www.tallyard.com/#organization" },
    },
  ],
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(orgSchema) }}
        />
        {/* llms.txt discovery for AI answer engines */}
        <link
          rel="alternate"
          type="text/plain"
          href="https://www.tallyard.com/llms.txt"
          title="llms.txt"
        />
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
