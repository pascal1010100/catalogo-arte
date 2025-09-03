import Link from "next/link";
import Hero from "@/components/Hero";
import CardSerie from "@/components/cards/CardSerie";
import CardBio from "@/components/cards/CardBio";
import CardContacto from "@/components/cards/CardContacto";

export default function HomePage() {
  return (
    <main>
      {/* Hero */}
      <Hero
        title="Galería del Artista"
        subtitle="Obras pictoplasma en paletas pastel — minimal y contemporáneo."
        heightVh={70}
      />

      {/* Introducción breve */}
      <section className="container-padded py-12" aria-labelledby="intro-heading">
        <header className="mb-6">
          <div className="eyebrow">Bienvenido</div>
          <h2 id="intro-heading" className="h2 mt-2">Explora y descubre</h2>
          <p className="mt-2 opacity-80 max-w-2xl">
            Catálogo curado con obras recientes, series en proceso y una mirada clara al proceso del artista.
          </p>
        </header>

        {/* Acciones */}
        <div className="flex flex-wrap gap-3">
          {/* Primario sólido (morado) */}
          <Link href="/galeria" className="btn btn-accent">
            Ver Galería
          </Link>

          {/* Secundario outlined morado (espejo del anterior) */}
          <Link
            href="/artista"
            className="
              inline-flex items-center justify-center rounded-full px-5 py-2.5 font-semibold
              border-2 border-[color:var(--accent)] text-[color:var(--accent)]
              hover:bg-[color:var(--accent)]/10
              focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-[color:var(--accent)]/35
              transition
            "
          >
            Sobre el Artista
          </Link>
        </div>
      </section>

      {/* Accesos rápidos con imagen de fondo */}
      <section className="container-padded pb-16" aria-labelledby="quicklinks-heading">
        <h2 id="quicklinks-heading" className="sr-only">Accesos rápidos</h2>
        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <CardSerie />
          <CardBio />
          <CardContacto />
        </div>
      </section>
    </main>
  );
}
