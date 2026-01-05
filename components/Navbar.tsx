"use client";

// Force rebuild
import Link from "next/link";
import Image from "next/image";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import { Menu, X, ShoppingCart, Gem } from "lucide-react";
import { useCart } from "@/stores/cart";
import {
  motion,
  useAnimation,
  useReducedMotion,
  AnimatePresence,
} from "framer-motion";
import ThemeToggle from "@/components/ui/ThemeToggle";

type NavLink = { href: string; label: string };


const LINKS: NavLink[] = [
  { href: "/galeria", label: "Galería" },
  { href: "/tienda", label: "Tienda" },
  { href: "/artista", label: "Artista" },
  { href: "/contacto", label: "Contacto" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [open, setOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  // Cart logic
  const itemCount = useCart((s) =>
    s.items.reduce((acc, it) => acc + (it.quantity ?? 1), 0)
  );
  const displayCount = itemCount > 99 ? "99+" : itemCount;

  // Animations
  const badgeControls = useAnimation();
  const iconControls = useAnimation();
  const prefersReduced = useReducedMotion();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 20);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => setOpen(false), [pathname]);

  // Cart Badge Animation
  useEffect(() => {
    if (itemCount <= 0 || prefersReduced) return;

    const sequence = async () => {
      await badgeControls.start({
        scale: 1.3,
        y: -4,
        transition: { type: "spring", stiffness: 500, damping: 15 },
      });
      await badgeControls.start({
        scale: 1,
        y: 0,
        transition: { type: "spring", stiffness: 300, damping: 20 },
      });
    };
    sequence();
  }, [itemCount, badgeControls, prefersReduced]);

  return (
    <motion.header
      initial={{ y: -100 }}
      animate={{ y: 0 }}
      transition={{ duration: 0.6, ease: [0.16, 1, 0.3, 1] }}
      className={`
        fixed top-0 z-50 w-full border-b transition-all duration-300
        ${scrolled
          ? "bg-background/80 border-border shadow-sm backdrop-blur-xl supports-[backdrop-filter]:bg-background/60"
          : "bg-transparent border-transparent"
        }
      `}
    >
      <nav
        className="container-padded flex h-16 items-center justify-between gap-4"
        aria-label="Navegación principal"
      >
        {/* Branding */}
        <Link
          href="/"
          className="group flex items-center gap-2 select-none"
          aria-label="Inicio"
        >
          <div className="relative h-8 w-8 flex items-center justify-center rounded-full bg-primary/10 text-primary">
            <Gem className="h-5 w-5" />
          </div>
          <span className="text-lg font-bold tracking-tight text-foreground transition-colors group-hover:text-primary">
            ZPTVRD
          </span>
        </Link>

        {/* Desktop Links */}
        <div className="hidden md:flex items-center gap-1">
          {LINKS.map((l) => {
            const active = pathname === l.href;
            return (
              <Link
                key={l.href}
                href={l.href}
                className={`
                  relative px-4 py-2 text-sm font-medium transition-colors rounded-full
                  ${active
                    ? "text-foreground bg-secondary/80"
                    : "text-muted-foreground hover:text-foreground hover:bg-secondary/40"
                  }
                `}
              >
                {l.label}
                {active && (
                  <motion.div
                    layoutId="navbar-indicator"
                    className="absolute inset-0 rounded-full border border-border bg-transparent -z-10"
                    transition={{ type: "spring", bounce: 0.2, duration: 0.6 }}
                  />
                )}
              </Link>
            );
          })}
        </div>

        {/* Actions */}
        <div className="flex items-center gap-2">
          <ThemeToggle />

          {/* Cart Toggle */}
          <Link
            href="/carrito"
            className="relative inline-flex h-9 w-9 items-center justify-center rounded-full transition-colors hover:bg-secondary text-foreground"
            aria-label="Carrito de compras"
          >
            <motion.div animate={iconControls}>
              <ShoppingCart className="h-5 w-5" />
            </motion.div>

            <AnimatePresence>
              {itemCount > 0 && (
                <motion.span
                  initial={{ scale: 0, opacity: 0 }}
                  animate={badgeControls}
                  exit={{ scale: 0, opacity: 0 }}
                  className="absolute -top-1 -right-1 flex h-4 min-w-4 items-center justify-center rounded-full bg-accent px-1 text-[10px] font-bold text-accent-foreground shadow-sm ring-2 ring-background"
                >
                  {displayCount}
                </motion.span>
              )}
            </AnimatePresence>
          </Link>

          {/* Mobile Menu Toggle */}
          <button
            className="md:hidden inline-flex h-9 w-9 items-center justify-center rounded-full transition-colors hover:bg-secondary text-foreground"
            onClick={() => setOpen(!open)}
            aria-expanded={open}
            aria-label="Menú principal"
          >
            <AnimatePresence mode="wait">
              {open ? (
                <motion.div
                  key="close"
                  initial={{ rotate: -90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: 90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <X className="h-5 w-5" />
                </motion.div>
              ) : (
                <motion.div
                  key="menu"
                  initial={{ rotate: 90, opacity: 0 }}
                  animate={{ rotate: 0, opacity: 1 }}
                  exit={{ rotate: -90, opacity: 0 }}
                  transition={{ duration: 0.2 }}
                >
                  <Menu className="h-5 w-5" />
                </motion.div>
              )}
            </AnimatePresence>
          </button>
        </div>
      </nav>

      {/* Mobile Menu Content */}
      <AnimatePresence>
        {open && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: "auto", opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{ duration: 0.3, ease: [0.32, 0.72, 0, 1] }}
            className="overflow-hidden md:hidden border-t border-border bg-background/95 backdrop-blur-xl"
          >
            <div className="container-padded py-4 flex flex-col gap-2">
              {LINKS.map((l, i) => (
                <motion.div
                  key={l.href}
                  initial={{ x: -20, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{ delay: i * 0.05 + 0.1 }}
                >
                  <Link
                    href={l.href}
                    className={`
                      block rounded-xl px-4 py-3 text-base font-medium transition-colors
                      ${pathname === l.href
                        ? "bg-secondary text-foreground"
                        : "text-muted-foreground hover:bg-secondary/50 hover:text-foreground"
                      }
                    `}
                    onClick={() => setOpen(false)}
                  >
                    {l.label}
                  </Link>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </motion.header>
  );
}
