/* Generates README.md from the catalog so the list never drifts from the data.
   Run: npx tsx scripts/gen-readme.ts */
import { writeFileSync } from "fs";
import { GUIDES } from "../lib/guides";
import { TOPICS, type Company } from "../lib/taxonomy";

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
  Qwen: "https://qwenlm.github.io",
  "Nous Research": "https://nousresearch.com",
  NVIDIA: "https://www.nvidia.com",
  AWS: "https://aws.amazon.com",
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
  Qwen: "Alibaba_Qwen",
  NVIDIA: "nvidia",
  AWS: "awscloud",
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
  "Hugging Face", "Chroma", "DeepSeek", "Qwen", "Nous Research", "NVIDIA", "AWS",
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

**the best papers, guides, blogs and lectures on ai, straight from the people building it.**

![GitHub stars](https://img.shields.io/github/stars/${REPO}?style=social)
![GitHub forks](https://img.shields.io/github/forks/${REPO}?style=social)
[![PRs welcome](https://img.shields.io/badge/PRs-welcome-ff5e33.svg)](#-contributing)
![License](https://img.shields.io/github/license/${REPO}?color=171717)

</div>

---

the best explanations of ai aren't in courses or viral threads. they're written by the people **building** it, then scattered across a hundred cdns, arxiv links and personal blogs you'd never stumble on.

this is every one worth reading, in one place. **${reads} hand-picked reads** from **${sources} sources**. no listicles, no reuploads, no seo slop. just the primary sources, ordered the way you'd actually learn them.

read your way down this page and you go from zero to ai-native.

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

found a banger that's missing? the whole catalog is one typed file: [\`lib/guides.ts\`](lib/guides.ts). add an entry and open a PR:

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

**rules:** primary sources only, no reuploads, no affiliate links, no slop. one plain sentence per entry. or just [open an issue](https://github.com/${REPO}/issues) and i'll add it.

## 🛠️ run it

\`\`\`bash
git clone https://github.com/${REPO}
cd zero-to-ai-native
npm install && npm run dev
\`\`\`

next.js · geist · tailwind · motion. static, no backend.

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
