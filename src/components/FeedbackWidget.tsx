"use client";

import { useState } from "react";

export function FeedbackWidget({ slug }: { slug: string }) {
  const [state, setState] = useState<"idle" | "yes" | "no">("idle");

  const handleClick = (helpful: boolean) => {
    setState(helpful ? "yes" : "no");
    // Fire-and-forget analytics event
    if (typeof window !== "undefined" && (window as any).gtag) {
      (window as any).gtag("event", "feedback", {
        event_category: "calculator",
        event_label: slug,
        value: helpful ? 1 : 0,
      });
    }
  };

  if (state !== "idle") {
    return (
      <div className="text-center py-6 text-sm text-ink-muted">
        Thanks for the feedback!
      </div>
    );
  }

  return (
    <div className="flex flex-col items-center gap-3 py-6 border-t border-line mt-10">
      <p className="text-sm text-ink-muted font-medium">
        Was this calculator helpful?
      </p>
      <div className="flex gap-3">
        <button
          onClick={() => handleClick(true)}
          className="px-5 py-2 text-sm font-semibold rounded-md border border-line bg-surface hover:border-accent hover:text-accent transition-colors"
          aria-label="Yes, helpful"
        >
          👍 Yes
        </button>
        <button
          onClick={() => handleClick(false)}
          className="px-5 py-2 text-sm font-semibold rounded-md border border-line bg-surface hover:border-accent hover:text-accent transition-colors"
          aria-label="No, not helpful"
        >
          👎 No
        </button>
      </div>
    </div>
  );
}
