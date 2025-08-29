// app/contacto/page.tsx
"use client";

import { useState } from "react";
import Link from "next/link";
import { Instagram, Mail, MapPin, Send } from "lucide-react";

type Status = "idle" | "loading" | "ok" | "error";

export default function ContactoPage() {
  const [status, setStatus] = useState<Status>("idle");

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");

    const form = e.currentTarget;
    const data = {
      name: (form.elements.namedItem("name") as HTMLInputElement).value.trim(),
      email: (form.elements.namedItem("email") as HTMLInputElement).value.trim(),
      message: (form.elements.namedItem("message") as HTMLTextAreaElement).value.trim(),
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data),
      });
      setStatus(res.ok ? "ok" : "error");
      if (res.ok) form.reset();
    } catch {
      setStatus("error");
    }
  }

  const disabled = status === "loading";

  return (
    <main>
      {/* HERO con imagen de fondo */}
      <section
        className="relative overflow-hidden"
        style={{
          paddingTop: "calc(56px + env(safe-area-inset-top))",
          // ✅ tu archivo en /public/contacto/bg-herocontacto.jpg
          backgroundImage:
            "linear-gradient(0deg, rgba(0,0,0,0.45), rgba(0,0,0,0.45)), url('/contacto/bg-herocontacto.jpg')",
          backgroundSize: "cover",
          // baja un poco el encuadre para que el coche quede visible
          backgroundPosition: "center 65%",
          backgroundRepeat: "no-repeat",
          // más alto para que entre bien el motivo
          minHeight: "60svh",
        }}
      >
        <div className="container-wide py-12 md:py-16 relative z-10">
          <header className="text-white">
            <div className="eyebrow text-white/80">Contacto</div>
            <h1 className="h1 mt-2">Hablemos</h1>
            <p className="mt-2 max-w-2xl text-white/90">
              Comisiones, preguntas o colaboraciones. Respondo con gusto lo antes posible.
            </p>
          </header>
        </div>
      </section>

      {/* CONTENIDO */}
      <section className="container-padded py-12 md:py-16">
        <div className="grid gap-10 lg:grid-cols-12">
          {/* LADO IZQUIERDO: tarjetas de contacto / redes */}
          <aside className="lg:col-span-5 space-y-4">
            <div className="card-surface rounded-2xl p-5 flex items-start gap-3">
              <span className="mt-1 inline-flex size-9 items-center justify-center rounded-full pastel-surface-mint shadow-sm">
                <Mail className="h-4 w-4" />
              </span>
              <div>
                <p className="font-semibold">Correo</p>
                <Link href="mailto:contacto@artista.com" className="underline underline-offset-4">
                  contacto@artista.com
                </Link>
                <p className="text-sm opacity-70 mt-1">Respuesta habitual: 1–2 días hábiles.</p>
              </div>
            </div>

            <div className="card-surface rounded-2xl p-5 flex items-start gap-3">
              <span className="mt-1 inline-flex size-9 items-center justify-center rounded-full pastel-surface-lavender shadow-sm">
                <Instagram className="h-4 w-4" />
              </span>
              <div>
                <p className="font-semibold">Instagram</p>
                <Link
                  href="https://instagram.com/"
                  target="_blank"
                  className="underline underline-offset-4"
                >
                  instagram.com/…
                </Link>
                <p className="text-sm opacity-70 mt-1">Proceso, bocetos y obras recientes.</p>
              </div>
            </div>

            <div className="card-surface rounded-2xl p-5 flex items-start gap-3">
              <span className="mt-1 inline-flex size-9 items-center justify-center rounded-full pastel-surface-peach shadow-sm">
                <MapPin className="h-4 w-4" />
              </span>
              <div>
                <p className="font-semibold">Ubicación</p>
                <p className="opacity-80">Taller en Ciudad X — envíos internacionales</p>
              </div>
            </div>

            <p className="text-sm opacity-70">
              Al enviar aceptas el uso de tus datos para responder este mensaje. No envío spam ni
              comparto tu información.
            </p>
          </aside>

          {/* LADO DERECHO: formulario con marco artístico */}
          <div className="lg:col-span-7">
            <div className="frame-gradient">
              <div className="frame-surface rounded-[19px]">
                <form onSubmit={onSubmit} className="p-6 md:p-7 space-y-4" aria-describedby="form-help">
                  <div className="grid gap-4 md:grid-cols-2">
                    <div>
                      <label htmlFor="name" className="block text-sm mb-1">
                        Nombre
                      </label>
                      <input
                        id="name"
                        name="name"
                        required
                        disabled={disabled}
                        className="w-full rounded-lg border border-black/10 bg-white px-3 py-2"
                        placeholder="Tu nombre"
                        autoComplete="name"
                      />
                    </div>
                    <div>
                      <label htmlFor="email" className="block text-sm mb-1">
                        Email
                      </label>
                      <input
                        id="email"
                        type="email"
                        name="email"
                        required
                        disabled={disabled}
                        className="w-full rounded-lg border border-black/10 bg-white px-3 py-2"
                        placeholder="tu@email.com"
                        autoComplete="email"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-sm mb-1">
                      Mensaje
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      rows={6}
                      required
                      disabled={disabled}
                      className="w-full rounded-lg border border-black/10 bg-white px-3 py-2"
                      placeholder="Cuéntame brevemente la idea, medidas, técnica…"
                    />
                  </div>

                  <div className="flex items-center gap-3 pt-2">
                    <button
                      type="submit"
                      disabled={disabled}
                      className="btn-accent inline-flex items-center gap-2 px-5 py-2.5 rounded-full font-semibold disabled:opacity-60"
                    >
                      <Send className="h-4 w-4" />
                      {status === "loading" ? "Enviando…" : "Enviar"}
                    </button>

                    {status === "ok" && (
                      <span className="text-sm text-green-700">¡Mensaje enviado! Gracias 🙌</span>
                    )}
                    {status === "error" && (
                      <span className="text-sm text-red-700">Hubo un error. Intenta de nuevo.</span>
                    )}
                  </div>

                  <p id="form-help" className="sr-only">
                    Todos los campos son obligatorios.
                  </p>
                </form>
              </div>
            </div>
          </div>
        </div>

        {/* CTA secundario */}
        <div className="mt-12 text-center">
          <Link href="/galeria" className="btn-ghost inline-block px-5 py-2.5">
            Ver obras disponibles
          </Link>
        </div>
      </section>
    </main>
  );
}
