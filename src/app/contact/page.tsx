import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Contact",
  description: "Get in touch with Tallyard.",
};

export default function ContactPage() {
  return (
    <div className="container-content py-16">
      <p className="text-xs uppercase tracking-wide text-ink-faint mb-3">Contact</p>
      <h1 className="text-3xl font-semibold tracking-tight mb-6">Contact</h1>
      <p className="text-base text-ink mb-4">
        Found an error in a calculator? Have a formula suggestion? Noticed a source
        that needs updating?
      </p>
      <p className="text-base text-ink-muted">
        Email: <a href="mailto:hello@tallyard.com" className="text-accent hover:underline">hello@tallyard.com</a>
      </p>
    </div>
  );
}
