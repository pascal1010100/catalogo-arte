"use client";

import { useState } from "react";
import { GalleryVerticalEnd, SlidersHorizontal } from "lucide-react";
import ArtworkCard from "@/components/ui/ArtworkCard";
import ArtworkModal, { type ModalArtwork } from "@/components/galeria/ArtworkModal";
import { useCart } from "@/stores/cart";

/* ========= Tipos y datos ========= */
type Obra = {
  id: string;
  title: string;
  meta?: string;        // Ej: "Óleo — 2024"
  imageSrc: string;
  chip?: string;
  href?: string;
  price: number;
};

const OBRAS: Obra[] = [
  { id: "obra-1", title: "Luz en Silencio",   meta: "Óleo — 2024",    imageSrc: "/images/obra-1.jpg", chip: "Nueva",   price: 450 },
  { id: "obra-2", title: "Memoria de Agua",   meta: "Acrílico — 2023", imageSrc: "/images/obra-2.jpg",                 price: 380 },
  { id: "obra-3", title: "Campos Invisibles", meta: "Mixta — 2022",   imageSrc: "/images/obra-3.jpg", chip: "Serie X", price: 520 },
  { id: "obra-4", title: "Solsticio",         meta: "Óleo — 2024",    imageSrc: "/images/obra-4.jpg",                  price: 410 },
  { id: "obra-5", title: "Retícula",          meta: "Tinta — 2023",   imageSrc: "/images/obra-5.jpg",                  price: 260 },
  { id: "obra-6", title: "Umbral",            meta: "Mixta — 2022",   imageSrc: "/images/obra-6.jpg",                  price: 300 },
];

const FILTROS = ["Todas", "Óleo", "Acrílico", "Mixta", "Tinta"];
const ACTIVO = "Todas";

/* ========= Helpers ========= */
function parseMeta(meta?: string) {
  // "Óleo — 2024" -> { medium: "Óleo", year: "2024" }
  if (!meta) return { medium: undefined as string | undefined, year: undefined as string | number | undefined };
  const parts = meta.split("—").map((s) => s.trim());
  const medium = parts[0] || undefined;
  const year = parts[1] || undefined;
  return { medium, year };
}

function toModalArtwork(obra: Obra): ModalArtwork {
  const { medium, year } = parseMeta(obra.meta);
  return {
    id: obra.id,
    slug: obra.id,
    title: obra.title,
    year,
    medium,
    size: undefined,
    price: obra.price,
    availability: "available",
    images: [obra.imageSrc],
    description: undefined,
    series: undefined,
    tags: undefined,
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
      <h1 className="mt-3 text-4xl md:text-5xl font-semibold leading-tight">Explora la colección</h1>
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
                  active ? "border border-black/15 bg-black/[0.04]" : "border border-black/10 hover:border-black/15",
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

  // Estado del modal
  const [open, setOpen] = useState(false);
  const [selected, setSelected] = useState<ModalArtwork | null>(null);

  function handleOpen(obra: Obra) {
    setSelected(toModalArtwork(obra));
    setOpen(true);
  }

  function onAddToCart(art: ModalArtwork) {
    add(
      {
        id: art.id,
        name: art.title,
        price: art.price ?? 0,
        imageUrl: art.images?.[0] ?? "",
      },
      1
    );
  }

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
                  href={obra.href ?? "#"}
                  className="card-surface card-hover"
                  /* carrito directo desde la card (como ya lo tenías) */
                  priceUsd={obra.price}
                  addLabel="Agregar"
                  onAdd={() =>
                    add(
                      { id: obra.id, name: obra.title, price: obra.price, imageUrl: obra.imageSrc },
                      1
                    )
                  }
                  /* botón para abrir modal */
                  viewLabel="Ver más"
                  onView={() => handleOpen(obra)}
                />
              </li>
            ))}
          </ul>
        </section>

        <div className="mt-10 text-center text-xs opacity-60">
          Más series y colecciones se publicarán próximamente.
        </div>
      </div>

      {/* Modal conectado */}
      <ArtworkModal
        open={open}
        onOpenChange={setOpen}
        artwork={selected ?? undefined}
        onAddToCart={onAddToCart}
        currency="GTQ"
        // whatsappPhoneE164="5025XXXXXXX"
      />
    </main>
  );
}
