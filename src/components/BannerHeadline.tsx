interface BannerHeadlineProps {
  /** The full headline text, e.g. "Paint smarter." — last word becomes italic accent */
  text: string;
}

/**
 * Splits a headline into the leading portion and a final accent word.
 * "Paint smarter." → "Paint " + italic "smarter."
 * "Pour confidently." → "Pour " + italic "confidently."
 *
 * The trailing punctuation (period/question) stays attached to the last word.
 */
export function BannerHeadline({ text }: BannerHeadlineProps) {
  const trimmed = text.trim();
  const words = trimmed.split(/\s+/);

  if (words.length < 2) {
    return <>{trimmed}</>;
  }

  const lastWord = words[words.length - 1];
  const prefix = words.slice(0, -1).join(" ");

  return (
    <>
      {prefix}{" "}
      <span className="accent-italic">{lastWord}</span>
    </>
  );
}
