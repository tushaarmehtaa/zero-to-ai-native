import { NextResponse } from "next/server";
import { appendFile, mkdir } from "fs/promises";
import path from "path";

const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const STORE_PATH = path.join(process.cwd(), "data", "waitlist.jsonl");

export async function POST(request: Request) {
  let email: unknown;
  try {
    ({ email } = await request.json());
  } catch {
    return NextResponse.json({ error: "Invalid request body" }, { status: 400 });
  }

  if (typeof email !== "string" || !EMAIL_RE.test(email)) {
    return NextResponse.json({ error: "Enter a valid email" }, { status: 400 });
  }

  const entry = { email: email.trim().toLowerCase(), submittedAt: new Date().toISOString() };

  try {
    await mkdir(path.dirname(STORE_PATH), { recursive: true });
    await appendFile(STORE_PATH, `${JSON.stringify(entry)}\n`, "utf8");
  } catch {
    return NextResponse.json({ error: "Could not save right now" }, { status: 500 });
  }

  return NextResponse.json({ ok: true });
}
