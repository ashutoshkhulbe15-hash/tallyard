import type { ComponentType } from "react";

/**
 * IllustrationCategory reused from the calculator type — lets guides share
 * the CategoryIllustration component without duplicating the enum.
 */
export type GuideCategory =
  | "paint"
  | "concrete"
  | "flooring"
  | "landscaping"
  | "drywall"
  | "roofing"
  | "hvac"
  | "solar";

export interface GuideRelated {
  name: string;
  slug: string; // for calculators: relative slug like "siding-calculator"; for guides: "guides/..." prefix
  description: string;
  type?: "calculator" | "guide";
}

export interface GuideSource {
  name: string;
  url?: string;
  note?: string;
}

export interface GuideFAQ {
  question: string;
  answer: string;
}

export interface GuideConfig {
  /** URL slug without leading /guides/ */
  slug: string;
  /** <title> and og:title */
  title: string;
  /** Meta description (155 chars or fewer) */
  description: string;
  /** Banner H1 — last word auto-italicizes via BannerHeadline */
  bannerHeadline: string;
  /** Pills shown under the banner headline */
  bannerTags: string[];
  /** Displayed category label (e.g. "Roofing") */
  categoryLabel: string;
  /** Illustration category — reuses the same set as calculators */
  category: GuideCategory;
  /** Optional value label overlaid on the banner illustration */
  heroValue?: string;
  /** ISO date (for schema + display) */
  publishedAt: string;
  /** Human-readable read time */
  readTime: string;
  /** Body content — rendered inside the article container */
  Content: ComponentType;
  /** FAQ items — become JSON-LD FAQPage schema */
  faq: GuideFAQ[];
  /** Sources cited */
  sources: GuideSource[];
  /** Related calculators (primary) */
  relatedCalculators: GuideRelated[];
  /** Related guides (optional, for internal link juice) */
  relatedGuides?: GuideRelated[];
}
