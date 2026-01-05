"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { ArrowUpRight, Instagram, Mail } from "lucide-react";
import { motion } from "framer-motion";

export default function ArtistaPage() {
  const containerVariants = {
    hidden: { opacity: 0 },
    show: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    show: { y: 0, opacity: 1, transition: { type: "spring", stiffness: 50 } as const },
  };

  return (
    <main className="min-h-screen pb-20">
      {/* --- HERO SECTION --- */}
      <section className="relative h-[70vh] min-h-[600px] flex items-center justify-center overflow-hidden">
        {/* Background Image with Parallax-like fix */}
        <div className="absolute inset-0 z-0">
          <Image
            src="/artista/hero-bg.jpg"
            alt="Atelier del artista"
            fill
            priority
            className="object-cover"
            sizes="100vw"
          />
          {/* Gradient Overlay for Text Contrast */}
          <div className="absolute inset-0 bg-gradient-to-t from-background via-background/40 to-black/30" />
        </div>

        {/* Hero Content */}
        <div className="container-padded relative z-10 w-full pt-20">
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="show"
            className="flex flex-col md:flex-row items-end md:items-center gap-8 md:gap-12"
          >
            {/* Avatar / Profile Image */}
            <motion.div variants={itemVariants} className="relative shrink-0">
              <div className="relative h-40 w-40 md:h-64 md:w-64 rounded-full overflow-hidden ring-4 ring-background shadow-2xl">
                <Image
                  src="/artista/avatar.jpg"
                  alt="Rodrigo Aguilar"
                  fill
                  className="object-cover"
                  sizes="(min-width: 768px) 256px, 160px"
                />
              </div>
              <div className="absolute bottom-2 right-2 md:bottom-4 md:right-4">
                <Badge className="bg-green-500 hover:bg-green-600 text-white border-none shadow-lg px-3 py-1">
                  Open for commissions
                </Badge>
              </div>
            </motion.div>

            {/* Title & Bio Intro */}
            <div className="flex-1 text-white md:text-foreground">
              <motion.div variants={itemVariants}>
                <h1 className="text-5xl md:text-7xl font-black tracking-tighter text-white drop-shadow-sm">
                  Rodrigo Aguilar
                </h1>
              </motion.div>

              <motion.p
                variants={itemVariants}
                className="mt-4 text-lg md:text-2xl text-white/90 md:text-white/80 font-light max-w-2xl leading-relaxed text-balance drop-shadow-sm"
              >
                Artista visual explorando la intersección entre la <span className="font-semibold text-white">geometría sagrada</span> y
                las emociones orgánicas.
              </motion.p>

              <motion.div variants={itemVariants} className="mt-8 flex flex-wrap gap-4">
                <Button size="lg" className="rounded-full px-8 text-base">
                  Ver Galería
                  <ArrowUpRight className="ml-2 h-4 w-4" />
                </Button>
                <Button variant="outline" size="lg" className="rounded-full px-8 bg-white/10 border-white/20 text-white hover:bg-white/20 backdrop-blur-md">
                  Descargar CV
                </Button>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* --- STATEMENT & HIGHLIGHTS --- */}
      <section className="container-padded py-20">
        <div className="grid lg:grid-cols-12 gap-12 items-start">
          {/* Main Statement */}
          <div className="lg:col-span-7 space-y-8">
            <h2 className="text-3xl font-bold tracking-tight">Statement</h2>
            <div className="prose prose-lg dark:prose-invert text-muted-foreground leading-relaxed">
              <p>
                Mi trabajo nace de la observación minuciosa de los patrones naturales y su traducción
                a lenguajes visuales sintéticos. Busco el equilibrio entre el caos orgánico y
                el orden geométrico.
              </p>
              <p>
                Utilizando una paleta de colores desaturados y texturas táctiles, cada pieza invita
                a una contemplación silenciosa, funcionando como un refugio visual en la era del ruido digital.
              </p>
            </div>

            {/* Social Proof / Stats */}
            <div className="grid grid-cols-3 gap-6 pt-8 border-t border-border">
              <div>
                <div className="text-4xl font-bold">10+</div>
                <div className="text-sm text-muted-foreground uppercase tracking-wider mt-1">Años de trayectoria</div>
              </div>
              <div>
                <div className="text-4xl font-bold">15</div>
                <div className="text-sm text-muted-foreground uppercase tracking-wider mt-1">Exhibiciones</div>
              </div>
              <div>
                <div className="text-4xl font-bold">450+</div>
                <div className="text-sm text-muted-foreground uppercase tracking-wider mt-1">Obras vendidas</div>
              </div>
            </div>
          </div>

          {/* Connect / Info Card */}
          <div className="lg:col-span-5 relative">
            <div className="sticky top-24 p-8 rounded-3xl bg-secondary/50 backdrop-blur-sm border border-border/50">
              <h3 className="text-xl font-semibold mb-6">Conecta</h3>
              <div className="space-y-4">
                <a href="mailto:contacto@artista.com" className="flex items-center gap-4 p-4 rounded-xl bg-background hover:bg-accent/10 transition-colors group">
                  <div className="h-10 w-10 rounded-full bg-primary/10 flex items-center justify-center text-primary group-hover:scale-110 transition-transform">
                    <Mail className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="font-medium">Email</div>
                    <div className="text-sm text-muted-foreground">contacto@artista.com</div>
                  </div>
                </a>

                <a href="https://instagram.com" target="_blank" className="flex items-center gap-4 p-4 rounded-xl bg-background hover:bg-accent/10 transition-colors group">
                  <div className="h-10 w-10 rounded-full bg-pink-500/10 flex items-center justify-center text-pink-500 group-hover:scale-110 transition-transform">
                    <Instagram className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="font-medium">Instagram</div>
                    <div className="text-sm text-muted-foreground">@rodrigo_art</div>
                  </div>
                </a>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* --- TIMELINE SECTION (Redesigned) --- */}
      <section className="bg-secondary/20 py-20">
        <div className="container-padded">
          <div className="flex flex-col md:flex-row md:items-end justify-between mb-12 gap-4">
            <div>
              <h2 className="text-3xl font-bold tracking-tight">Trayectoria y Reconocimientos</h2>
              <p className="text-muted-foreground mt-2">Selección de exposiciones, premios y residencias.</p>
            </div>
            <Button variant="outline">Ver historial completo</Button>
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-2">
            <div className="space-y-8">
              <h3 className="font-semibold text-lg text-primary flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-primary" /> Exposiciones Recientes
              </h3>
              <div className="relative border-l border-border ml-1 pl-8 space-y-10">
                <ExperienceItem
                  year="2025"
                  title="Pictoplasma Showcase"
                  role="Obra Seleccionada"
                  location="Berlín, Alemania"
                />
                <ExperienceItem
                  year="2024"
                  title="Formas que Respiran"
                  role="Exhibición Individual"
                  location="Galería Núcleo, CDMX"
                />
              </div>
            </div>

            <div className="space-y-8">
              <h3 className="font-semibold text-lg text-primary flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-primary" /> Premios & Residencias
              </h3>
              <div className="relative border-l border-border ml-1 pl-8 space-y-10">
                <ExperienceItem
                  year="2023"
                  title="Bienal Joven"
                  role="Finalista"
                  location="Museo de Arte Moderno"
                />
                <ExperienceItem
                  year="2022"
                  title="Residencia Monte"
                  role="Artista Residente"
                  location="Patagonia, Argentina"
                />
              </div>
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}

function ExperienceItem({ year, title, role, location }: { year: string, title: string, role: string, location: string }) {
  return (
    <div className="relative">
      <span className="absolute -left-[37px] top-0 h-4 w-4 rounded-full border-2 border-background bg-primary ring-4 ring-background/50" />
      <div className="flex flex-col gap-1">
        <span className="text-xs font-bold tracking-widest text-muted-foreground/80">{year}</span>
        <h4 className="text-xl font-bold text-foreground">{title}</h4>
        <div className="flex items-center gap-2 text-sm">
          <span className="font-medium text-primary">{role}</span>
          <span className="text-muted-foreground">•</span>
          <span className="text-muted-foreground">{location}</span>
        </div>
      </div>
    </div>
  )
}
