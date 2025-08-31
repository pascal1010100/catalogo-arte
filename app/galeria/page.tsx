"use client";

import { GalleryVerticalEnd, SlidersHorizontal } from "lucide-react";
import ArtworkCard from "@/components/ui/ArtworkCard";
import ArtworkModal, { type ModalArtwork } from "@/components/galeria/ArtworkModal";
import { useCart } from "@/stores/cart";

import { useMemo } from "react";
import { usePathname, useRouter, useSearchParams } from "next/navigation";

/* ========= Tipos y datos ========= */
type Obra = {
  id: string;
  title: string;
  meta?: string;       // ej: "Óleo — 2024"
  imageSrc: string;
  chip?: string;
  href?: string;
  price: number;
};

const OBRAS: Obra[] = [
  { id: "obra-1", title: "Luz en Silencio",   meta: "Óleo — 2024",    imageSrc: "/images/obra-1.jpg", chip: "Nueva",   price: 450 },
  { id: "obra-2", title: "Memoria de Agua",   meta: "Acrílico — 2023", imageSrc: "/images/obra-2.jpg",                 price: 380 },
  { id: "obra-3", title: "Campos Invisibles", meta: "Mixta — 2022",   imageSrc: "/images/obra-3.jpg", chip: "Serie X", price: 520 },
  { id: "obra-4", title: "Solsticio",         meta: "Óleo — 2024",    imageSrc: "/images/obra-4.jpg",                 price: 410 },
  { id: "obra-5", title: "Retícula",          meta: "Tinta — 2023",   imageSrc: "/images/obra-5.jpg",                 price: 260 },
  { id: "obra-6", title: "Umbral",            meta: "Mixta — 2022",   imageSrc: "/images/obra-6.jpg",                 price: 300 },
];

const FILTROS = ["Todas", "Óleo", "Acrílico", "Mixta", "Tinta"];
const ACTIVO = "Todas";

/* ========= Helpers ========= */
function toModalArtwork(o?: Obra | null): ModalArtwork | null {
  if (!o) return null;
  // meta: "Medio — Año"
  const [mediumRaw, yearRaw] = (o.meta ?? "").split("—").map(s => s?.trim());
  const yearParsed = yearRaw ? Number(yearRaw) || yearRaw : undefined;
  return {
    id: o.id,
    title: o.title,
    images: [o.imageSrc],     // si luego tienes varias, pásalas aquí
    medium: mediumRaw,
    year: yearParsed,
    price: o.price,
    availability: "available",
  };
}

/* ========= Subcomponentes locales ========= */
function SectionHeader() {
  return (
    <header className="mb-8">
      <span className="inline-flex items-center gap-2 text-[11px] uppercase tracking-[0.18em] opacity-70">
        <GalleryVerticalEnd className="size-4" />
        Galería de obras
      </span>
      <h1 className="mt-3 text-4xl md:text-5xl font-semibold leading-tight">
        Explora la colección
      </h1>
      <p className="mt-3 text-sm opacity-70 max-w-2xl">
        Selección curada de piezas recientes y series anteriores. Diseño claro,
        legible y coherente con el resto de la app.
      </p>
    </header>
  );
}

function Toolbar() {
  return (
    <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
      <ul className="flex flex-wrap gap-2">
        {FILTROS.map((f) => {
          const active = f === ACTIVO;
          return (
            <li key={f}>
              <button
                type="button"
                className={[
                  "rounded-full px-3 py-1.5 text-xs transition",
                  active
                    ? "border border-black/15 bg-black/[0.04]"
                    : "border border-black/10 hover:border-black/15"
                ].join(" ")}
              >
                {f}
              </button>
            </li>
          );
        })}
      </ul>

      <button
        type="button"
        className="inline-flex items-center gap-2 rounded-full border border-black/10 px-3 py-1.5 text-xs hover:border-black/15 transition"
      >
        <SlidersHorizontal className="size-4" />
        Ordenar / Vista
      </button>
    </div>
  );
}

/* ========= Página ========= */
export default function GaleriaPage() {
  const add = useCart((s) => s.add);

  // Router y query
  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // 1) Leemos el slug desde la URL: /galeria?obra=obra-3
  const slug = searchParams.get("obra");

  // 2) Buscamos la obra correspondiente
  const selected = useMemo(
    () => OBRAS.find((o) => o.id === slug) ?? null,
    [slug]
  );

  // 3) Convertimos al formato del modal
  const modalArtwork = useMemo(() => toModalArtwork(selected), [selected]);

  // 4) El modal está "open" si hay slug en la URL
  const open = Boolean(slug);

  // 5) onOpenChange: al cerrar -> quitamos ?obra de la URL (sin recargar)
  const setOpen = (next: boolean) => {
    if (next) return; // abrir se hace navegando a ?obra=...
    const params = new URLSearchParams(searchParams);
    params.delete("obra");
    const qs = params.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  };

  return (
    <main className="relative min-h-[70vh]">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <SectionHeader />
        <Toolbar />

        <section>
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {OBRAS.map((obra) => (
              <li key={obra.id}>
                <ArtworkCard
                  title={obra.title}
                  meta={obra.meta}
                  imageSrc={obra.imageSrc}
                  chip={obra.chip}
                  // 6) Deep-link: al hacer click en la imagen abre el modal de esa obra
                  href={`?obra=${obra.id}`}
                  className="card-surface card-hover"
                  /* carrito */
                  priceUsd={obra.price}
                  addLabel="Agregar"
                  onAdd={() =>
                    add(
                      {
                        id: obra.id,
                        name: obra.title,
                        price: obra.price,
                        imageUrl: obra.imageSrc,
                      },
                      1
                    )
                  }
                />
              </li>
            ))}
          </ul>
        </section>

        <div className="mt-10 text-center text-xs opacity-60">
          Más series y colecciones se publicarán próximamente.
        </div>
      </div>

      {/* Modal conectado a la URL */}
      <ArtworkModal
        open={open}
        onOpenChange={setOpen}
        artwork={modalArtwork ?? undefined}
        currency="GTQ"
      />
    </main>
  );
}
