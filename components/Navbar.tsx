// components/ui/Navbar.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X, ShoppingCart } from "lucide-react";
import { useCart } from "@/stores/cart";
import {
  motion,
  useAnimation,
  useReducedMotion,
  AnimatePresence,
} from "framer-motion";

type NavLink = { href: string; label: string };

const LOGO_SRC = "/brand/zptvrd.svg";

const LINKS: NavLink[] = [
  { href: "/galeria", label: "Galería" },
  { href: "/artista", label: "Artista" },
  { href: "/contacto", label: "Contacto" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [logoOk, setLogoOk] = useState(true);

  // contador de piezas en el carrito
  const itemCount = useCart((s) =>
    s.items.reduce((acc, it) => acc + (it.quantity ?? 1), 0)
  );
  const displayCount = itemCount > 99 ? "99+" : itemCount;

  // --- Animaciones ---
  const badgeControls = useAnimation();
  const iconControls = useAnimation();
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 12);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  useEffect(() => {
    if (itemCount <= 0) return;

    if (prefersReduced) {
      badgeControls.set({ scale: 1, y: 0, rotate: 0, filter: "brightness(1)" });
      iconControls.set({ rotate: 0, scale: 1 });
      return;
    }

    // Secuencia vistosa (Framer v11 friendly):
    // 1) Salto + bump (spring)
    // 2) Wiggle rápido (tween)
    // 3) Vuelve a lugar (spring)
    // 4) Flash de brillo sutil (tween)
    (async () => {
      await badgeControls.start({
        scale: 1.25,
        y: -6,
        transition: { type: "spring", stiffness: 900, damping: 16 },
      });
      await badgeControls.start({
        rotate: -10,
        transition: { duration: 0.08, ease: "easeOut" },
      });
      await badgeControls.start({
        rotate: 10,
        transition: { duration: 0.12, ease: "easeOut" },
      });
      await badgeControls.start({
        rotate: 0,
        y: 0,
        transition: { type: "spring", stiffness: 900, damping: 18 },
      });
      await badgeControls.start({
        scale: 1,
        transition: { type: "spring", stiffness: 750, damping: 20 },
      });
      await badgeControls.start({
        filter: "brightness(1.35)",
        transition: { duration: 0.12, ease: "easeOut" },
      });
      await badgeControls.start({
        filter: "brightness(1)",
        transition: { duration: 0.18, ease: "easeOut" },
      });
    })();

    // Mini “shake” del icono (tween con varios keyframes)
    iconControls.start({
      rotate: [0, -15, 12, -8, 0],
      transition: { duration: 0.5, ease: "easeOut" },
    });
  }, [itemCount, badgeControls, iconControls, prefersReduced]);

  return (
    <header
      data-nav
      role="banner"
      className={[
        "fixed top-0 z-50 w-full border-b transition-all",
        scrolled ? "backdrop-blur-md" : "backdrop-blur-[2px]",
        "bg-[color:var(--bg)]/92 border-black/10",
      ].join(" ")}
    >
      <nav
        className="container-padded flex h-14 items-center justify-between gap-3"
        aria-label="Principal"
      >
        {/* Branding */}
        <Link
          href="/"
          className="flex items-center gap-2 select-none shrink-0"
          aria-label="Inicio"
        >
          {logoOk ? (
            <Image
              src={LOGO_SRC}
              alt="ZPTVRD"
              width={24}
              height={24}
              priority
              onError={() => setLogoOk(false)}
            />
          ) : (
            <span className="inline-block h-6 w-6 rounded bg-black/80" aria-hidden />
          )}
          <span className="text-base md:text-lg font-extrabold tracking-tight text-[color:var(--fg)]">
            ZPTVRD
          </span>
        </Link>

        {/* Links desktop */}
        <div className="hidden md:flex items-center justify-center gap-6">
          {LINKS.map((l) => {
            const active = pathname === l.href;
            return (
              <Link
                key={l.href}
                href={l.href}
                aria-current={active ? "page" : undefined}
                className={[
                  "text-sm transition-colors",
                  active
                    ? "font-semibold text-[color:var(--fg)]"
                    : "text-[color:var(--fg)]/80 hover:text-[color:var(--fg)]",
                ].join(" ")}
              >
                {l.label}
              </Link>
            );
          })}
        </div>

        {/* Carrito + hamburguesa */}
        <div className="flex items-center gap-1 sm:gap-2">
          <Link
            href="/carrito"
            aria-label={`Carrito${itemCount ? `: ${itemCount} artículo(s)` : ""}`}
            className="relative inline-flex items-center justify-center rounded-full p-2 hover:bg-black/5 transition"
          >
            <motion.span
              className="inline-flex"
              initial={false}
              animate={iconControls}
            >
              <ShoppingCart className="h-5 w-5 text-[color:var(--fg)]" />
            </motion.span>

            {itemCount > 0 && (
              <motion.span
                aria-live="polite"
                aria-atomic="true"
                initial={false}
                animate={badgeControls}
                layout
                className="absolute -top-1 -right-1 min-w-4 h-4 px-1 rounded-full text-[10px] leading-4
                           bg-[color:var(--accent)] text-[#0e0e10] font-semibold text-center shadow"
              >
                {/* ráfaga de halos escalonados */}
                <AnimatePresence mode="popLayout">
                  {[0, 1, 2].map((i) => (
                    <motion.span
                      key={`${itemCount}-burst-${i}`}
                      className="absolute inset-0 rounded-full pointer-events-none ring-2 ring-[color:var(--accent)]"
                      initial={{ scale: 0.7, opacity: 0.5 }}
                      animate={{ scale: 2, opacity: 0 }}
                      exit={{ opacity: 0 }}
                      transition={{ duration: 0.55, delay: i * 0.06, ease: "easeOut" }}
                    />
                  ))}
                </AnimatePresence>
                {displayCount}
              </motion.span>
            )}
          </Link>

          <button
            className="md:hidden inline-flex items-center justify-center rounded-md p-2
                       hover:bg-black/5 active:bg-black/10 transition"
            aria-label={open ? "Cerrar menú" : "Abrir menú"}
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen((v) => !v)}
          >
            {open ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>
      </nav>

      {/* Menú móvil */}
      <div
        id="mobile-menu"
        className={[
          "md:hidden overflow-hidden transition-[max-height,opacity] duration-300",
          open ? "max-h-64 opacity-100" : "max-h-0 opacity-0",
        ].join(" ")}
        aria-hidden={!open}
      >
        <div className="container-padded py-2 flex flex-col gap-1">
          {LINKS.map((l) => {
            const active = pathname === l.href;
            return (
              <Link
                key={l.href}
                href={l.href}
                aria-current={active ? "page" : undefined}
                className={[
                  "rounded-md px-3 py-2 text-sm",
                  "hover:bg-black/5 active:bg-black/10 transition",
                  active ? "font-semibold bg-black/5" : "text-[color:var(--fg)]/90",
                ].join(" ")}
              >
                {l.label}
              </Link>
            );
          })}
        </div>
      </div>
    </header>
  );
}
