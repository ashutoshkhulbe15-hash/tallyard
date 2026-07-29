"use client";

import { useEffect, useRef } from "react";
import { Calculator } from "./Calculator";
import { getConfig } from "@/configs";

/**
 * The embeddable form of a calculator: the working panel plus a required
 * attribution link back to the source page. Height is posted to the parent
 * frame so hosts can size the iframe to the content without scrollbars.
 */
export function EmbedCalculator({ slug }: { slug: string }) {
  const config = getConfig(slug);
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!ref.current) return;
    const post = () => {
      const height = ref.current?.scrollHeight ?? 0;
      window.parent?.postMessage(
        { type: "tallyard:embed-height", slug, height: height + 24 },
        "*"
      );
    };
    post();
    const observer = new ResizeObserver(post);
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [slug]);

  if (!config) return null;

  return (
    <div ref={ref}>
      <Calculator slug={slug} panelTitle={config.title} />
      <p className="mt-3 text-center text-[12px] text-ink-muted">
        <a
          href={`https://www.tallyard.com/${slug}?utm_source=embed`}
          target="_blank"
          rel="noopener"
          className="text-accent hover:underline font-medium"
        >
          {config.title}
        </a>{" "}
        by Tallyard. Formula and sources on the full page.
      </p>
    </div>
  );
}
