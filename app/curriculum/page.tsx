import type { Metadata } from "next";
import { CurriculumView } from "@/components/curriculum-view";
import { CURRICULUM } from "@/lib/curriculum";

const title = "Curriculum";
const description =
  "An open-source eight-module AI subject map and a six-rung agent-native practice ladder, with evidence-gated projects.";
const url = "/curriculum";

export const metadata: Metadata = {
  title,
  description,
  alternates: {
    canonical: url,
  },
  openGraph: {
    title,
    description,
    url,
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title,
    description,
  },
};

export default function CurriculumPage() {
  const structuredData = {
    "@context": "https://schema.org",
    "@type": "ItemList",
    name: "Zero to AI-Native curriculum",
    description,
    itemListElement: CURRICULUM.map((module, index) => ({
      "@type": "ListItem",
      position: index + 1,
      url: `https://www.zerotoainative.xyz/curriculum/${module.slug}`,
      name: module.title,
    })),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replaceAll("<", "\\u003c") }}
      />
      <CurriculumView />
    </>
  );
}
