import type { Metadata } from "next";
import { CurriculumView } from "@/components/curriculum-view";

export const metadata: Metadata = {
  title: "Curriculum",
  description:
    "An open-source eight-module AI subject map and a six-rung agent-native practice ladder, with evidence-gated projects.",
  alternates: {
    canonical: "/curriculum",
  },
};

export default function CurriculumPage() {
  return <CurriculumView />;
}
