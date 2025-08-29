// app/page.tsx
import Link from "next/link";
import Hero from "@/components/Hero";

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

      {/* Accesos rápidos / bloques sin imagen (evitamos 404) */}
      <section className="container-padded pb-16">
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          <li className="card p-5">
            <h3 className="font-semibold">Series destacadas</h3>
            <p className="mt-1 text-sm opacity-80">
              Conoce las líneas de trabajo y colecciones recientes.
            </p>
            <Link href="/galeria" className="mt-3 inline-block underline underline-offset-4">
              Explorar series
            </Link>
          </li>

          <li className="card p-5">
            <h3 className="font-semibold">Biografía & statement</h3>
            <p className="mt-1 text-sm opacity-80">
              Contexto, influencias y enfoque de la obra.
            </p>
            <Link href="/artista" className="mt-3 inline-block underline underline-offset-4">
              Leer más
            </Link>
          </li>

          <li className="card p-5">
            <h3 className="font-semibold">Contacto & comisiones</h3>
            <p className="mt-1 text-sm opacity-80">
              Proyectos, colaboraciones y piezas a pedido.
            </p>
            <Link href="mailto:contacto@artista.com" className="mt-3 inline-block underline underline-offset-4">
              Escribir
            </Link>
          </li>
        </ul>
      </section>
    </main>
  );
}
