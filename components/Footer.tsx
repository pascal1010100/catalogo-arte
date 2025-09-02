// components/Footer.tsx
import Link from "next/link";
import Image from "next/image";
import {
  Instagram,
  Mail,
  Globe,
  ExternalLink,
  MessageCircle,
  ArrowUpRight,
} from "lucide-react";

export default function Footer() {
  return (
    <footer
      role="contentinfo"
      className="relative border-t border-black/10 bg-[color:var(--bg)] text-[color:var(--fg)]"
    >
      {/* Barra superior con acento */}
      <div
        aria-hidden
        className="absolute inset-x-0 top-0 h-1 bg-gradient-to-r from-transparent via-[color:var(--accent,#7c3aed)]/60 to-transparent"
      />

      {/* Halo suave */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-x-0 -top-8 h-8 bg-gradient-to-b from-black/10 to-transparent"
      />

      <div className="container-padded py-12">
        {/* Top */}
        <div className="grid gap-10 md:grid-cols-12">
          {/* Marca / bio corta */}
          <div className="md:col-span-5">
            <Link
              href="/"
              aria-label="Inicio"
              className="inline-flex items-center gap-3 select-none"
            >
              <span className="relative h-9 w-9 overflow-hidden rounded-full ring-1 ring-black/10">
                <Image
                  src="/artista/avatar.jpg"
                  alt=""
                  fill
                  sizes="36px"
                  className="object-cover"
                />
              </span>

              <span className="text-lg font-bold tracking-tight">ZPTVRD</span>
              <span className="inline-flex h-2 w-2 rounded-full bg-[color:var(--accent,#7c3aed)]/80" />
            </Link>

            <p className="mt-3 text-sm leading-relaxed opacity-80">
              Galería y catálogo del artista: obras recientes, series y piezas
              seleccionadas. Diseño minimal y enfoque en la obra — sin
              distracciones.
            </p>

            {/* CTA con acento */}
            <div className="mt-5">
              <Link
                href="/galeria"
                className="btn btn-accent" // si ya tienes tu sistema de botones
              >
                Explorar galería
              </Link>
              {/* Fallback si no usas 'btn btn-accent':
              <Link
                href="/galeria"
                className="inline-flex items-center justify-center rounded-full px-4 py-2 text-sm font-medium
                           bg-[color:var(--accent,#7c3aed)] text-white shadow hover:opacity-90 transition"
              >
                Explorar galería
              </Link>
              */}
            </div>

            {/* Sitio del artista */}
            <div className="mt-4">
              <a
                href="https://zptvrd.example.com"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-sm opacity-80 transition hover:opacity-100 hover:underline decoration-[color:var(--accent,#7c3aed)] underline-offset-4"
              >
                <Globe className="h-4 w-4" aria-hidden />
                Sitio del artista
                <ExternalLink className="h-3.5 w-3.5" aria-hidden />
              </a>
            </div>
          </div>

          {/* Navegación */}
          <nav className="md:col-span-4" aria-label="Navegación">
            <h3 className="mb-3 text-sm font-semibold opacity-80">Explorar</h3>
            <ul className="grid grid-cols-2 gap-y-2 text-sm">
              {[
                { href: "/galeria", label: "Galería" },
                { href: "/artista", label: "Artista" },
                { href: "/carrito", label: "Carrito" },
                { href: "/contacto", label: "Contacto" },
              ].map((i) => (
                <li key={i.href}>
                  <Link
                    href={i.href}
                    className="opacity-80 transition hover:opacity-100 hover:underline decoration-[color:var(--accent,#7c3aed)] underline-offset-4"
                  >
                    {i.label}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          {/* Contacto / Redes */}
          <div className="md:col-span-3">
            <h3 className="mb-3 text-sm font-semibold opacity-80">Conecta</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="https://www.instagram.com/zptvrd?igsh=ZHgzazcwa2E4cXV2"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="group inline-flex items-center gap-2 rounded-xl px-2 py-1 transition hover:bg-black/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--accent,#7c3aed)]/30"
                >
                  <Instagram className="h-4 w-4 opacity-90 group-hover:text-[color:var(--accent,#7c3aed)] group-hover:opacity-100" aria-hidden />
                  <span className="group-hover:text-[color:var(--accent,#7c3aed)]">@zptvrd</span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:contacto@galeria.com"
                  className="group inline-flex items-center gap-2 rounded-xl px-2 py-1 transition hover:bg-black/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--accent,#7c3aed)]/30"
                >
                  <Mail className="h-4 w-4 opacity-90 group-hover:text-[color:var(--accent,#7c3aed)] group-hover:opacity-100" aria-hidden />
                  <span className="group-hover:text-[color:var(--accent,#7c3aed)]">contacto@galeria.com</span>
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/0000000000?text=Hola%20ZPTVRD"
                  target="_blank"
                  rel="noreferrer"
                  className="group inline-flex items-center gap-2 rounded-xl px-2 py-1 transition hover:bg-black/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--accent,#7c3aed)]/30"
                >
                  <MessageCircle className="h-4 w-4 opacity-90 group-hover:text-[color:var(--accent,#7c3aed)] group-hover:opacity-100" aria-hidden />
                  <span className="group-hover:text-[color:var(--accent,#7c3aed)]">WhatsApp</span>
                </a>
              </li>
            </ul>

            <p className="mt-4 text-xs opacity-60">
              Comisiones y piezas por encargo disponibles.
            </p>
          </div>
        </div>

        {/* Divider con acento */}
        <div className="my-8 h-px bg-gradient-to-r from-transparent via-[color:var(--accent,#7c3aed)]/40 to-transparent" />

        {/* Bottom */}
        <div className="flex flex-col-reverse gap-3 md:flex-row md:items-center md:justify-between">
          <p className="text-xs opacity-70">
            © {new Date().getFullYear()} ZPTVRD — Todos los derechos reservados.
          </p>

          <div className="flex items-center gap-4 text-xs opacity-70">
            {/* Botón chip con acento (sin onClick) */}
            <a
              href="#top"
              className="inline-flex items-center gap-1 rounded-full px-3 py-1.5 ring-1 ring-[color:var(--accent,#7c3aed)]/55 text-[color:var(--accent,#7c3aed)] hover:bg-[color:var(--accent,#7c3aed)] hover:text-white transition"
            >
              Subir
              <ArrowUpRight className="h-3.5 w-3.5" aria-hidden />
            </a>
            <span className="hidden opacity-30 md:inline">·</span>
            <a
              href="/politica-de-privacidad"
              className="hover:underline decoration-[color:var(--accent,#7c3aed)] underline-offset-4"
            >
              Privacidad
            </a>
            <span className="opacity-30">·</span>
            <a
              href="/terminos"
              className="hover:underline decoration-[color:var(--accent,#7c3aed)] underline-offset-4"
            >
              Términos
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
