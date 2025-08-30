// components/Footer.tsx
import Link from "next/link";
import { Instagram, Mail, Globe, ExternalLink } from "lucide-react";

export default function Footer() {
  return (
    <footer
      role="contentinfo"
      className="border-t border-black/10 bg-[color:var(--bg)] text-[color:var(--fg)]"
    >
      <div className="container-padded py-10">
        {/* Top */}
        <div className="grid gap-10 md:grid-cols-12">
          {/* Marca / bio corta */}
          <div className="md:col-span-5">
            <Link href="/" aria-label="Inicio" className="inline-flex items-center gap-2 select-none">
              <span className="text-lg font-bold tracking-tight">ZPTVRD</span>
              <span className="inline-flex h-2 w-2 rounded-full bg-[color:var(--fg)]/50" />
            </Link>
            <p className="mt-3 text-sm leading-relaxed opacity-80">
              Galería y catálogo del artista: obras recientes, series y piezas seleccionadas.
              Diseño minimal y enfoque en la obra — sin distracciones.
            </p>
            {/* Sitio del artista */}
            <div className="mt-4">
              <a
                href="https://zptvrd.example.com"
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 text-sm opacity-80 hover:opacity-100 hover:underline transition"
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
              <li>
                <Link href="/galeria" className="opacity-80 hover:opacity-100 hover:underline transition">
                  Galería
                </Link>
              </li>
              <li>
                <Link href="/artista" className="opacity-80 hover:opacity-100 hover:underline transition">
                  Artista
                </Link>
              </li>
              <li>
                <Link href="/carrito" className="opacity-80 hover:opacity-100 hover:underline transition">
                  Carrito
                </Link>
              </li>
              <li>
                <Link href="/contacto" className="opacity-80 hover:opacity-100 hover:underline transition">
                  Contacto
                </Link>
              </li>
            </ul>
          </nav>

          {/* Contacto / Redes */}
          <div className="md:col-span-3">
            <h3 className="mb-3 text-sm font-semibold opacity-80">Conecta</h3>
            <ul className="space-y-2 text-sm">
              <li>
                <a
                  href="https://instagram.com/tu_usuario"
                  target="_blank"
                  rel="noreferrer"
                  className="group inline-flex items-center gap-2 rounded-xl px-2 py-1 transition hover:bg-black/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--fg)]/30"
                >
                  <Instagram className="h-4 w-4 opacity-90 group-hover:opacity-100" aria-hidden />
                  <span>@tu_usuario</span>
                </a>
              </li>
              <li>
                <a
                  href="mailto:contacto@galeria.com"
                  className="group inline-flex items-center gap-2 rounded-xl px-2 py-1 transition hover:bg-black/5 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--fg)]/30"
                >
                  <Mail className="h-4 w-4 opacity-90 group-hover:opacity-100" aria-hidden />
                  <span>contacto@galeria.com</span>
                </a>
              </li>
            </ul>

            {/* Nota legal corta */}
            <p className="mt-4 text-xs opacity-60">
              Comisiones y piezas por encargo disponibles.
            </p>
          </div>
        </div>

        {/* Divider */}
        <div className="my-8 h-px bg-black/10" />

        {/* Bottom */}
        <div className="flex flex-col-reverse gap-3 md:flex-row md:items-center md:justify-between">
          <p className="text-xs opacity-70">
            © {new Date().getFullYear()} ZPTVRD — Todos los derechos reservados.
          </p>

          <div className="flex items-center gap-4 text-xs opacity-70">
            <span className="hidden md:inline">Hecho con cuidado</span>
            <span className="opacity-30">·</span>
            <a
              href="/politica-de-privacidad"
              className="hover:underline"
            >
              Privacidad
            </a>
            <span className="opacity-30">·</span>
            <a
              href="/terminos"
              className="hover:underline"
            >
              Términos
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}
