import { NextRequest, NextResponse } from "next/server";

type EnquiryPayload = {
  name: string;
  email: string;
  phone: string;
  productInterest: string;
};

function isValidPayload(body: unknown): body is EnquiryPayload {
  if (typeof body !== "object" || body === null) return false;
  const b = body as Record<string, unknown>;
  return (
    typeof b.name === "string" &&
    b.name.trim().length > 1 &&
    typeof b.email === "string" &&
    /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(b.email) &&
    typeof b.phone === "string" &&
    b.phone.trim().length >= 7 &&
    typeof b.productInterest === "string" &&
    b.productInterest.trim().length > 0
  );
}

export async function POST(req: NextRequest) {
  let body: unknown;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON body." }, { status: 400 });
  }

  if (!isValidPayload(body)) {
    return NextResponse.json(
      { error: "Missing or invalid fields." },
      { status: 400 }
    );
  }

  const webhookUrl = process.env.SHEETS_WEBHOOK_URL;

  // Falls back to a server-side log so the flow is verifiable even before
  // the Apps Script webhook is wired up with a real deployment URL.
  if (!webhookUrl) {
    console.log("[enquiry:fallback-log]", {
      ...body,
      receivedAt: new Date().toISOString(),
    });
    return NextResponse.json({ ok: true, mode: "logged" });
  }

  try {
    const sheetRes = await fetch(webhookUrl, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        ...body,
        submittedAt: new Date().toISOString(),
        source: "bhansali-flanges-website",
      }),
    });

    if (!sheetRes.ok) {
      throw new Error(`Sheets webhook responded ${sheetRes.status}`);
    }

    return NextResponse.json({ ok: true, mode: "sheet" });
  } catch (err) {
    console.error("[enquiry:sheet-error]", err);
    return NextResponse.json(
      { error: "Could not reach the enquiry log. Please try again." },
      { status: 502 }
    );
  }
}
