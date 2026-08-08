/* Generates README.md from the catalog so the list never drifts from the data.
   Run: node --experimental-strip-types scripts/gen-readme.ts */
import { writeFileSync } from "fs";
import { GUIDES } from "../lib/guides.ts";
import { TOPICS, type Company } from "../lib/taxonomy.ts";

const REPO = "tushaarmehtaa/zero-to-ai-native";

const SOURCE_URL: Partial<Record<Company, string>> = {
  Anthropic: "https://www.anthropic.com",
  OpenAI: "https://openai.com",
  Google: "https://deepmind.google",
  Meta: "https://ai.meta.com",
  Microsoft: "https://www.microsoft.com/ai",
  Mistral: "https://mistral.ai",
  Cohere: "https://cohere.com",
  "Hugging Face": "https://huggingface.co",
  Chroma: "https://www.trychroma.com",
  DeepSeek: "https://www.deepseek.com",
  "Moonshot AI": "https://www.moonshot.ai",
  Qwen: "https://qwenlm.github.io",
  "Nous Research": "https://nousresearch.com",
  Ramp: "https://ramp.com",
  AWS: "https://aws.amazon.com",
  Shopify: "https://shopify.engineering",
  "Dario Amodei": "https://darioamodei.com",
  "Sam Altman": "https://blog.samaltman.com",
  "Leopold Aschenbrenner": "https://situational-awareness.ai",
  "Lilian Weng": "https://lilianweng.github.io",
  "Andrej Karpathy": "https://karpathy.ai",
  "Chip Huyen": "https://huyenchip.com",
  "Eugene Yan": "https://eugeneyan.com",
  "Hamel Husain": "https://hamel.dev",
  "Simon Willison": "https://simonwillison.net",
  "Benedict Evans": "https://www.ben-evans.com",
  "Jay Alammar": "https://jalammar.github.io",
  "Sebastian Raschka": "https://sebastianraschka.com",
  "3Blue1Brown": "https://www.3blue1brown.com",
  Stanford: "https://online.stanford.edu",
  MIT: "https://www.mit.edu",
  NBER: "https://www.nber.org",
};

// x/twitter handles (only the ones I'm confident about, for the credits/tag section)
const X: Partial<Record<Company, string>> = {
  Anthropic: "AnthropicAI",
  OpenAI: "OpenAI",
  Google: "GoogleDeepMind",
  Meta: "AIatMeta",
  Mistral: "MistralAI",
  Cohere: "cohere",
  "Hugging Face": "huggingface",
  Chroma: "trychroma",
  DeepSeek: "deepseek_ai",
  "Moonshot AI": "Kimi_Moonshot",
  Qwen: "Alibaba_Qwen",
  AWS: "awscloud",
  Shopify: "ShopifyEng",
  "Dario Amodei": "DarioAmodei",
  "Sam Altman": "sama",
  "Leopold Aschenbrenner": "leopoldasch",
  "Lilian Weng": "lilianweng",
  "Andrej Karpathy": "karpathy",
  "Chip Huyen": "chipro",
  "Eugene Yan": "eugeneyan",
  "Hamel Husain": "HamelHusain",
  "Simon Willison": "simonw",
  "Benedict Evans": "benedictevans",
  "Jay Alammar": "JayAlammar",
  "Sebastian Raschka": "rasbt",
  "3Blue1Brown": "3blue1brown",
};

const TOPIC_EMOJI: Record<string, string> = {
  Agents: "🤖",
  "Prompt Engineering": "💬",
  "Context & Harness": "🧠",
  Foundations: "📐",
  Papers: "📜",
  "Enterprise & Adoption": "🏢",
  "MLOps & Production": "⚙️",
  "Skills & Tooling": "🛠️",
  "Research & Economics": "📊",
  "Perspectives & Futures": "🔭",
};

const FMT: Record<string, string> = {
  PDF: "📄 pdf",
  Web: "🌐 web",
  Blog: "✍️ blog",
  Course: "🎓 course",
  Video: "🎥 video",
};

const src = (c: Company) => (SOURCE_URL[c] ? `[${c}](${SOURCE_URL[c]})` : c);

const reads = GUIDES.length;
const sources = new Set(GUIDES.map((g) => g.company)).size;

// ── the list, grouped by topic ──────────────────────────────
let list = "";
for (const t of TOPICS) {
  const items = GUIDES.filter((g) => g.topic === t);
  if (!items.length) continue;
  list += `\n### ${TOPIC_EMOJI[t] ?? ""} ${t}\n\n`;
  for (const g of items) {
    list += `- **[${g.title}](${g.url})** · ${src(g.company)} · ${FMT[g.format]} · ${g.year}\n`;
  }
}

// ── credits ─────────────────────────────────────────────────
const LABS: Company[] = [
  "Anthropic", "OpenAI", "Google", "Meta", "Microsoft", "Mistral", "Cohere",
  "Hugging Face", "Chroma", "DeepSeek", "Moonshot AI", "Qwen", "Nous Research", "Ramp", "AWS", "Shopify",
];
const PEOPLE: Company[] = [
  "Dario Amodei", "Sam Altman", "Leopold Aschenbrenner",
  "Andrej Karpathy", "Lilian Weng", "Simon Willison", "Chip Huyen", "Hamel Husain",
  "Eugene Yan", "Jay Alammar", "Sebastian Raschka", "Benedict Evans", "3Blue1Brown",
];
const SCHOOLS: Company[] = ["Stanford", "MIT", "NBER"];

