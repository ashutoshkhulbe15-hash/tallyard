import { configs } from "@/configs";

const baseUrl = "https://www.tallyard.com";

export async function GET() {
  const slugs = Object.keys(configs);
  const items = slugs
    .map((slug) => {
      const c = configs[slug];
      return `    <item>
      <title>${escXml(c.title)}</title>
      <link>${baseUrl}/${slug}</link>
      <description>${escXml(c.description)}</description>
      <guid isPermaLink="true">${baseUrl}/${slug}</guid>
    </item>`;
    })
    .join("\n");

  const guides = [
    { slug: "vinyl-vs-fiber-cement-siding", title: "Vinyl vs fiber cement siding" },
    { slug: "composite-vs-pressure-treated-vs-cedar-deck", title: "Composite vs pressure-treated vs cedar deck" },
    { slug: "heat-pump-vs-furnace", title: "Heat pump vs furnace" },
  ];
  const guideItems = guides
    .map(
      (g) => `    <item>
      <title>${escXml(g.title)}</title>
      <link>${baseUrl}/guides/${g.slug}</link>
      <guid isPermaLink="true">${baseUrl}/guides/${g.slug}</guid>
    </item>`
    )
    .join("\n");

  const rss = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>Tallyard — Home improvement calculators</title>
    <link>${baseUrl}</link>
    <description>Free calculators for paint, concrete, roofing, decking, fencing, and 40+ other home projects.</description>
    <language>en-us</language>
    <atom:link href="${baseUrl}/feed.xml" rel="self" type="application/rss+xml" />
${items}
${guideItems}
  </channel>
</rss>`;

  return new Response(rss, {
    headers: {
      "Content-Type": "application/xml; charset=utf-8",
      "Cache-Control": "public, max-age=3600, s-maxage=3600",
    },
  });
}

function escXml(s: string): string {
  return s
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;");
}
