import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { EmbedCalculator } from "@/components/EmbedCalculator";
import { getConfig, EMBEDDABLE_SLUGS } from "@/configs";

interface Props {
  params: Promise<{ slug: string }>;
}

export function generateStaticParams() {
  return EMBEDDABLE_SLUGS.map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { slug } = await params;
  const config = getConfig(slug);
  return {
    title: config ? `${config.title} (embed)` : "Calculator embed",
    robots: { index: false, follow: true },
  };
}

export default async function EmbedPage({ params }: Props) {
  const { slug } = await params;
  const config = getConfig(slug);
  if (!config || !EMBEDDABLE_SLUGS.includes(slug)) {
    notFound();
  }
  return <EmbedCalculator slug={slug} />;
}
