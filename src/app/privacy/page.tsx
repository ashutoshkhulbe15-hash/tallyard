import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy",
  description: "Tallyard privacy policy.",
};

export default function PrivacyPage() {
  return (
    <div className="container-content py-16">
      <p className="text-xs uppercase tracking-wide text-ink-faint mb-3">Privacy</p>
      <h1 className="text-3xl font-semibold tracking-tight mb-8">Privacy policy</h1>
      <div className="space-y-5 text-base text-ink">
        <p>
          Tallyard is committed to protecting your privacy. This page explains what data we
          collect and how we use it.
        </p>
        <div>
          <h2 className="text-lg font-semibold mb-2">What we collect</h2>
          <p className="text-ink-muted">
            Basic analytics: page views, device type, and country. We do not collect personal
            information. Calculator inputs are processed in your browser and never sent to
            our servers.
          </p>
        </div>
        <div>
          <h2 className="text-lg font-semibold mb-2">Cookies</h2>
          <p className="text-ink-muted">
            We use minimal cookies for analytics. You can block them without losing any
            functionality.
          </p>
        </div>
        <div>
          <h2 className="text-lg font-semibold mb-2">Contact</h2>
          <p className="text-ink-muted">
            Questions about privacy? Email <a href="mailto:hello@tallyard.com" className="text-accent hover:underline">hello@tallyard.com</a>.
          </p>
        </div>
      </div>
    </div>
  );
}
