import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Instagram, Mail, ExternalLink } from "lucide-react";

export default function ArtistaPage() {
  return (
    <main className="min-h-screen">
      {/* HERO con background */}
      <section
        className="relative min-h-[60vh] flex items-center"
        style={{ paddingTop: "calc(56px + env(safe-area-inset-top))" }}
      >
        {/* Imagen de fondo */}
        <Image
          src="/artista/hero-bg.jpg" // coloca la imagen en /public/artista/hero-bg.jpg
          alt="Fondo del artista!"
          fill
          className="object-cover object-center"
          priority
        />

        {/* Overlay para contraste */}
        <div className="absolute inset-0 bg-black/40" />

        {/* Contenido */}
        <div className="relative container-wide py-12 md:py-16">
          <div className="grid items-center gap-8 md:grid-cols-12">
            {/* Avatar */}
            <div className="md:col-span-4 flex justify-center md:justify-start">
              <div className="relative h-40 w-40 md:h-56 md:w-56 rounded-full overflow-hidden shadow-[var(--shadow-lift)] ring-2 ring-white/80">
                <Image
                  src="/artista/avatar.jpg"
                  alt="Retrato del artista"
                  fill
                  className="object-cover"
                  sizes="(min-width:1024px) 224px, 160px"
                  priority
                />
              </div>
            </div>

            {/* Texto */}
            <div className="md:col-span-8 text-white">
              <div className="eyebrow">Sobre el artista</div>
              <h1 className="h1 mt-2 not-last:*:">Rodrigo Aguilar</h1>
              <p className="mt-3 max-w-2xl text-[clamp(1rem,1.6vw,1.125rem)] opacity-90">
                Pintor contemporáneo enfocado en formas orgánicas y paletas pastel. Su obra
                explora la emoción a través de la simplicidad y el ritmo visual.
              </p>

              <div className="mt-5 flex flex-wrap items-center gap-3">
                <Link href="/galeria">
                  <Button size="lg" className="btn-accent rounded-full px-6">
                    Ver galería
                  </Button>
                </Link>

                <Link
                  href="https://instagram.com/"
                  className="inline-flex items-center gap-2 rounded-full px-4 py-2 border border-white/20 bg-white/10 hover:bg-white/20 transition text-white"
                  target="_blank"
                >
                  <Instagram className="h-4 w-4" /> Instagram
                </Link>

                <Link
                  href="mailto:contacto@artista.com"
                  className="inline-flex items-center gap-2 rounded-full px-4 py-2 border border-white/20 bg-white/10 hover:bg-white/20 transition text-white"
                >
                  <Mail className="h-4 w-4" /> Contacto
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* BIO + DESTACADOS */}
      <section className="container-padded py-12 md:py-16">
        <div className="grid gap-10 lg:grid-cols-12">
          {/* BIO */}
          <article className="lg:col-span-5">
            <h2 className="h2">Acerca del artista</h2>
            <p className="mt-4 text-[color:var(--muted)] leading-relaxed">
              Nacido en Ciudad X (1990), su práctica se centra en la observación minuciosa
              de formas simples, traducidas en composiciones con capas sutiles y un uso
              cromático delicado. Ha expuesto en galerías de Europa y América Latina, y su
              trabajo forma parte de colecciones privadas.
            </p>

            <ul className="mt-6 space-y-3">
              <li className="flex gap-2">
                <span className="mt-2 h-2 w-2 rounded-full" style={{ background: "var(--mint)" }} />
                Exploración de ritmo y repetición en superficies planas.
              </li>
              <li className="flex gap-2">
                <span className="mt-2 h-2 w-2 rounded-full" style={{ background: "var(--lavender)" }} />
                Diálogo entre orgánico y geométrico.
              </li>
              <li className="flex gap-2">
                <span className="mt-2 h-2 w-2 rounded-full" style={{ background: "var(--peach)" }} />
                Atención al detalle y técnica mixta.
              </li>
            </ul>

            <div className="mt-7">
              <Link href="/galeria" className="inline-flex items-center gap-2">
                <span className="underline underline-offset-4">Explorar obras</span>
                <ExternalLink className="h-4 w-4" />
              </Link>
            </div>
          </article>

          {/* DESTACADOS */}
          <div className="lg:col-span-7">
            <h3 className="text-lg md:text-xl font-semibold tracking-tight mb-4">Series destacadas</h3>

            <div className="grid gap-6 sm:grid-cols-2">
              {SERIES.map((s) => (
                <article key={s.title} className="frame-gradient">
                  <div className="frame-surface rounded-[20px] overflow-hidden">
                    <div className="relative aspect-[4/3]">
                      <Image
                        src={s.imageSrc}
                        alt={s.imageAlt}
                        fill
                        className="object-cover"
                        sizes="(min-width:768px) 50vw, 100vw"
                      />
                    </div>
                    <div className="p-4">
                      <h4 className="font-semibold">{s.title}</h4>
                      <p className="text-sm opacity-80 mt-1">{s.text}</p>
                    </div>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* TIMELINE */}
      <section className="container-padded py-12 md:py-16">
        <h3 className="text-lg md:text-xl font-bold tracking-tight mb-6">Exposiciones y premios</h3>
        <div className="grid gap-8 md:grid-cols-2">
          <ul className="relative pl-5">
            <div className="absolute left-0 top-1 bottom-1 w-px bg-black/10" />
            <li className="mb-5">
              <div className="flex items-center gap-3">
                <span className="h-2 w-2 rounded-full bg-black/40" />
                <span className="text-sm text-[color:var(--muted)]">2025</span>
              </div>
              <p className="mt-2 font-medium">Pictoplasma Showcase — Berlín</p>
              <p className="text-[color:var(--muted)]">Obra seleccionada en exhibición colectiva.</p>
            </li>
            <li className="mb-5">
              <div className="flex items-center gap-3">
                <span className="h-2 w-2 rounded-full bg-black/40" />
                <span className="text-sm text-[color:var(--muted)]">2024</span>
              </div>
              <p className="mt-2 font-medium">Galería Núcleo — CDMX</p>
              <p className="text-[color:var(--muted)]">Primera individual “Formas que respiran”.</p>
            </li>
          </ul>

          <ul className="relative pl-5">
            <div className="absolute left-0 top-1 bottom-1 w-px bg-black/10" />
            <li className="mb-5">
              <div className="flex items-center gap-3">
                <span className="h-2 w-2 rounded-full bg-black/40" />
                <span className="text-sm text-[color:var(--muted)]">2023</span>
              </div>
              <p className="mt-2 font-medium">Bienal Joven — Finalista</p>
              <p className="text-[color:var(--muted)]">Selección de 3 piezas de la serie orgánica.</p>
            </li>
            <li className="mb-5">
              <div className="flex items-center gap-3">
                <span className="h-2 w-2 rounded-full bg-black/40" />
                <span className="text-sm text-[color:var(--muted)]">2022</span>
              </div>
              <p className="mt-2 font-medium">Residencia Monte — Patagonia</p>
              <p className="text-[color:var(--muted)]">Investigación de color en paisaje.</p>
            </li>
          </ul>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="container-padded pb-16">
        <div className="card-surface rounded-2xl p-6 md:p-8 flex flex-col md:flex-row items-center justify-between gap-6">
          <div>
            <h4 className="text-lg md:text-xl font-semibold tracking-tight">¿Quieres una pieza o colaboración?</h4>
            <p className="text-[color:var(--muted)]">
              Escríbeme para comisiones, exposiciones o licencias.
            </p>
          </div>
          <div className="flex gap-3">
            <Link href="mailto:contacto@artista.com">
              <Button className="btn-accent rounded-full">Contactar</Button>
            </Link>
            <Link href="/galeria">
              <Button variant="outline" className="btn-ghost">Ver catálogo</Button>
            </Link>
          </div>
        </div>
      </section>
    </main>
  );
}

/* ===== Data demo para las series ===== */
const SERIES = [
  {
    title: "Serie Orgánica",
    text: "Formas suaves con volumen y gesto contenido.",
    imageSrc: "/art/serie-organica.jpg",
    imageAlt: "Serie Orgánica",
  },
  {
    title: "Minimal Futurista",
    text: "Espacios limpios y acentos menta.",
    imageSrc: "/art/minimal-futurista.jpg",
    imageAlt: "Minimal Futurista",
  },
  {
    title: "Geometría Lúdica",
    text: "Composición simple y ritmo lúdico.",
    imageSrc: "/art/geometria-ludica.jpg",
    imageAlt: "Geometría Lúdica",
  },
  {
    title: "Pastel Dreams",
    text: "Gradientes suaves y calma visual.",
    imageSrc: "/art/pastel-dreams.jpg",
    imageAlt: "Pastel Dreams",
  },
] as const;
