"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";

type HeroProps = {
  title?: string;
  subtitle?: string;
  /** Ruta pública dentro de /public (ej. "/hero/placeholder.jpg") */
  imageSrc?: string;
  /** Altura base en móvil; en md+ se limita automáticamente */
  heightVh?: number;
  ctaHref?: string;
  ctaLabel?: string;
};

export default function Hero({
  title = "Galería del Artista",
  subtitle = "Obras pictoplasma en paletas pastel — minimal y contemporáneo.",
  imageSrc = "/hero/placeholder.jpg",
  heightVh = 80,
  ctaHref = "/galeria",
  ctaLabel = "Explorar galería",
}: HeroProps) {
  const rootRef = useRef<HTMLElement | null>(null);

  // Hace el navbar transparente cuando está sobre el hero
  useEffect(() => {
    const el = rootRef.current;
    const nav = document.querySelector<HTMLElement>("header[data-nav]");
    if (!el || !nav) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) nav.classList.add("nav--over-hero");
        else nav.classList.remove("nav--over-hero");
      },
      { rootMargin: "-56px 0px 0px 0px", threshold: 0.1 } // ajusta si tu header mide distinto
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  return (
    <section
      ref={rootRef}
      aria-label="Sección principal"
      className={[
        "relative w-full overflow-hidden flex items-center",
        // Alturas responsivas claras (sin saltos)
        `h-[min(${heightVh}svh,900px)]`,
        "min-h-[68svh] md:min-h-[66svh] lg:min-h-[60svh]",
      ].join(" ")}
      style={{ paddingTop: "calc(env(safe-area-inset-top))" }}
    >
      {/* Fondo */}
      <Image
  src={imageSrc}
  alt=""
  fill
  priority
  sizes="100vw"
  quality={85}
  className="pointer-events-none select-none object-cover"
  style={{ objectPosition: "50% 35%" }} // ↑ mueve el foco (50% X, 35% Y)
/>


      {/* Capa para legibilidad: unifica contraste en cualquier foto */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/40 to-black/55 md:from-black/45 md:via-black/25 md:to-black/40" />

      {/* Contenido */}
      <div className="container-wide relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-12 items-center">
          <div className="col-span-1 md:col-span-8 lg:col-span-7">
            {/* TÍTULO afinado */}
            <h1
              className={[
                "font-extrabold text-white",
                // tamaño fluido controlado; más compacto en desktop
                "text-[clamp(2.25rem,6.5vw,4.25rem)]",
                // mejor lectura multiparámetro
                "leading-[0.95] md:leading-[0.92]",
                // ajusta kerning/espaciado por breakpoint
                "tracking-[-0.01em] md:tracking-[-0.02em]",
                // límites para que no se haga muy largo
                "max-w-[15ch] md:max-w-[12ch]",
                // centrado en móvil, izquierda en md+
                "text-center md:text-left",
                "mx-auto md:mx-0",
                // sombra suave para cualquier fondo
                "drop-shadow-[0_3px_10px_rgba(0,0,0,0.45)]",
              ].join(" ")}
            >
              {title}
            </h1>

            {/* SUBTÍTULO con mejor jerarquía y legibilidad */}
            <p
              className={[
                "mt-4 text-white/95",
                "text-[clamp(1rem,1.6vw,1.125rem)]",
                "leading-relaxed",
                "max-w-[66ch]",
                "text-center md:text-left",
                "mx-auto md:mx-0",
                "drop-shadow-[0_2px_6px_rgba(0,0,0,0.35)]",
              ].join(" ")}
            >
              {subtitle}
            </p>

            {/* CTA */}
            <div className="mt-7 flex justify-center md:justify-start">
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

          {/* Columna de respiro visual en pantallas anchas */}
          <div className="hidden md:block md:col-span-4 lg:col-span-5" />
        </div>
      </div>

      {/* Desvanecido hacia el color de fondo del tema (shadcn token) */}
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
