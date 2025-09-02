// app/page.tsx
import Link from "next/link";
import Hero from "@/components/Hero";
import CardSerie from "@/components/cards/CardSerie";
import CardBio from "@/components/cards/CardBio";
import CardContacto from "@/components/cards/CardContacto";

export default function HomePage() {
  return (
    <main>
      {/* Hero: dejamos la imagen por defecto; luego la cambiamos */}
      <Hero
        title="Galería del Artista"
        subtitle="Obras pictoplasma en paletas pastel — minimal y contemporáneo."
        heightVh={70}
      />

      {/* Introducción breve */}
      <section className="container-padded py-12">
        <header className="mb-6">
          <div className="eyebrow">Bienvenido</div>
          <h2 className="h2 mt-2">Explora y descubre</h2>
          <p className="mt-2 opacity-80 max-w-2xl">
            Catálogo curado con obras recientes, series en proceso y una mirada clara al proceso del artista.
          </p>
        </header>

        <div className="flex flex-wrap gap-3">
          <Link href="/galeria" className="btn btn-accent">Ver Galería</Link>
          <Link href="/artista" className="btn btn-ghost">Sobre el Artista</Link>
        </div>
      </section>

      {/* Accesos rápidos con imagen de fondo */}
      <section className="container-padded pb-16">
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <CardSerie />
          <CardBio />
          <CardContacto />
        </div>
      </section>
    </main>
  );
}
