"use client";

import Link from "next/link";
import Hero from "@/components/Hero";
import CardSerie from "@/components/cards/CardSerie";
import CardBio from "@/components/cards/CardBio";
import CardContacto from "@/components/cards/CardContacto";
import { motion } from "framer-motion";

export default function HomePage() {
  const sectionVariants = {
    hidden: { opacity: 0, y: 40 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.8, ease: [0.22, 1, 0.36, 1] as const }
    }
  };

  return (
    <main className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <Hero
        title="Galería del Artista"
        subtitle="Obras pictoplasma en paletas pastel — minimal y contemporáneo."
        heightVh={90}
      />

      {/* Intro Section */}
      <motion.section
        className="container-padded py-20 md:py-32"
        aria-labelledby="intro-heading"
        initial="hidden"
        whileInView="visible"
        viewport={{ once: true, margin: "-100px" }}
        variants={sectionVariants}
      >
        <header className="mb-10 max-w-3xl">
          <span className="text-sm font-semibold tracking-widest text-primary/60 uppercase mb-3 block">
            Bienvenido
          </span>
          <h2 id="intro-heading" className="text-4xl md:text-5xl font-bold text-foreground mb-6 text-balance">
            Explora las dimensiones del color y la forma.
          </h2>
          <p className="text-lg text-muted-foreground leading-relaxed text-pretty">
            Catálogo curado con obras recientes, series en proceso y una mirada íntima al estudio del artista.
            Cada pieza es una exploración de la luz y la emoción.
          </p>
        </header>

        {/* Action Buttons */}
        <div className="flex flex-wrap gap-4">
          <Link
            href="/galeria"
            className="btn-accent rounded-full px-6 py-3 font-medium transition-transform active:scale-95"
          >
            Ver Galería
          </Link>

          <Link
            href="/artista"
            className="inline-flex items-center justify-center rounded-full px-6 py-3 font-medium border border-border text-foreground hover:bg-secondary transition-colors"
          >
            Sobre el Artista
          </Link>
        </div>
      </motion.section>

      {/* Featured Cards Section */}
      <section
        className="container-padded pb-24"
        aria-labelledby="quicklinks-heading"
      >
        <h2 id="quicklinks-heading" className="sr-only">Accesos rápidos</h2>

        <div className="grid gap-6 md:gap-8 sm:grid-cols-2 lg:grid-cols-3">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.1, duration: 0.5 }}
          >
            <CardSerie />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.2, duration: 0.5 }}
          >
            <CardBio />
          </motion.div>

          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3, duration: 0.5 }}
          >
            <CardContacto />
          </motion.div>
        </div>
      </section>
    </main>
  );
}
