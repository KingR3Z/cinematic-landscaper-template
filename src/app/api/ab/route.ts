import { NextRequest, NextResponse } from "next/server";
import { promises as fs } from "fs";
import path from "path";

const DATA_DIR = path.join(process.cwd(), ".ab-data");

interface ABEvent {
  type: "assign" | "convert";
  experimentId: string;
  variant: string;
  timestamp: string;
}

async function ensureDir() {
  await fs.mkdir(DATA_DIR, { recursive: true });
}

async function appendEvent(experimentId: string, event: ABEvent) {
  await ensureDir();
  const filePath = path.join(DATA_DIR, `${experimentId}.jsonl`);
  await fs.appendFile(filePath, JSON.stringify(event) + "\n");
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { type, experimentId, variant } = body;

  if (!type || !experimentId || !variant) {
    return NextResponse.json({ error: "Missing fields" }, { status: 400 });
  }

  if (type !== "assign" && type !== "convert") {
    return NextResponse.json({ error: "Invalid type" }, { status: 400 });
  }

  // Sanitise experimentId to prevent path traversal
  const safeId = experimentId.replace(/[^a-zA-Z0-9_-]/g, "");
  if (!safeId) {
    return NextResponse.json({ error: "Invalid experimentId" }, { status: 400 });
  }

  const event: ABEvent = {
    type,
    experimentId: safeId,
    variant: String(variant).substring(0, 10),
    timestamp: new Date().toISOString(),
  };

  await appendEvent(safeId, event);

  return NextResponse.json({ ok: true });
}

export async function GET(req: NextRequest) {
  const { searchParams } = new URL(req.url);
  const experimentId = searchParams.get("id");

  if (!experimentId) {
    return NextResponse.json({ error: "Missing id param" }, { status: 400 });
  }

  const safeId = experimentId.replace(/[^a-zA-Z0-9_-]/g, "");
  const filePath = path.join(DATA_DIR, `${safeId}.jsonl`);

  let lines: string[];
  try {
    const raw = await fs.readFile(filePath, "utf-8");
    lines = raw.trim().split("\n").filter(Boolean);
  } catch {
    return NextResponse.json({ variants: {} });
  }

  const events: ABEvent[] = lines.map((l) => JSON.parse(l));

  const stats: Record<string, { assigned: number; converted: number; rate: string }> = {};

  for (const e of events) {
    if (!stats[e.variant]) {
      stats[e.variant] = { assigned: 0, converted: 0, rate: "0%" };
    }
    if (e.type === "assign") stats[e.variant].assigned++;
    if (e.type === "convert") stats[e.variant].converted++;
  }

  for (const v of Object.values(stats)) {
    v.rate = v.assigned > 0 ? ((v.converted / v.assigned) * 100).toFixed(1) + "%" : "0%";
  }

  return NextResponse.json({ experimentId: safeId, variants: stats });
}
