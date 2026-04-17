import type { Metadata } from "next";
import { CalculatorPage } from "@/components/CalculatorPage";
import { SchemaScript } from "@/lib/schema";
import { getConfig } from "@/configs";

const SLUG = "drain-pipe-calculator";

export const metadata: Metadata = {
  title: "Drain Pipe Calculator — DFU To Pipe Size",
  description:
    "Calculate drain pipe size by DFU loading. Horizontal, vertical, and building drain sizing per IPC and UPC.",
  alternates: { canonical: "/drain-pipe-calculator" },
  openGraph: {
    title: "Drain Pipe Calculator — DFU To Pipe Size",
    description: "Calculate drain pipe size for any bathroom or kitchen.",
    url: "https://tallyard.com/drain-pipe-calculator",
    type: "website",
  },
};

export default function DrainPipeCalculatorPage() {
  const config = getConfig(SLUG);
  return (
    <>
      {config && <SchemaScript config={config} />}
      <CalculatorPage slug={SLUG} illustrationValue={`3"`} />
    </>
  );
}
