import { NextResponse } from "next/server";

export const runtime = "nodejs";

type ContactPayload = {
  name?: string;
  business?: string;
  email?: string;
  interest?: string;
  message?: string;
};

const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);

export async function POST(request: Request) {
  let body: ContactPayload;
  try {
    body = await request.json();
  } catch {
    return NextResponse.json({ error: "Invalid request body." }, { status: 400 });
  }

  const name = body.name?.trim() ?? "";
  const email = body.email?.trim() ?? "";
  const message = body.message?.trim() ?? "";

  if (!name || !email || !message || !isEmail(email)) {
    return NextResponse.json(
      { error: "Please provide a valid name, email, and message." },
      { status: 422 }
    );
  }

  // No backend wired up yet — log the enquiry server-side.
  // Replace this with an email service (Resend, SendGrid) or CRM integration.
  console.log("[contact] new enquiry", {
    name,
    business: body.business?.trim() || "—",
    email,
    interest: body.interest?.trim() || "—",
    message,
    receivedAt: new Date().toISOString(),
  });

  return NextResponse.json({ ok: true }, { status: 200 });
}
