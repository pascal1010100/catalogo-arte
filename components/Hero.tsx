"use client";

import Image from "next/image";
import Link from "next/link";
import { useEffect, useRef } from "react";
import { Button } from "@/components/ui/button";
import {
  motion,
  useScroll,
  useTransform,
  useReducedMotion,
  type Variants,
  type MotionStyle,
} from "framer-motion";

type HeroProps = {
  title?: string;
  subtitle?: string;
  imageSrc?: string;
  heightVh?: number;
  ctaHref?: string;
  ctaLabel?: string;
  objectPosition?: string; // ej. "50% 35%"
};

export default function Hero({
  title = "Galería del Artista",
  subtitle = "Obras pictoplasma en paletas pastel — minimal y contemporáneo.",
  imageSrc = "/hero/placeholder.jpg",
  heightVh = 80,
  ctaHref = "/galeria",
  ctaLabel = "Explorar galería",
  objectPosition = "50% 35%",
}: HeroProps) {
  const rootRef = useRef<HTMLElement | null>(null);

  // Navbar transparente encima del hero
  useEffect(() => {
    const el = rootRef.current;
    const nav = document.querySelector<HTMLElement>("header[data-nav]");
    if (!el || !nav) return;

    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) nav.classList.add("nav--over-hero");
        else nav.classList.remove("nav--over-hero");
      },
      { rootMargin: "-56px 0px 0px 0px", threshold: 0.1 }
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  // Motion: parallax + reveal
  const prefersReduced = useReducedMotion();
  const { scrollYProgress } = useScroll({
    target: rootRef,
    offset: ["start start", "end start"],
  });

  const parallaxY = useTransform(scrollYProgress, [0, 1], [0, -60]);
  const kbScale = useTransform(scrollYProgress, [0, 1], [1.06, 1]);
  const imgMotionStyle: MotionStyle = prefersReduced ? {} : { y: parallaxY, scale: kbScale };

  const revealParent: Variants = {
    hidden: { opacity: 0, y: 10 },
    show: {
      opacity: 1,
      y: 0,
      transition: {
        type: "spring",
        stiffness: 520,
        damping: 32,
        staggerChildren: 0.06,
        delayChildren: 0.08,
      },
    },
  };

  const revealItem: Variants = {
    hidden: { opacity: 0, y: 14 },
    show: {
      opacity: 1,
      y: 0,
      transition: { type: "spring", stiffness: 520, damping: 32 },
    },
  };

  return (
    <section
      ref={rootRef}
      aria-label="Sección principal"
      className={[
        "relative w-full overflow-hidden flex items-center",
        `h-[min(${heightVh}svh,900px)]`,
        "min-h-[68svh] md:min-h-[66svh] lg:min-h-[60svh]",
      ].join(" ")}
      style={{ paddingTop: "calc(env(safe-area-inset-top))" }}
    >
      {/* Fondo animado */}
      <motion.div className="absolute inset-0 will-change-transform" style={imgMotionStyle} aria-hidden>
        <Image
          src={imageSrc}
          alt=""
          fill
          priority
          sizes="100vw"
          quality={85}
          className="pointer-events-none select-none object-cover"
          style={{ objectPosition }}
        />
      </motion.div>

      {/* Vignette para legibilidad */}
      <div className="absolute inset-0 bg-gradient-to-b from-black/65 via-black/35 to-black/55 md:from-black/45 md:via-black/25 md:to-black/40" />

      {/* Contenido */}
      <div className="container-wide relative z-10">
        <motion.div
          className="grid grid-cols-1 md:grid-cols-12 items-center"
          variants={revealParent}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, amount: 0.6 }}
        >
          <div className="col-span-1 md:col-span-8 lg:col-span-7">
            <motion.h1
              variants={revealItem}
              className={[
                "font-extrabold text-white",
                "text-[clamp(2.25rem,6.5vw,4.25rem)]",
                "leading-[0.95] md:leading-[0.92]",
                "tracking-[-0.01em] md:tracking-[-0.02em]",
                "max-w-[15ch] md:max-w-[12ch]",
                "text-center md:text-left",
                "mx-auto md:mx-0",
                "drop-shadow-[0_3px_10px_rgba(0,0,0,0.45)]",
              ].join(" ")}
            >
              {title}
            </motion.h1>

            <motion.p
              variants={revealItem}
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
            </motion.p>

            <motion.div
              variants={revealItem}
              className="mt-7 flex flex-wrap items-center gap-3 justify-center md:justify-start"
            >
              <Link href={ctaHref} aria-label={ctaLabel}>
                <Button
                  size="lg"
                  className="rounded-full px-6 bg-white text-black hover:bg-white/90 border border-white/20 shadow-md"
                >
                  {ctaLabel}
                </Button>
              </Link>
            </motion.div>
          </div>

          <div className="hidden md:block md:col-span-4 lg:col-span-5" />
        </motion.div>
      </div>

      <div
        aria-hidden
        className="pointer-events-none absolute bottom-0 inset-x-0 h-20"
        style={{ background: "linear-gradient(180deg, transparent, hsl(var(--background)))" }}
      />
    </section>
  );
}
