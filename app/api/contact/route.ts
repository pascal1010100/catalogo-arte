// app/api/contact/route.ts
import { NextResponse } from "next/server";
import { Resend } from "resend";

export const runtime = "edge";
export const dynamic = "force-dynamic";

const resend = new Resend(process.env.RESEND_API_KEY);

function isEmail(v: string) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(v);
}
function escapeHtml(s: string) {
  return s
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;")
    .replaceAll('"', "&quot;")
    .replaceAll("'", "&#039;");
}

export async function POST(req: Request) {
  try {
    const { name = "", email = "", message = "" } = await req.json();

    // ✅ Validación más permisiva
    if (name.trim().length < 2 || name.trim().length > 80) {
      return NextResponse.json({ error: "El nombre debe tener al menos 2 caracteres." }, { status: 400 });
    }
    if (!isEmail(email)) {
      return NextResponse.json({ error: "Ingresa un email válido." }, { status: 400 });
    }
    if (message.trim().length < 2 || message.trim().length > 4000) {
      return NextResponse.json({ error: "El mensaje es demasiado corto." }, { status: 400 });
    }

    const from = process.env.MAIL_FROM || "ZPTVRD <onboarding@resend.dev>";
    const to = process.env.MAIL_TO || process.env.TEST_TO || "tu_correo@ejemplo.com"; // <-- pon tu correo en .env

    const subject = `Nuevo mensaje — ${name}`;
    const html = `
      <div style="font-family:system-ui,-apple-system,Segoe UI,Roboto,sans-serif;line-height:1.5">
        <h2 style="margin:0 0 8px">Nuevo mensaje desde el sitio</h2>
        <p><strong>Nombre:</strong> ${escapeHtml(name)}</p>
        <p><strong>Email:</strong> ${escapeHtml(email)}</p>
        <p style="margin:12px 0 6px"><strong>Mensaje:</strong></p>
        <pre style="white-space:pre-wrap;background:#f6f6f6;padding:12px;border-radius:8px">${escapeHtml(
          message
        )}</pre>
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
      return NextResponse.json({ error: error.message || "No se pudo enviar." }, { status: 500 });
    }

    return NextResponse.json({ ok: true });
  } catch (e) {
    return NextResponse.json({ error: "Error inesperado." }, { status: 500 });
  }
}
