import type { MetadataRoute } from "next";

const SITE_URL = "https://www.tallyard.com";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();

  const staticPages: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/`, lastModified: now, changeFrequency: "weekly", priority: 1.0 },
    { url: `${SITE_URL}/calculators`, lastModified: now, changeFrequency: "weekly", priority: 0.9 },
    { url: `${SITE_URL}/guides`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE_URL}/planner`, lastModified: now, changeFrequency: "weekly", priority: 0.8 },
    { url: `${SITE_URL}/planner/build-a-deck`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/planner/install-a-fence`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/planner/paint-a-room`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/planner/replace-a-roof`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/planner/build-a-patio`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/planner/remodel-a-bathroom`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${SITE_URL}/methodology`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${SITE_URL}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.5 },
    { url: `${SITE_URL}/contact`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${SITE_URL}/privacy`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
    { url: `${SITE_URL}/terms`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
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
    lastModified: now,
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
    lastModified: now,
    changeFrequency: "monthly",
    priority: 0.8,
  }));

  return [...staticPages, ...calculatorPages, ...guidePages];
}
