/**
 * Embed layout: no site header, footer, or rail. The iframe host supplies
 * the surrounding page, so this renders the calculator alone on a
 * transparent background.
 */
export default function EmbedLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <div className="p-3">{children}</div>;
}
