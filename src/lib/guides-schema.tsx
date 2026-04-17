import type { GuideConfig } from "./guides-types";

interface GuideSchemaProps {
  config: GuideConfig;
  baseUrl?: string;
}

/**
 * Build the JSON-LD bundle for a guide page:
 * - Article (so Google treats it as an editorial piece, not a tool)
 * - FAQPage (for the FAQ section)
 * - BreadcrumbList (Home > Guides > {guide title})
 */
export function getGuideSchema({
  config,
  baseUrl = "https://tallyard.com",
}: GuideSchemaProps): object[] {
  const pageUrl = `${baseUrl}/guides/${config.slug}`;

  const article = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: config.title,
    description: config.description,
    url: pageUrl,
    datePublished: config.publishedAt,
    dateModified: config.publishedAt,
    author: {
      "@type": "Organization",
      name: "Tallyard",
      url: baseUrl,
    },
    publisher: {
      "@type": "Organization",
      name: "Tallyard",
      url: baseUrl,
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": pageUrl,
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
        name: "Guides",
        item: `${baseUrl}/guides`,
      },
      {
        "@type": "ListItem",
        position: 3,
        name: config.title,
        item: pageUrl,
      },
    ],
  };

  return faqPage ? [article, faqPage, breadcrumbs] : [article, breadcrumbs];
}

export function GuideSchemaScript({ config }: { config: GuideConfig }) {
  const schemas = getGuideSchema({ config });
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
