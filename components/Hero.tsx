"use client";

import Link from "next/link";
import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";

type HeroProps = {
  title?: string;
  subtitle?: string;
  imageSrc?: string;   // ruta a la imagen de fondo
  heightVh?: number;
  ctaHref?: string;
  ctaLabel?: string;
};

export default function Hero({
  title = "Galería del Artista",
  subtitle = "Obras pictoplasma en paletas pastel — minimal y contemporáneo.",
  imageSrc = "/hero/placeholder.jpg",   // 👈 tu imagen
  heightVh = 80,
  ctaHref = "/galeria",
  ctaLabel = "Explorar galería",
}: HeroProps) {
  const rootRef = useRef<HTMLElement | null>(null);

  // Navbar transparente sobre el Hero
  useEffect(() => {
    const el = rootRef.current;
    const nav = document.querySelector<HTMLElement>("header[data-nav]");
    if (!el || !nav) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) nav.classList.add("nav--over-hero");
        else nav.classList.remove("nav--over-hero");
      },
      { rootMargin: "-56px 0px 0px 0px", threshold: 0.1 } // h-14 = 56px
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section
      ref={rootRef}
      className="relative w-full overflow-hidden flex items-center"
      style={{
        height: `min(${heightVh}svh, 860px)`,
        backgroundImage: `url(${imageSrc})`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
      aria-label="Sección principal"
    >
      {/* overlay para legibilidad del texto */}
      <div className="absolute inset-0 bg-black/40" />

      <div className="container-wide relative z-10 text-center md:text-left">
        <h1 className="font-extrabold leading-[0.95] tracking-tight
                       text-[clamp(2.2rem,7vw,4.5rem)] max-w-[14ch] text-white">
          {title}
        </h1>
        <p className="mt-3 max-w-xl text-[clamp(1rem,1.8vw,1.125rem)] text-white/90">
          {subtitle}
        </p>

        <div className="mt-6">
          <Link href={ctaHref} aria-label={ctaLabel}>
            <Button className="rounded-full px-6 bg-white text-black hover:bg-white/90" size="lg">
              {ctaLabel}
            </Button>
          </Link>
        </div>
      </div>

      {/* Fade inferior hacia el fondo pastel */}
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 inset-x-0 h-24"
        style={{ background: "linear-gradient(180deg, transparent, var(--bg))" }}
      />
    </section>
  );
}
