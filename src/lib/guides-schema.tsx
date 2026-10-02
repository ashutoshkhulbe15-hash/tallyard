import type { GuideConfig } from "./guides-types";

interface GuideSchemaProps {
  config: GuideConfig;
  baseUrl?: string;
}

/**
 * Build the JSON-LD bundle for a guide page:
 * - Article (so Google treats it as an editorial piece, not a tool)
 * - BreadcrumbList (Home > Guides > {guide title})
 */
export function getGuideSchema({
  config,
  baseUrl = "https://www.tallyard.com",
}: GuideSchemaProps): object[] {
  const pageUrl = `${baseUrl}/guides/${config.slug}`;

  const article = {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: config.title,
    description: config.description,
    ...(config.verdict
      ? {
          abstract: config.verdict,
          speakable: {
            "@type": "SpeakableSpecification",
            cssSelector: [".guide-verdict"],
          },
        }
      : {}),
    url: pageUrl,
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
    // Machine-readable versions of the standards cited in the Sources section.
    ...(config.sources.length > 0
      ? {
          citation: config.sources.map((src) => ({
            "@type": "CreativeWork",
            name: src.name,
            ...(src.url ? { url: src.url } : {}),
            ...(src.note ? { description: src.note } : {}),
          })),
        }
      : {}),
  };

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

  return [article, breadcrumbs];
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
