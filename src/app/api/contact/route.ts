import { NextRequest, NextResponse } from "next/server";
import { client } from "@/config/client";

const TELEGRAM_BOT_TOKEN = process.env.TELEGRAM_BOT_TOKEN || "";
const TELEGRAM_CHAT_ID = process.env.TELEGRAM_CHAT_ID || "1402635804";

async function notifyTelegram(lead: { name: string; email: string; phone: string; message: string }) {
  if (!TELEGRAM_BOT_TOKEN) return;
  const text =
    `LEAD from ${client.name} (${client.city})\n` +
    `Name: ${lead.name}\n` +
    `Phone: ${lead.phone}\n` +
    `Email: ${lead.email}\n` +
    `Message: ${lead.message.substring(0, 300)}`;
  try {
    await fetch(`https://api.telegram.org/bot${TELEGRAM_BOT_TOKEN}/sendMessage`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ chat_id: TELEGRAM_CHAT_ID, text }),
    });
  } catch { /* don't block on notification failure */ }
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { name, email, phone, message } = body;

  if (!name || !email || !phone || !message) {
    return NextResponse.json({ error: "All fields required" }, { status: 400 });
  }

  // Always notify Telegram when a lead comes in
  await notifyTelegram({ name, email, phone, message });

  const webhookUrl =
    (client as Record<string, unknown>).webhookUrl as string | undefined;

  if (!webhookUrl) {
    console.log("Contact form submission:", {
      business: client.name,
      name,
      email,
      phone,
      message: message.substring(0, 200),
    });
    return NextResponse.json({ success: true });
  }

  // Forward to webhook (works with Twilio, Make, Zapier, GHL, n8n, etc.)
  try {
    await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        source: "demo-site",
        business: client.name,
        city: client.city,
        lead: { name, email, phone, message },
        timestamp: new Date().toISOString(),
      }),
    });
  } catch (err) {
    console.error("Webhook delivery failed:", err);
    // Still return success to the user — don't block on webhook failure
  }

  return NextResponse.json({ success: true });
}
