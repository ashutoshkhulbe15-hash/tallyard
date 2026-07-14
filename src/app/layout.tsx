import type { Metadata } from "next";
import Script from "next/script";
import localFont from "next/font/local";
import "./globals.css";
import { Header } from "@/components/Header";
import { Footer } from "@/components/Footer";
import { UnitProvider } from "@/lib/units";

// Self-hosted fonts via next/font/local. This removes the render-blocking
// Google Fonts @import chain (HTML -> CSS -> Google CSS -> 3 font files) that
// was the main cause of the slow mobile LCP. Files are served from our own
// origin, preloaded, with display:swap so text is visible during load.
const instrumentSans = localFont({
  src: [
    { path: "./fonts/instrument-sans-v4-latin-regular.woff2", weight: "400", style: "normal" },
    { path: "./fonts/instrument-sans-v4-latin-500.woff2", weight: "500", style: "normal" },
    { path: "./fonts/instrument-sans-v4-latin-600.woff2", weight: "600", style: "normal" },
  ],
  display: "swap",
  variable: "--font-instrument",
  preload: true,
  fallback: ["ui-sans-serif", "system-ui", "-apple-system", "sans-serif"],
});
const archivo = localFont({
  src: [
    { path: "./fonts/archivo-v25-latin-regular.woff2", weight: "400", style: "normal" },
    { path: "./fonts/archivo-v25-latin-500.woff2", weight: "500", style: "normal" },
    { path: "./fonts/archivo-v25-latin-600.woff2", weight: "600", style: "normal" },
    { path: "./fonts/archivo-v25-latin-700.woff2", weight: "700", style: "normal" },
    { path: "./fonts/archivo-v25-latin-800.woff2", weight: "800", style: "normal" },
    { path: "./fonts/archivo-v25-latin-900.woff2", weight: "900", style: "normal" },
  ],
  display: "swap",
  variable: "--font-archivo",
  preload: true,
  fallback: ["Instrument Sans", "sans-serif"],
});
const jetbrainsMono = localFont({
  src: [
    { path: "./fonts/jetbrains-mono-v24-latin-regular.woff2", weight: "400", style: "normal" },
    { path: "./fonts/jetbrains-mono-v24-latin-500.woff2", weight: "500", style: "normal" },
    { path: "./fonts/jetbrains-mono-v24-latin-700.woff2", weight: "700", style: "normal" },
  ],
  display: "swap",
  variable: "--font-mono",
  preload: false,
  fallback: ["ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
});

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
    <html
      lang="en"
      className={`${instrumentSans.variable} ${archivo.variable} ${jetbrainsMono.variable}`}
    >
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
  strategy="lazyOnload"
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
