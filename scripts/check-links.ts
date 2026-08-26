import { GUIDES } from "../lib/guides.ts";

type Result = {
  url: string;
  title: string;
  status: number | "error";
  finalUrl?: string;
  error?: string;
};

const concurrency = 8;
const timeoutMs = 15_000;

async function request(url: string, method: "HEAD" | "GET") {
  const controller = new AbortController();
  const timeout = setTimeout(() => controller.abort(), timeoutMs);
  try {
    return await fetch(url, {
      method,
      redirect: "follow",
      signal: controller.signal,
      headers: { "user-agent": "zero-to-ai-native-link-check/1.0" },
    });
  } finally {
    clearTimeout(timeout);
  }
}

async function check(title: string, url: string): Promise<Result> {
  try {
    let response = await request(url, "HEAD");
    if (response.status >= 400) {
      response = await request(url, "GET");
    }
    return { title, url, status: response.status, finalUrl: response.url };
  } catch (error) {
    return {
      title,
      url,
      status: "error",
      error: error instanceof Error ? error.message : String(error),
    };
  }
}

async function main() {
  const results: Result[] = [];
  let cursor = 0;

  async function worker() {
    while (cursor < GUIDES.length) {
      const guide = GUIDES[cursor++];
      results.push(await check(guide.title, guide.url));
    }
  }

  await Promise.all(Array.from({ length: concurrency }, worker));
  results.sort((a, b) => a.title.localeCompare(b.title));

  const failures = results.filter(
    ({ status }) => status === "error" || (typeof status === "number" && status >= 400),
  );
  const redirects = results.filter(
    ({ url, finalUrl }) => finalUrl && new URL(url).hostname !== new URL(finalUrl).hostname,
  );

  console.log(`checked ${results.length} catalog links`);
  console.log(`${failures.length} require review; ${redirects.length} changed host`);
  for (const result of failures) {
    console.log(`${result.status}\t${result.title}\t${result.url}${result.error ? `\t${result.error}` : ""}`);
  }

  if (failures.length > 0) process.exitCode = 1;
}

await main();
