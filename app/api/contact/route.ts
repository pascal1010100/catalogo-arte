// app/api/contact/route.ts
import { NextResponse, type NextRequest } from "next/server";
import { Resend } from "resend";

export const runtime = "nodejs";        // ← usa Node en Vercel
export const dynamic = "force-dynamic"; // no cachea

type Payload = { name?: string; email?: string; message?: string };

const isEmail = (v: string) => /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
const escapeHtml = (s: string) =>
  s
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");

export async function POST(req: NextRequest) {
  try {
    const { name = "", email = "", message = "" } = (await req.json()) as Payload;

    // Validación
    if (name.trim().length < 2 || name.trim().length > 80) {
      return NextResponse.json({ error: "El nombre debe tener al menos 2 caracteres." }, { status: 400 });
    }
    if (!isEmail(email)) {
      return NextResponse.json({ error: "Ingresa un email válido." }, { status: 400 });
    }
    if (message.trim().length < 2 || message.trim().length > 4000) {
      return NextResponse.json({ error: "El mensaje es demasiado corto." }, { status: 400 });
    }

    // ENV obligatorias
    const apiKey = process.env.RESEND_API_KEY;
    if (!apiKey) {
      return NextResponse.json(
        { error: "Server no configurado: falta RESEND_API_KEY en Vercel." },
        { status: 500 }
      );
    }

    const from = process.env.MAIL_FROM || "ZPTVRD <onboarding@resend.dev>";
    const to = process.env.MAIL_TO || email; // si no hay MAIL_TO, envía al remitente (no recomendado en prod)

    // Crea el cliente aquí (no a nivel de módulo)
    const resend = new Resend(apiKey);

    const subject = `Nuevo mensaje — ${name}`;
    const html = `
      <div style="font-family:system-ui,-apple-system,Segoe UI,Roboto,sans-serif;line-height:1.5">
        <h2 style="margin:0 0 8px">Nuevo mensaje desde el sitio</h2>
        <p><strong>Nombre:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p style="margin:12px 0 6px"><strong>Mensaje:</strong></p>
        <pre style="white-space:pre-wrap;background:#f6f6f6;padding:12px;border-radius:8px">${escapeHtml(message)}</pre>
      </div>
    `;

    const { error } = await resend.emails.send({
      from,
      to,
      replyTo: email,
      subject,
      html,
      text: `Nombre: ${name}\nEmail: ${email}\n\n${message}`,
    });

    if (error) {
      // Propaga el mensaje de Resend al cliente
      return NextResponse.json({ error: error.message || "No se pudo enviar." }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (err) {
    const msg =
      err instanceof Error ? err.message : typeof err === "string" ? err : "Error inesperado.";
    return NextResponse.json({ error: msg }, { status: 500 });
  }
}
