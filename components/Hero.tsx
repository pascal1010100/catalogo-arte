"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";

type HeroProps = {
  title?: string;
  subtitle?: string;
  /** Ruta pública dentro de /public, p. ej. "/hero/placeholder.jpg" */
  imageSrc?: string;
  /** Altura base (svh) en móvil; en md+ se limita automáticamente */
  heightVh?: number;
  ctaHref?: string;
  ctaLabel?: string;
};

export default function Hero({
  title = "Galería del Artista",
  subtitle = "Obras pictoplasma en paletas pastel — minimal y contemporáneo.",
  imageSrc = "/hero/placeholder.jpg",
  heightVh = 82,
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
      aria-label="Sección principal"
      className={[
        // Altura: móvil alto, tablet/desktop controlado
        "relative w-full overflow-hidden flex items-center",
        "min-h-[60svh]",
        `h-[min(${heightVh}svh,900px)]`,
        "md:h-[min(78svh,820px)]",
      ].join(" ")}
      // separa el contenido del header fijo (si lo usas)
      style={{ paddingTop: "calc(env(safe-area-inset-top))" }}
    >
      {/* Imagen de fondo */}
      <Image
        src={imageSrc}
        alt=""
        fill
        priority
        sizes="100vw"
        className="object-cover object-center"
      />

      {/* Overlay para legibilidad (ligeramente más fuerte en móvil) */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/35 via-black/25 to-black/50 md:from-black/25 md:via-black/15 md:to-black/40" />

      {/* Contenido */}
      <div className="container-wide relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 items-center">
          <div className="col-span-1 md:col-span-8">
            <h1
              className={[
                "font-extrabold leading-[0.95] tracking-tight text-white",
                "text-[clamp(2.2rem,7vw,4.5rem)]",
                "text-center md:text-left",
                "max-w-[14ch] mx-auto md:mx-0",
              ].join(" ")}
            >
              {title}
            </h1>

            <p
              className={[
                "mt-3 text-white/90",
                "text-[clamp(1rem,1.8vw,1.125rem)]",
                "max-w-[60ch]",
                "text-center md:text-left mx-auto md:mx-0",
              ].join(" ")}
            >
              {subtitle}
            </p>

            <div className="mt-6 flex justify-center md:justify-start">
              <Link href={ctaHref} aria-label={ctaLabel}>
                <Button
                  size="lg"
                  className="rounded-full px-6 bg-white text-black hover:bg-white/90"
                >
                  {ctaLabel}
                </Button>
              </Link>
            </div>
          </div>

          {/* Espaciador / columna libre para respirar en desktop */}
          <div className="hidden md:block md:col-span-4" />
        </div>
      </div>

      {/* Fade inferior hacia el fondo del tema (usa el token de shadcn) */}
      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 inset-x-0 h-24"
        style={{
          background:
            "linear-gradient(180deg, transparent, hsl(var(--background)))",
        }}
      />
    </section>
  );
}
