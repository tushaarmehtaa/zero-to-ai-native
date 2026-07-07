import type { Metadata } from "next";
import { CurriculumView } from "@/components/curriculum-view";

export const metadata: Metadata = {
  title: "curriculum | zero to ai-native",
  description:
    "a sequenced open-source AI engineering curriculum with primary sources, checkpoints, and project milestones.",
  alternates: {
    canonical: "/curriculum",
  },
};

export default function CurriculumPage() {
  return <CurriculumView />;
}

