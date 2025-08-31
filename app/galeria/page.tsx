"use client";

import { Suspense, useMemo } from "react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams, ReadonlyURLSearchParams } from "next/navigation";
import { GalleryVerticalEnd, SlidersHorizontal } from "lucide-react";
import ArtworkCard from "@/components/ui/ArtworkCard";
import ArtworkModal, { type ModalArtwork } from "@/components/galeria/ArtworkModal";
import { useCart } from "@/stores/cart";

/* ========= Tipos y datos ========= */
type Obra = {
  id: string;
  title: string;
  meta?: string;       // "Óleo — 2024"
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

/* ========= Utils ========= */
function normalize(value: string): string {
  return value
    .normalize("NFD")
    .replace(/\p{Diacritic}/gu, "")
    .toLowerCase()
    .trim();
}

function mediumOf(o: Obra) {
  const left = (o.meta ?? "").split("—")[0]?.trim() ?? "";
  return normalize(left); // "oleo", "acrilico", "mixta", "tinta"
}

function yearOf(o: Obra) {
  const right = (o.meta ?? "").split("—")[1]?.trim();
  const y = right ? Number(right) : NaN;
  return Number.isFinite(y) ? y : undefined;
}

function toModalArtwork(o?: Obra | null): ModalArtwork | null {
  if (!o) return null;
  const [mediumRaw] = (o.meta ?? "").split("—").map((s) => s?.trim());
  return {
    id: o.id,
    title: o.title,
    images: [o.imageSrc],
    medium: mediumRaw,
    year: yearOf(o),
    price: o.price,
    availability: "available",
  };
}

/* ========= UI: Header ========= */
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

/* ========= UI: Toolbar (filtros + orden) ========= */
type ToolbarProps = {
  medio: string;  // "todas" | "oleo" | "acrilico" | "mixta" | "tinta"
  orden: string;  // "recientes" | "precio-asc" | "precio-desc" | "anio-asc" | "anio-desc"
  pathname: string;
  searchParams: ReadonlyURLSearchParams;
};

function Toolbar({ medio, orden, pathname, searchParams }: ToolbarProps) {
  const router = useRouter();

  const filtros = [
    { label: "Todas", value: "todas" },
    { label: "Óleo", value: "oleo" },
    { label: "Acrílico", value: "acrilico" },
    { label: "Mixta", value: "mixta" },
    { label: "Tinta", value: "tinta" },
  ];

  const mkHref = (nextMedio: string, nextOrden: string) => {
    const p = new URLSearchParams(searchParams.toString()); // copia mutable
    p.set("medio", nextMedio);
    p.set("orden", nextOrden);
    p.delete("obra"); // evita dejar modal abierto de una obra de otro filtro
    const qs = p.toString();
    return qs ? `${pathname}?${qs}` : pathname;
  };

  return (
    <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
      <ul className="flex flex-wrap gap-2">
        {filtros.map((f) => {
          const active = f.value === medio;
          return (
            <li key={f.value}>
              <Link
                href={mkHref(f.value, orden)}
                scroll={false}
                className={[
                  "inline-block rounded-full px-3 py-1.5 text-xs transition",
                  active
                    ? "border border-black/15 bg-black/[0.04]"
                    : "border border-black/10 hover:border-black/15"
                ].join(" ")}
              >
                {f.label}
              </Link>
            </li>
          );
        })}
      </ul>

      <div className="inline-flex items-center gap-2 rounded-full border border-black/10 px-2.5 py-1.5 text-xs">
        <SlidersHorizontal className="size-4 opacity-70" />
        <label htmlFor="orden" className="opacity-70">Ordenar</label>
        <select
          id="orden"
          className="bg-transparent outline-none"
          value={orden}
          onChange={(e) => {
            const href = mkHref(medio, e.target.value);
            router.replace(href, { scroll: false });
          }}
        >
          <option value="recientes">Más recientes</option>
          <option value="anio-desc">Año ↓</option>
          <option value="anio-asc">Año ↑</option>
          <option value="precio-desc">Precio ↓</option>
          <option value="precio-asc">Precio ↑</option>
        </select>
      </div>
    </div>
  );
}

/* ========= Página (shell) ========= */
// Next 15: hooks de navegación dentro de <Suspense>
export default function GaleriaPage() {
  return (
    <Suspense fallback={<div className="container-padded py-12">Cargando…</div>}>
      <GaleriaInner />
    </Suspense>
  );
}

/* ========= Página (contenido real) ========= */
function GaleriaInner() {
  const add = useCart((s) => s.add);

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  // params de URL (bien tipados)
  const slug = searchParams.get("obra") ?? undefined;
  const medioRaw = searchParams.get("medio") ?? "todas";
  const medio = normalize(medioRaw);
  const ordenRaw = searchParams.get("orden") ?? "recientes";
  const orden = ordenRaw.toLowerCase();

  // dataset filtrado/ordenado
  const obrasFiltradasOrdenadas = useMemo(() => {
    let arr = [...OBRAS];

    if (medio !== "todas") {
      arr = arr.filter((o) => mediumOf(o) === medio);
    }

    arr.sort((a, b) => {
      const ya = yearOf(a) ?? 0;
      const yb = yearOf(b) ?? 0;
      switch (orden) {
        case "precio-asc":
          return a.price - b.price;
        case "precio-desc":
          return b.price - a.price;
        case "anio-asc":
          return ya - yb;
        case "anio-desc":
        case "recientes":
        default:
          return yb - ya;
      }
    });

    return arr;
  }, [medio, orden]);

  // obra seleccionada (modal)
  const selected = useMemo(() => OBRAS.find((o) => o.id === slug) ?? null, [slug]);
  const modalArtwork = useMemo(() => toModalArtwork(selected), [selected]);
  const open = Boolean(slug);

  // cerrar modal → eliminar ?obra, conservar medio/orden
  const setOpen = (next: boolean) => {
    if (next) return; // abrir se hace con Link (?obra=...)
    const p = new URLSearchParams(searchParams.toString());
    p.delete("obra");
    const qs = p.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  };

  // href que preserva medio/orden y setea obra
  const addParamsToHref = (obraId: string) => {
    const p = new URLSearchParams(searchParams.toString());
    p.set("obra", obraId);
    const qs = p.toString();
    return qs ? `${pathname}?${qs}` : pathname;
  };

  return (
    <main className="relative min-h-[70vh]">
      <div className="max-w-6xl mx-auto px-6 py-12">
        <SectionHeader />
        <Toolbar
          medio={medio}
          orden={orden}
          pathname={pathname}
          searchParams={searchParams}
        />

        <section>
          <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {obrasFiltradasOrdenadas.map((obra) => (
              <li key={obra.id}>
                <ArtworkCard
                  title={obra.title}
                  meta={obra.meta}
                  imageSrc={obra.imageSrc}
                  chip={obra.chip}
                  href={addParamsToHref(obra.id)}   // preserva medio/orden en el deep-link
                  className="card-surface card-hover"
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

      <ArtworkModal
        open={open}
        onOpenChange={setOpen}
        artwork={modalArtwork ?? undefined}
        currency="GTQ"
      />
    </main>
  );
}
