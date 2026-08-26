import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ModulePage } from "@/components/module-page";
import { CURRICULUM, moduleForSlug } from "@/lib/curriculum";

type Props = {
  params: Promise<{ slug: string }>;
};

export const dynamicParams = false;

export function generateStaticParams() {
  return CURRICULUM.map(({ slug }) => ({ slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const learningModule = moduleForSlug((await params).slug);
  if (!learningModule) return {};

  const title = `${learningModule.title}: AI learning module`;
  const url = `/curriculum/${learningModule.slug}`;

  return {
    title,
    description: learningModule.summary,
    alternates: { canonical: url },
    openGraph: {
      title,
      description: learningModule.summary,
      url,
      type: "article",
    },
    twitter: {
      card: "summary_large_image",
      title,
      description: learningModule.summary,
    },
  };
}

export default async function CurriculumModulePage({ params }: Props) {
  const learningModule = moduleForSlug((await params).slug);
  if (!learningModule) notFound();

  const structuredData = {
    "@context": "https://schema.org",
    "@type": "Course",
    name: learningModule.title,
    description: learningModule.summary,
    url: `https://www.zerotoainative.xyz/curriculum/${learningModule.slug}`,
    provider: {
      "@type": "Organization",
      name: "Zero to AI Native",
      url: "https://www.zerotoainative.xyz",
    },
    educationalLevel: learningModule.project.difficulty,
    teaches: learningModule.checkpoints,
    hasCourseInstance: {
      "@type": "CourseInstance",
      courseMode: "online",
      courseWorkload: `${learningModule.readFirst.length + learningModule.goDeeper.length} readings and 1 practical project`,
    },
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData).replaceAll("<", "\\u003c") }}
      />
      <ModulePage module={learningModule} />
    </>
  );
}
