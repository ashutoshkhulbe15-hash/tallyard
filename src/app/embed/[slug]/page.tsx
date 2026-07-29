import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { EmbedCalculator } from "@/components/EmbedCalculator";
import { getConfig, EMBEDDABLE_SLUGS } from "@/configs";

interface Props {
  params: { slug: string };
}

export function generateStaticParams() {
  return EMBEDDABLE_SLUGS.map((slug) => ({ slug }));
}

export function generateMetadata({ params }: Props): Metadata {
  const config = getConfig(params.slug);
  return {
    title: config ? `${config.title} (embed)` : "Calculator embed",
    robots: { index: false, follow: true },
  };
}

export default function EmbedPage({ params }: Props) {
  const config = getConfig(params.slug);
  if (!config || !EMBEDDABLE_SLUGS.includes(params.slug)) {
    notFound();
  }
  return <EmbedCalculator slug={params.slug} />;
}
