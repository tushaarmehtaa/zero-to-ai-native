# zero to ai-native

the best papers, guides, blogs and lectures on ai. straight from the people building it, grouped by level so you always know what to read next.

**[live →](https://zero-to-ai-native.vercel.app)** · built by [@tushaarmehtaa](https://x.com/tushaarmehtaa)

> the best explanations of ai come from the people building it. they're scattered across a hundred cdns and personal blogs. this is every one worth reading, in one place, ordered the way you'd actually learn it.

---

## what's in here

94 hand-picked reads across 33 sources. every link goes straight to the source, never a reupload.

- **the labs** — anthropic, openai, google, meta, mistral, deepseek, qwen, moonshot, zhipu, minimax, tencent, 01.ai, bytedance, cohere, nvidia, aws
- **the papers** — attention is all you need, gpt-3, instructgpt, chinchilla, llama, lora, rag, constitutional ai, deepseek-r1, and more
- **the people** — lilian weng, karpathy, simon willison, chip huyen, hamel husain, eugene yan, jay alammar, benedict evans
- **the courses** — stanford cs229 / cs224n / cs336 / cs25 / cs153, mit 6.s191, mse435, 3blue1brown

## how it's organized

one dataset, four views, four ways to group it:

- **views** — list, table, board (kanban), cards
- **group by** — topic, level, source, format

default is **board by level**, so you can read your way from `intro → build → deep`.

## run it locally

```bash
git clone https://github.com/tushaarmehtaa/zero-to-ai-native
cd zero-to-ai-native
npm install
npm run dev
```

open [localhost:3000](http://localhost:3000).

## add a read

the whole catalog is a single typed file: [`lib/guides.ts`](lib/guides.ts). add an entry, open a PR.

```ts
{
  title: "The Title",
  company: "Anthropic",        // a source in lib/taxonomy.ts
  topic: "Agents",
  url: "https://...",          // first-party only
  format: "PDF",               // PDF | Web | Blog | Course | Video
  year: 2025,
  level: "build",              // intro | build | deep
  audience: "builder",
  description: "one plain line on why it's worth reading.",
}
```

rules: primary sources only, no reuploads, no affiliate links. found a banger that's missing? [open an issue](https://github.com/tushaarmehtaa/zero-to-ai-native/issues) or ping [@tushaarmehtaa](https://x.com/tushaarmehtaa).

## stack

next.js · geist · tailwind · motion. static, no backend.

---

if this saved you a few hours of googling, **star it** so the next person finds it.
