import type { MetadataRoute } from "next";

const SITE_URL = "https://www.tallyard.com";

// Omit lastModified until actual per-URL publication/change dates are verified.

export default function sitemap(): MetadataRoute.Sitemap {

  const staticPages: MetadataRoute.Sitemap = [
    { url: `${SITE_URL}/` },
    { url: `${SITE_URL}/calculators` },
    { url: `${SITE_URL}/guides` },
    { url: `${SITE_URL}/embed-a-calculator` },
    { url: `${SITE_URL}/planner` },
    { url: `${SITE_URL}/planner/build-a-deck` },
    { url: `${SITE_URL}/planner/install-a-fence` },
    { url: `${SITE_URL}/planner/paint-a-room` },
    { url: `${SITE_URL}/planner/replace-a-roof` },
    { url: `${SITE_URL}/planner/build-a-patio` },
    { url: `${SITE_URL}/planner/remodel-a-bathroom` },
    { url: `${SITE_URL}/methodology` },
    { url: `${SITE_URL}/about` },
    { url: `${SITE_URL}/contact` },
    { url: `${SITE_URL}/privacy` },
    { url: `${SITE_URL}/terms` },
  ];

  const calculatorSlugs = [
    "paint-calculator",
    "concrete-calculator",
    "mortar-calculator",
    "tile-calculator",
    "mulch-calculator",
    "drywall-calculator",
    "roofing-calculator",
    "btu-calculator",
    "furnace-replacement-cost-calculator",
    "gravel-calculator",
    "solar-calculator",
    "wire-size-calculator",
    "insulation-calculator",
    "fence-calculator",
    "grout-calculator",
    "paver-calculator",
    "deck-calculator",
    "deck-stair-calculator",
    "flooring-calculator",
    "hardwood-flooring-cost-calculator",
    "hardwood-floor-refinishing-cost-calculator",
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
    "egress-window-calculator",
    "chimney-calculator",
  ];
  const calculatorPages: MetadataRoute.Sitemap = calculatorSlugs.map((slug) => ({
    url: `${SITE_URL}/${slug}`,
  }));

  const guideSlugs = [
    "vinyl-vs-fiber-cement-siding",
    "composite-vs-pressure-treated-vs-cedar-deck",
    "heat-pump-vs-furnace",
    "waste-factor-reference",
    "residential-code-limits-reference",
    "joist-span-reference",
  ];
  const guidePages: MetadataRoute.Sitemap = guideSlugs.map((slug) => ({
    url: `${SITE_URL}/guides/${slug}`,
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
  }));

  return [...staticPages, ...calculatorPages, ...guidePages, ...costPages, ...categoryPages];
}
