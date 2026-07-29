import type { Metadata } from "next";
import { EmbedDirectory } from "./EmbedDirectory";

export const metadata: Metadata = {
  title: "Embed a Free Calculator on Your Site",
  description:
    "Free embeddable home improvement calculators for concrete, mulch, gravel, paint, and deck stairs. One line of HTML, no ads, no signup, attribution link included.",
  alternates: { canonical: "/embed-a-calculator" },
  openGraph: {
    title: "Embed a Free Calculator on Your Site",
    description:
      "Free embeddable calculators for concrete, mulch, gravel, paint, and deck stairs. One line of HTML, no ads, no signup.",
    url: "https://www.tallyard.com/embed-a-calculator",
    type: "website",
  },
};

export default function EmbedACalculatorPage() {
  return <EmbedDirectory />;
}
