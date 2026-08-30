import { Hub } from "@/components/hub";

async function getStarCount(): Promise<number | null> {
  try {
    const res = await fetch(
      "https://api.github.com/repos/tushaarmehtaa/zero-to-ai-native",
      { next: { revalidate: 3600 } }
    );
    if (!res.ok) return null;
    const data = await res.json();
    return typeof data.stargazers_count === "number" ? data.stargazers_count : null;
  } catch {
    return null;
  }
}

export default async function Page() {
  const starCount = await getStarCount();
  return <Hub starCount={starCount} />;
}
