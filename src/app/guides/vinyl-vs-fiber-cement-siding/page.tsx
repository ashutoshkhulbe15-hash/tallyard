import type { Metadata } from "next";
import { GuidePage } from "@/components/GuidePage";
import { GuideSchemaScript } from "@/lib/guides-schema";
import { getGuide } from "@/guides";

const SLUG = "vinyl-vs-fiber-cement-siding";
const config = getGuide(SLUG)!;

export const metadata: Metadata = {
  title: config.title,
  description: config.description,
  alternates: { canonical: `/guides/${SLUG}` },
  openGraph: {
    title: config.title,
    description: config.description,
    url: `https://tallyard.com/guides/${SLUG}`,
    type: "article",
    publishedTime: config.publishedAt,
  },
};

export default function Page() {
  return (
    <>
      <GuideSchemaScript config={config} />
      <GuidePage config={config} />
    </>
  );
}
