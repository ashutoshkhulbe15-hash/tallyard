import type { CalculatorConfig } from "./types";

interface SchemaProps {
  config: CalculatorConfig;
  baseUrl?: string;
}

/**
 * Generate the full JSON-LD schema bundle for a calculator page:
 * - WebApplication (for the tool itself)
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

  const article = config.ContentExpansion
    ? {
        "@context": "https://schema.org",
        "@type": "TechArticle",
        headline: config.title,
        description: config.description,
        url: pageUrl,
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
        // Machine-readable versions of the standards cited in the Sources
        // section. Lets search and answer engines see which published
        // standard each page is built on, not just the visible link list.
        ...(config.sources.length > 0
          ? {
              citation: config.sources.map((src) =>
                src.url
                  ? {
                      "@type": "CreativeWork",
                      name: src.name,
                      url: src.url,
                      ...(src.note ? { description: src.note } : {}),
                    }
                  : {
                      "@type": "CreativeWork",
                      name: src.name,
                      ...(src.note ? { description: src.note } : {}),
                    },
              ),
            }
          : {}),
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
