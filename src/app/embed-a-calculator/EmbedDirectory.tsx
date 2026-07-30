"use client";

import { useState } from "react";
import Link from "next/link";

const EMBEDS = [
  {
    slug: "concrete-calculator",
    name: "Concrete calculator",
    blurb: "Cubic yards for slabs, footings, and round pours, with waste included.",
    height: 620,
  },
  {
    slug: "mulch-calculator",
    name: "Mulch calculator",
    blurb: "Cubic yards and bags by bed area and depth.",
    height: 580,
  },
  {
    slug: "gravel-calculator",
    name: "Gravel calculator",
    blurb: "Tons and cubic yards of base or decorative stone.",
    height: 580,
  },
  {
    slug: "paint-calculator",
    name: "Paint calculator",
    blurb: "Gallons by wall area, coats, and surface.",
    height: 620,
  },
  {
    slug: "deck-stair-calculator",
    name: "Deck stair calculator",
    blurb: "Stringer layout with a printable cut sheet and IRC R311.7 checks.",
    height: 900,
  },
];

const RESIZE_SNIPPET = `<script>
window.addEventListener("message", function (e) {
  if (!e.data || e.data.type !== "tallyard:embed-height") return;
  var f = document.getElementById("tallyard-" + e.data.slug);
  if (f) f.style.height = e.data.height + "px";
});
</script>`;

function iframeSnippet(slug: string, height: number) {
  return `<iframe
  id="tallyard-${slug}"
  src="https://www.tallyard.com/embed/${slug}"
  title="${slug.replace(/-/g, " ")}"
  width="100%"
  height="${height}"
  style="border:1px solid #DCE2DB;border-radius:6px;max-width:520px"
  loading="lazy"
></iframe>`;
}

function CopyBlock({ code, label }: { code: string; label: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <div className="mt-3">
      <div className="flex items-center justify-between mb-1.5">
        <span className="text-[11px] uppercase tracking-[0.14em] text-ink-muted font-medium">
          {label}
        </span>
        <button
          onClick={() => {
            navigator.clipboard.writeText(code).then(() => {
              setCopied(true);
              setTimeout(() => setCopied(false), 1800);
            });
          }}
          className="text-[12px] text-ink-muted hover:text-ink border border-line rounded px-2.5 py-1 font-medium"
        >
          {copied ? "Copied" : "Copy"}
        </button>
      </div>
      <pre className="p-3.5 bg-surface-alt border border-line rounded font-mono text-[11.5px] text-ink-muted overflow-x-auto whitespace-pre-wrap break-all">
        {code}
      </pre>
    </div>
  );
}

export function EmbedDirectory() {
  return (
    <div className="container-content py-12 md:py-16">
      <nav className="text-[13px] text-ink-muted mb-4">
        <Link href="/" className="hover:text-ink">
          Home
        </Link>
        <span className="mx-1.5">/</span>
        <span className="text-ink">Embed a calculator</span>
      </nav>

      <h1 className="text-3xl md:text-4xl font-bold tracking-tight mb-4">
        Embed a calculator on your site
      </h1>
      <p className="text-ink-muted max-w-2xl mb-3">
        Free to use on any site, commercial or not. Paste one line of HTML and
        the working calculator appears on your page: same formulas, same cited
        standards, nothing tracked back to your visitors beyond a standard page
        request.
      </p>
      <p className="text-ink-muted max-w-2xl mb-10">
        The only condition is the attribution link that ships inside each embed.
        Leave it in place and you are free to use these anywhere.
      </p>

      <div className="p-5 border border-line rounded bg-surface-alt mb-10">
        <h2 className="text-lg font-semibold mb-1">Optional: auto-height</h2>
        <p className="text-[14px] text-ink-muted">
          Each embed posts its content height to the parent page. Add this once,
          anywhere on the page, and the iframe resizes itself instead of
          scrolling. Skip it and the fixed height below works fine.
        </p>
        <CopyBlock code={RESIZE_SNIPPET} label="Paste once per page" />
      </div>

      <div className="space-y-10">
        {EMBEDS.map((e) => (
          <section key={e.slug} className="border-t border-line pt-8">
            <div className="flex items-baseline justify-between gap-4 flex-wrap">
              <h2 className="text-xl font-semibold">{e.name}</h2>
              <Link
                href={`/${e.slug}`}
                className="text-[13px] text-accent hover:underline font-medium"
              >
                See the full page
              </Link>
            </div>
            <p className="text-ink-muted text-[15px] mt-1">{e.blurb}</p>
            <CopyBlock code={iframeSnippet(e.slug, e.height)} label="Embed code" />
          </section>
        ))}
      </div>

      <div className="mt-14 border-t border-line pt-8">
        <h2 className="text-xl font-semibold mb-3">Questions people ask</h2>
        <dl className="space-y-5 text-[15px]">
          <div>
            <dt className="font-semibold">Is it really free?</dt>
            <dd className="text-ink-muted mt-1">
              Yes, including on commercial sites. Keep the attribution link
              inside the embed and there is nothing else to do.
            </dd>
          </div>
          <div>
            <dt className="font-semibold">Will it slow my page down?</dt>
            <dd className="text-ink-muted mt-1">
              The snippet uses lazy loading, so the calculator only loads when a
              visitor scrolls near it. Fonts are self-hosted and the frame stays
              lightweight.
            </dd>
          </div>
          <div>
            <dt className="font-semibold">Can I change the styling?</dt>
            <dd className="text-ink-muted mt-1">
              The frame border, width, and corner radius are yours to edit in
              the snippet. The calculator inside keeps its own styling so the
              numbers stay legible and the formula stays visible.
            </dd>
          </div>
          <div>
            <dt className="font-semibold">Do you want a different calculator?</dt>
            <dd className="text-ink-muted mt-1">
              These five are the ones most useful to other sites. If you would
              use a different one,{" "}
              <Link href="/contact" className="text-accent hover:underline">
                ask for it
              </Link>{" "}
              and it can be added to the list.
            </dd>
          </div>
        </dl>
      </div>
    </div>
  );
}
