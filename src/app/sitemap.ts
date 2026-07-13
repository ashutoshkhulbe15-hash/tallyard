import type { MetadataRoute } from "next";

const SITE_URL = "https://www.tallyard.com";

// Real last-modified dates. Google ignores lastmod that changes on every
// deploy, so dates here must reflect actual content changes.
// RULE (playbook): when a page is refined, update its date here in the same commit.
const DEFAULT_DATE = new Date("2026-04-20"); // initial content build-out
const REDESIGN_DATE = new Date("2026-07-09"); // sitewide Ledger redesign shipped
const MODIFIED: Record<string, Date> = {
  // page-refinement series deploys
  "drywall-calculator": new Date("2026-07-13"),
  "shed-calculator": new Date("2026-07-10"),
  "gutter-calculator": new Date("2026-07-11"),
  "stair-calculator": new Date("2026-07-11"),
  "rainwater-calculator": new Date("2026-07-11"),
  "window-sizing-calculator": new Date("2026-07-11"),
  // structurally redesigned pages
  "": REDESIGN_DATE, // homepage
  "calculators": REDESIGN_DATE,
  "guides": REDESIGN_DATE,
  "planner": REDESIGN_DATE,
};
const lastMod = (slug: string): Date => MODIFIED[slug] ?? DEFAULT_DATE;

export default function sitemap(): MetadataRoute.Sitemap {

  const staticPages: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, lastModified: lastMod(""), changeFrequency: "weekly", priority: 1.0 },
    { url: `${SITE_URL}/calculators`, lastModified: lastMod("calculators"), changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE_URL}/guides`, lastModified: lastMod("guides"), changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE_URL}/planner`, lastModified: lastMod("planner"), changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE_URL}/planner/build-a-deck`, lastModified: lastMod("planner/build-a-deck"), changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/planner/install-a-fence`, lastModified: lastMod("planner/install-a-fence"), changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/planner/paint-a-room`, lastModified: lastMod("planner/paint-a-room"), changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/planner/replace-a-roof`, lastModified: lastMod("planner/replace-a-roof"), changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/planner/build-a-patio`, lastModified: lastMod("planner/build-a-patio"), changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/planner/remodel-a-bathroom`, lastModified: lastMod("planner/remodel-a-bathroom"), changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/methodology`, lastModified: lastMod("methodology"), changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE_URL}/about`, lastModified: lastMod("about"), changeFrequency: "monthly", priority: 0.5 },
    { url: `${SITE_URL}/contact`, lastModified: lastMod("contact"), changeFrequency: "yearly", priority: 0.3 },
    { url: `${SITE_URL}/privacy`, lastModified: lastMod("privacy"), changeFrequency: "yearly", priority: 0.3 },
    { url: `${SITE_URL}/terms`, lastModified: lastMod("terms"), changeFrequency: "yearly", priority: 0.3 },
  ];

  const calculatorSlugs = [
    "paint-calculator",
    "concrete-calculator",
    "tile-calculator",
    "mulch-calculator",
    "drywall-calculator",
    "roofing-calculator",
    "btu-calculator",
    "gravel-calculator",
    "solar-calculator",
    "wire-size-calculator",
    "insulation-calculator",
    "fence-calculator",
    "grout-calculator",
    "paver-calculator",
    "deck-calculator",
    "flooring-calculator",
    "topsoil-calculator",
    "sod-calculator",
    "asphalt-calculator",
    "lumber-calculator",
    "stair-calculator",
    "rebar-calculator",
    "brick-calculator",
    "wallpaper-calculator",
    "shower-tile-calculator",
    "backsplash-calculator",
    "vanity-calculator",
    "countertop-calculator",
    "siding-calculator",
    "gutter-calculator",
    "heat-pump-calculator",
    "water-heater-calculator",
    "extension-cord-calculator",
    "attic-ventilation-calculator",
    "pool-chlorine-calculator",
    "shed-calculator",
    "rainwater-calculator",
    "snow-load-calculator",
    "stud-spacing-calculator",
    "drain-pipe-calculator",
    "kitchen-cabinet-calculator",
    "garage-door-calculator",
    "window-sizing-calculator",
    "chimney-calculator",
  ];
  const calculatorPages: MetadataRoute.Sitemap = calculatorSlugs.map((slug) => ({
    url: `${SITE_URL}/${slug}`,
    lastModified: lastMod(slug),
    changeFrequency: "monthly",
    priority: 0.9,
  }));

  const guideSlugs = [
    "vinyl-vs-fiber-cement-siding",
    "composite-vs-pressure-treated-vs-cedar-deck",
    "heat-pump-vs-furnace",
  ];
  const guidePages: MetadataRoute.Sitemap = guideSlugs.map((slug) => ({
    url: `${SITE_URL}/guides/${slug}`,
    lastModified: lastMod(`guides/${slug}`),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const costSlugs = [
    "cost-to-build-a-deck",
    "cost-to-replace-a-roof",
    "cost-to-build-a-fence",
    "cost-to-paint-a-house",
    "cost-to-install-flooring",
    "cost-to-remodel-a-bathroom",
    "cost-to-pour-concrete",
    "cost-to-install-siding",
    "cost-to-install-solar",
    "cost-to-replace-hvac",
  ];
  const costPages: MetadataRoute.Sitemap = costSlugs.map((slug) => ({
    url: `${SITE_URL}/${slug}`,
    lastModified: lastMod(slug),
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  const categorySlugs = [
    "paint-walls",
    "masonry",
    "flooring-kitchen",
    "landscaping",
    "roofing-exterior",
    "hvac-plumbing",
    "electrical-solar",
    "lumber-framing",
  ];
  const categoryPages: MetadataRoute.Sitemap = categorySlugs.map((slug) => ({
    url: `${SITE_URL}/calculators/${slug}`,
    lastModified: lastMod(`calculators/${slug}`),
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticPages, ...calculatorPages, ...guidePages, ...costPages, ...categoryPages];
}