const credit = (c: Company) => {
  const site = SOURCE_URL[c] ? `[${c}](${SOURCE_URL[c]})` : c;
  return X[c] ? `${site} ([@${X[c]}](https://x.com/${X[c]}))` : site;
};
const creditList = (arr: Company[]) => arr.map(credit).join(" · ");

const readme = `<div align="center">

![zero to ai-native](.github/banner.png)

# zero to ai-native

**an open-source curriculum of primary-source ai material, from fundamentals to production systems.**

![GitHub stars](https://img.shields.io/github/stars/${REPO}?style=social)
![GitHub forks](https://img.shields.io/github/forks/${REPO}?style=social)
[![PRs welcome](https://img.shields.io/badge/PRs-welcome-ff5e33.svg)](#-contributing)
![License](https://img.shields.io/github/license/${REPO}?color=171717)

</div>

---

the useful explanations of ai are usually written by the people **building** it, then scattered across cdns, arxiv, lab blogs, docs, and lectures.

this is a maintained path through **${reads} hand-picked reads** from **${sources} sources**. no listicles, no reuploads, no seo. just primary sources, ordered the way you'd actually learn them.

maintained by [Tushar Mehta](https://x.com/tushaarmehtaa), who builds AI products and co-runs AI & Weekends, an AI builder community with 30+ hands-on events across India and 2,000+ builders.

read your way down this page and you go from zero to ai-native.

## why this exists

ai moves faster than courses can keep up. the best material is scattered across lab blogs, system cards, arxiv, docs, lectures, and personal essays.

this repo keeps the original sources in a path builders can actually follow: fundamentals, prompting, context, agents, evals, production, and safety.

the work is curation: read the source, reject weak links, keep the sequence useful, and make good additions easy to review.

## used for

- self-directed learning
- workshops and hackathons
- ai & weekends sessions
- finding the primary source before reading commentary

[open the curriculum](https://zero-to-ai-native.vercel.app/curriculum) or browse the full catalog below.

## 🚀 start here

brand new? these five take you from "what is a neural net" to "i get how this works", in order:

1. **[Neural Networks](https://www.youtube.com/playlist?list=PLZHQObOWTQDNU6R1_67000Dx_ZCJB-3pi)** · 3Blue1Brown · the visual intuition, zero math required
2. **[Neural Networks: Zero to Hero](https://www.youtube.com/playlist?list=PLPXYLzZ3XzIbi4lL43O6fIU_ojuZwBO6vi)** · Karpathy · build one from scratch in plain python
3. **[The Illustrated Transformer](https://jalammar.github.io/illustrated-transformer/)** · Jay Alammar · how attention actually works
4. **[Prompt Engineering](https://www.kaggle.com/whitepaper-prompt-engineering)** · Google · the 69-page whitepaper that still holds up
5. **[Building Effective AI Agents](https://www.anthropic.com/engineering/building-effective-agents)** · Anthropic · once you're ready to build

then pick a topic below and go deep.

## 📚 the list
${list}
## 🙏 sources &amp; credits

every link goes to a primary source. these are the people and labs who did the work. go follow them, they earned it.

**the labs** · ${creditList(LABS)}

**the people** · ${creditList(PEOPLE)}

**the schools** · ${creditList(SCHOOLS)}

## ✍️ contributing

found something that belongs here? the catalog lives in [\`lib/guides.ts\`](lib/guides.ts). add one entry and open a PR:

\`\`\`ts
{
  title: "The Title",
  company: "Anthropic",        // a source in lib/taxonomy.ts
  topic: "Agents",
  url: "https://...",          // primary source only, no reuploads
  format: "PDF",               // PDF | Web | Blog | Course | Video
  year: 2025,
  level: "build",              // intro | build | deep
  audience: "builder",
  description: "one plain line on why it's worth reading.",
}
\`\`\`

**standard:** primary sources only. no reuploads, affiliate links, seo posts, summaries, or hype. one clear sentence per entry.

before opening a pr, run \`npm run validate:catalog\`, \`npm run lint\`, and regenerate this file with \`node --experimental-strip-types scripts/gen-readme.ts\`.

[read the curation standard](CURATION.md) or [open an issue](https://github.com/${REPO}/issues) with a source worth reviewing.

## 🧭 maintenance

the catalog is maintained as a living reading path, not a dump of links.

- monthly sweeps for new primary-source material
- review before adding, even when the source is popular
- keep the README generated from the typed catalog
- keep the learning path useful for both beginners and working builders

see [CURRICULUM.md](CURRICULUM.md), [ROADMAP.md](ROADMAP.md), [CONTRIBUTING.md](CONTRIBUTING.md), and [CHANGELOG.md](CHANGELOG.md).

## 🛠️ run it

\`\`\`bash
git clone https://github.com/${REPO}
cd zero-to-ai-native
npm install && npm run dev
\`\`\`

next.js · geist · tailwind. static, no backend.

## ⭐ star history

<a href="https://star-history.com/#${REPO}&Date">
  <img src="https://api.star-history.com/svg?repos=${REPO}&type=Date" alt="Star History Chart" width="600">
</a>

---

<div align="center">

built by [**@tushaarmehtaa**](https://x.com/tushaarmehtaa). i build with ai and write about it.

**if this saved you a few hours of googling, [star it](https://github.com/${REPO}) ⭐ so the next person finds it.**

</div>
`;

writeFileSync("README.md", readme);
console.log(`wrote README.md: ${reads} reads, ${sources} sources`);
