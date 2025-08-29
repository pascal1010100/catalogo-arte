// components/Footer.tsx
import Link from "next/link";

export default function Footer() {
  return (
    <footer
      role="contentinfo"
      className="border-t border-black/10 bg-[color:var(--bg)]"
    >
      <div className="container-padded py-8">
        {/* Top row */}
        <div className="flex flex-col gap-6 md:flex-row md:items-start md:justify-between">
          {/* Marca / descripción corta */}
          <div className="max-w-md">
            <Link href="/" aria-label="Inicio" className="select-none">
              <span className="text-base font-bold tracking-tight text-[color:var(--fg)]">
                ZPTVRD
              </span>
            </Link>
            <p className="mt-2 text-sm opacity-80">
              Catálogo y galería del artista. Curaduría de obras recientes y
              series en proceso. Estética clara, funcional y amable.
            </p>
          </div>

          {/* Navegación rápida */}
          <nav aria-label="Enlaces">
            <ul className="grid grid-cols-2 gap-x-8 gap-y-2 text-sm">
              <li><Link href="/galeria" className="hover:underline">Galería</Link></li>
              <li><Link href="/artista" className="hover:underline">Artista</Link></li>
              <li><Link href="/carrito" className="hover:underline">Carrito</Link></li>
              <li><a href="#" className="hover:underline">Contacto</a></li>
            </ul>
          </nav>
        </div>

        {/* Divider sutil */}
        <div className="my-6 h-px bg-black/10" />

        {/* Bottom row */}
        <div className="flex flex-col-reverse gap-3 md:flex-row md:items-center md:justify-between">
          <p className="text-xs opacity-70">
            © {new Date().getFullYear()} ZPTVRD — Todos los derechos reservados.
          </p>

          {/* Redes (placeholders) */}
          <div className="flex items-center gap-3 text-sm">
            <a href="#" aria-label="Instagram" className="hover:underline">Instagram</a>
            <span className="opacity-30">·</span>
            <a href="#" aria-label="Portafolio" className="hover:underline">Portafolio</a>
            <span className="opacity-30">·</span>
            <a href="mailto:contacto@galeria.com" className="hover:underline">contacto@galeria.com</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
