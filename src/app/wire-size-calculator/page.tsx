import type { Metadata } from "next";
import { CalculatorPage } from "@/components/CalculatorPage";
import { SchemaScript } from "@/lib/schema";
import { getConfig } from "@/configs";

const SLUG = "wire-size-calculator";

export const metadata: Metadata = {
  title: "Wire Size Calculator",
  description:
    "Preliminary AWG estimate using 60°C ampacity and voltage drop. Limited inputs; not an installation or code approval.",
  alternates: { canonical: "/wire-size-calculator" },
  openGraph: {
    title: "Wire Size Calculator",
    description:
      "Estimate a listed wire gauge by ampacity and voltage drop; an electrician must verify the installation.",
    url: "https://www.tallyard.com/wire-size-calculator",
    type: "website",
  },
};

export default function WireSizeCalculatorPage() {
  const config = getConfig(SLUG);
  return (
    <>
      {config && <SchemaScript config={config} />}
      <CalculatorPage slug={SLUG} illustrationValue="12 AWG" />
    </>
  );
}
