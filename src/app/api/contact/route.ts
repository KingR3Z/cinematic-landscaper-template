import { NextRequest, NextResponse } from "next/server";
import { client } from "@/config/client";

export async function POST(req: NextRequest) {
  const body = await req.json();
  const { name, email, phone, message } = body;

  if (!name || !email || !phone || !message) {
    return NextResponse.json({ error: "All fields required" }, { status: 400 });
  }

  const webhookUrl =
    (client as Record<string, unknown>).webhookUrl as string | undefined;

  if (!webhookUrl) {
    // No webhook configured — just log and return success
    console.log("Contact form submission (no webhook configured):", {
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
