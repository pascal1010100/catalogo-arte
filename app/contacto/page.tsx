"use client";

import { useState, type FormEvent } from "react";
import Link from "next/link";
import { Instagram, Mail, MapPin, Send, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";

type Status = "idle" | "loading" | "ok" | "error";

interface ContactPayload {
  name: string;
  email: string;
  message: string;
}

interface ApiResponse {
  ok?: boolean;
  error?: string;
}

export default function ContactoPage() {
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  async function onSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setStatus("loading");
    setErrorMsg(null);

    const form = e.currentTarget;

    const nameEl = form.elements.namedItem("name") as HTMLInputElement | null;
    const emailEl = form.elements.namedItem("email") as HTMLInputElement | null;
    const messageEl = form.elements.namedItem("message") as HTMLTextAreaElement | null;

    const data: ContactPayload = {
      name: (nameEl?.value ?? "").trim(),
      email: (emailEl?.value ?? "").trim(),
      message: (messageEl?.value ?? "").trim(),
    };

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(data satisfies ContactPayload),
      });

      let body: ApiResponse = {};
      try {
        body = (await res.json()) as ApiResponse;
      } catch {
        // puede no venir cuerpo en algunos errores
      }

      if (!res.ok || body.ok === false) {
        setStatus("error");
        setErrorMsg(body.error ?? "No se pudo enviar.");
        return;
      }

      setStatus("ok");
      form.reset();
    } catch {
      setStatus("error");
      setErrorMsg("No se pudo conectar con el servidor.");
    }
  }

  const disabled: boolean = status === "loading";

  return (
    <main className="min-h-screen">
      {/* HERO SECTION */}
      <section className="relative h-[50vh] min-h-[400px] flex items-center overflow-hidden">
        {/* Background Image - ideally real image */}
        <div
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('/contacto/bg-herocontacto.jpg')",
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-background via-background/60 to-black/40" />

        <div className="container-padded relative z-10 w-full pt-10">
          <Badge variant="secondary" className="mb-4 backdrop-blur-md bg-white/10 text-white border-white/20">
            Contacto
          </Badge>
          <h1 className="text-4xl md:text-6xl font-black text-white tracking-tight drop-shadow-md">
            Hablemos de Arte
          </h1>
          <p className="mt-4 text-white/90 text-lg max-w-xl text-balance drop-shadow-sm font-light">
            ¿Tienes una idea, un espacio que necesita vida o simplemente quieres saludar?
            Estoy abierto a colaboraciones y comisiones.
          </p>
        </div>
      </section>

      {/* CONTENIDO */}
      <section className="container-padded py-16 md:py-24 relative -mt-20 z-20">
        <div className="grid lg:grid-cols-12 gap-8 items-start">

          {/* LADO IZQUIERDO: Información */}
          <div className="lg:col-span-5 space-y-6">
            <Card className="glass-card p-8 space-y-8 border-border/50">
              <div>
                <h3 className="text-xl font-bold mb-6">Canales de contacto</h3>
                <div className="space-y-6">
                  <ContactItem
                    icon={<Mail className="w-5 h-5" />}
                    title="Correo Electrónico"
                    content="contacto@artista.com"
                    href="mailto:contacto@artista.com"
                    desc="Respuesta en 24-48 horas."
                  />
                  <ContactItem
                    icon={<Instagram className="w-5 h-5" />}
                    title="Instagram"
                    content="@zptvrd"
                    href="https://www.instagram.com/zptvrd"
                    desc="Mi día a día y work in progress."
                  />
                  <ContactItem
                    icon={<MapPin className="w-5 h-5" />}
                    title="Estudio"
                    content="Ciudad de México"
                    desc="Visitas solo con cita previa."
                  />
                </div>
              </div>

              <div className="pt-6 border-t border-border/50">
                <p className="text-xs text-muted-foreground leading-relaxed">
                  Al enviar el formulario, aceptas que usemos tus datos únicamente
                  para responder a tu consulta. Respetamos tu privacidad.
                </p>
              </div>
            </Card>
          </div>

          {/* LADO DERECHO: Formulario */}
          <div className="lg:col-span-7">
            <div className="bg-card border border-border rounded-3xl p-8 md:p-10 shadow-xl">
              <h2 className="text-2xl font-bold mb-2">Envíame un mensaje</h2>
              <p className="text-muted-foreground mb-8">Cuéntame sobre tu proyecto o duda.</p>

              <form onSubmit={onSubmit} className="space-y-6">
                <div className="grid md:grid-cols-2 gap-6">
                  <div className="space-y-2">
                    <label htmlFor="name" className="text-sm font-medium">Nombre</label>
                    <Input
                      id="name"
                      name="name"
                      placeholder="Tu nombre completo"
                      required
                      disabled={disabled}
                    />
                  </div>
                  <div className="space-y-2">
                    <label htmlFor="email" className="text-sm font-medium">Email</label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      placeholder="correo@ejemplo.com"
                      required
                      disabled={disabled}
                    />
                  </div>
                </div>

                <div className="space-y-2">
                  <label htmlFor="message" className="text-sm font-medium">Mensaje</label>
                  <textarea
                    id="message"
                    name="message"
                    rows={6}
                    className="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
                    placeholder="¿Qué tienes en mente?"
                    required
                    disabled={disabled}
                  />
                </div>

                <div className="flex flex-col sm:flex-row items-center gap-4 pt-2">
                  <Button type="submit" disabled={disabled} size="lg" className="w-full sm:w-auto min-w-[160px]">
                    {status === 'loading' ? (
                      <><Loader2 className="mr-2 h-4 w-4 animate-spin" /> Enviando</>
                    ) : (
                      <><Send className="mr-2 h-4 w-4" /> Enviar mensaje</>
                    )}
                  </Button>

                  {status === "ok" && (
                    <span className="text-sm font-medium text-green-600 bg-green-50 px-3 py-1 rounded-full dark:bg-green-900/20 dark:text-green-400">
                      ¡Mensaje enviado correctamente!
                    </span>
                  )}
                  {status === "error" && (
                    <span className="text-sm font-medium text-destructive bg-destructive/10 px-3 py-1 rounded-full">
                      {errorMsg || "Hubo un error al enviar."}
                    </span>
                  )}
                </div>
              </form>
            </div>
          </div>

        </div>
      </section>
    </main>
  );
}

function ContactItem({ icon, title, content, href, desc }: { icon: React.ReactNode, title: string, content?: string, href?: string, desc?: string }) {
  return (
    <div className="flex items-start gap-4 group">
      <div className="h-10 w-10 shrink-0 rounded-full bg-secondary flex items-center justify-center text-foreground group-hover:scale-110 transition-transform duration-300">
        {icon}
      </div>
      <div>
        <p className="font-semibold text-foreground">{title}</p>
        {href ? (
          <a href={href} className="text-primary hover:underline font-medium block">
            {content}
          </a>
        ) : content ? (
          <p className="text-foreground/80 block">{content}</p>
        ) : null}
        {desc && <p className="text-sm text-muted-foreground mt-0.5">{desc}</p>}
      </div>
    </div>
  )
}
