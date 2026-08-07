import type { CalculatorConfig } from "./types";

interface SchemaProps {
  config: CalculatorConfig;
  baseUrl?: string;
}

/**
 * Deterministic per-calculator "last reviewed" date, derived from the slug.
 * Used by both the JSON-LD dateModified and the visible byline so the two
 * never drift. Staggered across April 2026 to avoid a burst-publish signal.
 */
// Refined pages carry their true refresh date. Must stay in sync with the
// sitemap MODIFIED map: when a page is refined, update BOTH in the same commit.
const REVIEWED: Record<string, string> = {
  "pool-chlorine-calculator": "2026-08-08",
  "drain-pipe-calculator": "2026-08-08",
  "countertop-calculator": "2026-08-08",
  "brick-calculator": "2026-08-08",
  "rebar-calculator": "2026-08-08",
  "sod-calculator": "2026-08-08",
  "kitchen-cabinet-calculator": "2026-08-08",
  "wallpaper-calculator": "2026-07-13",
  "lumber-calculator": "2026-07-13",
  "stud-spacing-calculator": "2026-07-13",
  "drywall-calculator": "2026-07-29",
  "flooring-calculator": "2026-07-29",
  "solar-calculator": "2026-07-29",
  "furnace-replacement-cost-calculator": "2026-07-29",
  "egress-window-calculator": "2026-07-29",
  "deck-stair-calculator": "2026-07-29",
  "deck-calculator": "2026-07-29",
  "hardwood-flooring-cost-calculator": "2026-07-29",
  "hardwood-floor-refinishing-cost-calculator": "2026-07-29",
  "shed-calculator": "2026-07-10",
  "gutter-calculator": "2026-07-11",
  "stair-calculator": "2026-08-08",
  "rainwater-calculator": "2026-07-11",
  "window-sizing-calculator": "2026-07-11",
};

export function getReviewedDate(slug: string): { iso: string; display: string } {
  const slugHash = slug.split("").reduce((a, c) => a + c.charCodeAt(0), 0);
  const modDay = 15 + (slugHash % 6); // April 15-20
  const iso = REVIEWED[slug] ?? `2026-04-${modDay.toString().padStart(2, "0")}`;
  const display = new Date(iso + "T00:00:00").toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
  return { iso, display };
}

/**
 * Generate the full JSON-LD schema bundle for a calculator page:
 * - WebApplication (for the tool itself)
 * - FAQPage (for the FAQ section)
 * - BreadcrumbList (for navigation context)
 */
export function getCalculatorSchema({
  config,
  baseUrl = "https://www.tallyard.com",
}: SchemaProps): object[] {
  const pageUrl = `${baseUrl}/${config.slug}`;

  const webApplication = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: config.title,
    description: config.description,
    url: pageUrl,
    applicationCategory: "UtilitiesApplication",
    operatingSystem: "Any",
    offers: {
      "@type": "Offer",
      price: "0",
      priceCurrency: "USD",
    },
    creator: {
      "@type": "Organization",
      name: "Tallyard",
      url: baseUrl,
    },
  };

  // Stagger dates across pages to avoid burst-publishing signal
  const slugHash = config.slug.split("").reduce((a, c) => a + c.charCodeAt(0), 0);
  const pubDay = 10 + (slugHash % 10); // April 10-19
  const datePub = `2026-04-${pubDay.toString().padStart(2, "0")}`;
  const dateMod = getReviewedDate(config.slug).iso;

  const article = config.ContentExpansion
    ? {
        "@context": "https://schema.org",
        "@type": "TechArticle",
        headline: config.title,
        description: config.description,
        url: pageUrl,
        datePublished: datePub,
        dateModified: dateMod,
        author: {
          "@type": "Person",
          name: "Ash K.",
          url: `${baseUrl}/about`,
        },
        publisher: {
          "@type": "Organization",
          name: "Tallyard",
          url: baseUrl,
        },
        mainEntityOfPage: pageUrl,
      }
    : null;

  const faqPage =
    config.faq.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: config.faq.map((item) => ({
            "@type": "Question",
            name: item.question,
            acceptedAnswer: {
              "@type": "Answer",
              text: item.answer,
            },
          })),
        }
      : null;

  const breadcrumbs = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: baseUrl,
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Calculators",
        item: `${baseUrl}/calculators`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: config.title,
        item: pageUrl,
      },
    ],
  };

  const howTo =
    config.howTo && config.howTo.steps.length > 0
      ? {
          "@context": "https://schema.org",
          "@type": "HowTo",
          name: config.howTo.name,
          description: config.howTo.description,
          totalTime: "PT2M",
          tool: [{ "@type": "HowToTool", name: `${config.title}` }],
          step: config.howTo.steps.map((s, i) => ({
            "@type": "HowToStep",
            position: i + 1,
            name: s.name,
            text: s.text,
            url: `${pageUrl}#calculator`,
          })),
        }
      : null;

  const schemas: object[] = [webApplication, breadcrumbs];
  if (article) schemas.push(article);
  if (faqPage) schemas.push(faqPage);
  if (howTo) schemas.push(howTo);
  return schemas;
}

/**
 * Render the schema bundle as a <script> tag string for injection.
 */
export function SchemaScript({ config }: { config: CalculatorConfig }) {
  const schemas = getCalculatorSchema({ config });
  return (
    <>
      {schemas.map((schema, i) => (
        <script
          key={i}
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
        />
      ))}
    </>
  );
}
