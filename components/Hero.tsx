"use client";

import Image from "next/image";
import Link from "next/link";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import {
  motion,
  useScroll,
  useTransform,
  useSpring,
  useReducedMotion,
  Variants,
} from "framer-motion";

type HeroProps = {
  title?: string;
  subtitle?: string;
  imageSrc?: string;
  heightVh?: number;
  ctaHref?: string;
  ctaLabel?: string;
  objectPosition?: string;
};

export default function Hero({
  title = "Galería del Artista",
  subtitle = "Obras pictoplasma en paletas pastel — minimal y contemporáneo.",
  imageSrc = "/hero/placeholder.jpg",
  heightVh = 85,
  ctaHref = "/galeria",
  ctaLabel = "Explorar galería",
  objectPosition = "center center",
}: HeroProps) {
  const rootRef = useRef<HTMLElement | null>(null);
  const prefersReduced = useReducedMotion();

  // Parallax Logic
  const { scrollYProgress } = useScroll({
    target: rootRef,
    offset: ["start start", "end start"],
  });

  const springConfig = { stiffness: 300, damping: 30, bounce: 0 };
  const scrollSpring = useSpring(scrollYProgress, springConfig);

  const y = useTransform(scrollSpring, [0, 1], ["0%", "30%"]);
  const scale = useTransform(scrollSpring, [0, 1], [1.05, 1.15]);
  const opacity = useTransform(scrollSpring, [0, 0.8], [1, 0]);

  // Text Reveal Variants
  const containerVariants: Variants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
        delayChildren: 0.2,
      },
    },
  };

  const itemVariants: Variants = {
    hidden: { y: 20, opacity: 0, filter: "blur(10px)" },
    visible: {
      y: 0,
      opacity: 1,
      filter: "blur(0px)",
      transition: {
        type: "spring",
        stiffness: 100,
        damping: 20,
      },
    },
  };

  return (
    <section
      ref={rootRef}
      className={`relative w-full flex items-center justify-center overflow-hidden`}
      style={{ height: `${heightVh}vh` }}
    >
      {/* Background Layer */}
      <motion.div
        className="absolute inset-0 z-0"
        style={prefersReduced ? {} : { y, scale }}
      >
        <Image
          src={imageSrc}
          alt="Hero background"
          fill
          priority
          sizes="100vw"
          className="object-cover"
          style={{ objectPosition }}
        />
        {/* Cinematic Vignette */}
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-transparent opacity-80" />
        <div className="absolute inset-0 bg-gradient-to-r from-black/50 via-transparent to-black/50 opacity-60" />
      </motion.div>

      {/* Content Layer */}
      <div className="container-padded relative z-10 w-full">
        <motion.div
          variants={containerVariants}
          initial="hidden"
          animate="visible"
          className="max-w-4xl mx-auto text-center flex flex-col items-center gap-6"
        >
          {/* Eyebrow / Tag */}
          <motion.div
            variants={itemVariants}
            className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-white/20 bg-white/10 backdrop-blur-md"
          >
            <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
            <span className="text-xs font-medium tracking-widest uppercase text-white/90">
              Colección 2026
            </span>
          </motion.div>

          {/* Main Title */}
          <motion.h1
            variants={itemVariants}
            className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight text-white drop-shadow-lg text-balance"
          >
            {title}
          </motion.h1>

          {/* Subtitle */}
          <motion.p
            variants={itemVariants}
            className="text-lg md:text-xl text-white/80 max-w-2xl leading-relaxed text-pretty drop-shadow-md"
          >
            {subtitle}
          </motion.p>

          {/* CTA Buttons */}
          <motion.div
            variants={itemVariants}
            className="flex flex-col sm:flex-row items-center gap-4 mt-4"
          >
            <Link
              href={ctaHref}
              className="group relative inline-flex items-center justify-center gap-2 px-8 py-4 font-semibold text-zinc-900 bg-white rounded-full transition-all duration-300 hover:scale-105 hover:bg-white/90 focus:outline-none focus:ring-2 focus:ring-white/50"
            >
              <span>{ctaLabel}</span>
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>

            <Link
              href="/artista"
              className="inline-flex items-center justify-center px-8 py-4 font-semibold text-white transition-all duration-300 rounded-full hover:bg-white/10 focus:outline-none"
            >
              Sobre el Artista
            </Link>
          </motion.div>
        </motion.div>
      </div>

      {/* Scroll Indicator */}
      <motion.div
        style={{ opacity }}
        animate={{ y: [0, 10, 0] }}
        transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 text-white/50"
      >
        <span className="text-[10px] uppercase tracking-widest">Descubre</span>
        <div className="w-[1px] h-12 bg-gradient-to-b from-white/0 via-white/50 to-white/0" />
      </motion.div>
    </section>
  );
}
