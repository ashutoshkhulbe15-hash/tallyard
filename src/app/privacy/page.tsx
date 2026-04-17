import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy policy — Tallyard",
  description:
    "How Tallyard handles your data. Short version: calculator inputs stay in your browser, we don't collect personal information, and we don't sell anything.",
  alternates: { canonical: "/privacy" },
};

export default function PrivacyPage() {
  return (
    <div className="container-content py-12 md:py-16">
      <p className="text-[11px] uppercase tracking-[0.08em] text-ink-faint mb-3 font-semibold">
        Legal
      </p>
      <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-3">
        Privacy policy
      </h1>
      <p className="text-sm text-ink-faint mb-10">
        Last updated: April 18, 2026
      </p>

      <div className="space-y-8 text-base text-ink-muted leading-relaxed max-w-prose">
        <div>
          <h2 className="text-lg font-semibold text-ink mb-2">
            The short version
          </h2>
          <p>
            Tallyard does not collect personal information. Calculator
            inputs are processed entirely in your browser. We don&apos;t
            store your calculations, we don&apos;t track which tools you
            use, and we don&apos;t sell or share data with anyone.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-ink mb-2">
            Analytics
          </h2>
          <p>
            We use privacy-focused analytics to understand which pages
            are visited and from which countries. This data is aggregated
            and anonymized. We collect page views, referrer URLs, browser
            type, and screen size. We do not collect IP addresses, names,
            email addresses, or any personally identifiable information
            through analytics.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-ink mb-2">
            Cookies
          </h2>
          <p>
            Tallyard uses minimal first-party cookies for functionality
            (remembering your unit preference between imperial and metric).
            We do not use third-party tracking cookies. If you block all
            cookies, the site still works; your unit preference just
            won&apos;t persist between visits.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-ink mb-2">
            Calculator inputs
          </h2>
          <p>
            All calculator inputs and results are processed client-side in
            your browser using JavaScript. No input data is ever sent to
            Tallyard servers or any third party. When you close the tab,
            your inputs are gone. We cannot see, store, or retrieve what
            you entered.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-ink mb-2">
            Email
          </h2>
          <p>
            If you email us at{" "}
            <a
              href="mailto:hello@tallyard.com"
              className="text-accent hover:underline"
            >
              hello@tallyard.com
            </a>
            , we receive and store your email address and message content
            for the purpose of responding to your inquiry. We do not add
            email addresses to marketing lists, newsletters, or automated
            sequences. We do not share email addresses with third parties.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-ink mb-2">
            Third-party services
          </h2>
          <p>
            Tallyard is hosted on Vercel. Google Fonts are loaded for
            typography. These services have their own privacy policies.
            No advertising networks, retargeting pixels, or social media
            trackers are present on this site.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-ink mb-2">
            Children&apos;s privacy
          </h2>
          <p>
            Tallyard is not directed at children under 13 and does not
            knowingly collect information from children.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-ink mb-2">
            Changes to this policy
          </h2>
          <p>
            If we change this policy in a material way, we&apos;ll update
            the &ldquo;last updated&rdquo; date at the top and note
            what changed. No previous version of this policy collected
            more data than the current version.
          </p>
        </div>

        <div>
          <h2 className="text-lg font-semibold text-ink mb-2">
            Contact
          </h2>
          <p>
            Questions about privacy? Email{" "}
            <a
              href="mailto:hello@tallyard.com"
              className="text-accent hover:underline"
            >
              hello@tallyard.com
            </a>
            .
          </p>
        </div>
      </div>
    </div>
  );
}
