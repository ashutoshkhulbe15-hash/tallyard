import type { CalculatorConfig } from "./types";

interface SchemaProps {
  config: CalculatorConfig;
  baseUrl?: string;
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

  return faqPage
    ? [webApplication, faqPage, breadcrumbs]
    : [webApplication, breadcrumbs];
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
