import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Zero to AI-Native",
    short_name: "Z→AI",
    description:
      "The best papers, guides, blogs and lectures on AI. Straight from the people building it.",
    start_url: "/",
    display: "standalone",
    background_color: "#fefefe",
    theme_color: "#fefefe",
    icons: [
      {
        src: "/icon",
        sizes: "64x64",
        type: "image/png",
      },
      {
        src: "/apple-icon",
        sizes: "180x180",
        type: "image/png",
      },
    ],
  };
}
