"use client";

import { Suspense, useMemo } from "react";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams, ReadonlyURLSearchParams } from "next/navigation";
import { GalleryVerticalEnd, SlidersHorizontal, ArrowDownAZ, ArrowUpAZ, Clock, Gem } from "lucide-react";
import ArtworkCard from "@/components/ui/ArtworkCard";
import ArtworkModal, { type ModalArtwork } from "@/components/galeria/ArtworkModal"; // Assuming this exists or I'll leave it
import { useCart } from "@/stores/cart";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { motion } from "framer-motion";

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
  { id: "obra-1", title: "Luz en Silencio", meta: "Óleo — 2024", imageSrc: "/images/obra-1.jpg", chip: "Nueva", price: 450 },
  { id: "obra-2", title: "Memoria de Agua", meta: "Acrílico — 2023", imageSrc: "/images/obra-2.jpg", price: 380 },
  { id: "obra-3", title: "Campos Invisibles", meta: "Mixta — 2022", imageSrc: "/images/obra-3.jpg", chip: "Serie X", price: 520 },
  { id: "obra-4", title: "Solsticio", meta: "Óleo — 2024", imageSrc: "/images/obra-4.jpg", price: 410 },
  { id: "obra-5", title: "Retícula", meta: "Tinta — 2023", imageSrc: "/images/obra-5.jpg", price: 260 },
  { id: "obra-6", title: "Umbral", meta: "Mixta — 2022", imageSrc: "/images/obra-6.jpg", price: 300 },
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
    <header className="mb-12 text-center md:text-left">
      <Badge variant="outline" className="mb-4">
        <GalleryVerticalEnd className="mr-2 size-3" />
        Colección 2024-2025
      </Badge>
      <h1 className="text-4xl md:text-6xl font-black tracking-tight mb-4">
        Galería de Obras
      </h1>
      <p className="text-muted-foreground text-lg max-w-2xl text-balance">
        Explora una selección curada de piezas únicas. Cada obra es un testimonio de la búsqueda entre lo orgánico y lo digital.
      </p>
    </header>
  );
}

/* ========= UI: Toolbar (filtros + orden) ========= */
type ToolbarProps = {
  medio: string;
  orden: string;
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
    const p = new URLSearchParams(searchParams.toString());
    p.set("medio", nextMedio);
    p.set("orden", nextOrden);
    p.delete("obra");
    const qs = p.toString();
    return qs ? `${pathname}?${qs}` : pathname;
  };

  return (
    <div className="mb-8 flex flex-col md:flex-row items-center justify-between gap-4 p-4 rounded-2xl border border-border bg-card/50 backdrop-blur-sm sticky top-20 z-10 shadow-sm">
      <div className="flex flex-wrap justify-center gap-2">
        {filtros.map((f) => {
          const active = f.value === medio;
          return (
            <Link
              key={f.value}
              href={mkHref(f.value, orden)}
              scroll={false}
            >
              <Button
                variant={active ? "default" : "ghost"}
                size="sm"
                className="rounded-full h-8 px-4"
              >
                {f.label}
              </Button>
            </Link>
          );
        })}
      </div>

      <div className="flex items-center gap-3 pl-4 border-l border-border/50">
        <span className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">Ordenar</span>
        <select
          className="bg-transparent text-sm font-medium outline-none cursor-pointer hover:text-primary transition-colors"
          value={orden}
          onChange={(e) => {
            const href = mkHref(medio, e.target.value);
            router.replace(href, { scroll: false });
          }}
        >
          <option value="recientes">Más recientes</option>
          <option value="anio-desc">Por Año (Nuevo → Viejo)</option>
          <option value="anio-asc">Por Año (Viejo → Nuevo)</option>
          <option value="precio-desc">Precio (Mayor → Menor)</option>
          <option value="precio-asc">Precio (Menor → Mayor)</option>
        </select>
      </div>
    </div>
  );
}

/* ========= Página (shell) ========= */
export default function GaleriaPage() {
  return (
    <Suspense fallback={<div className="container-padded py-20 text-center">Cargando galería...</div>}>
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

  // params de URL
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
        case "precio-asc": return a.price - b.price;
        case "precio-desc": return b.price - a.price;
        case "anio-asc": return ya - yb;
        case "anio-desc":
        case "recientes":
        default: return yb - ya;
      }
    });

    return arr;
  }, [medio, orden]);

  // obra seleccionada (modal)
  const selected = useMemo(() => OBRAS.find((o) => o.id === slug) ?? null, [slug]);
  const modalArtwork = useMemo(() => toModalArtwork(selected), [selected]);
  const open = Boolean(slug);

  const setOpen = (next: boolean) => {
    if (next) return;
    const p = new URLSearchParams(searchParams.toString());
    p.delete("obra");
    const qs = p.toString();
    router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
  };

  const addParamsToHref = (obraId: string) => {
    const p = new URLSearchParams(searchParams.toString());
    p.set("obra", obraId);
    const qs = p.toString();
    return qs ? `${pathname}?${qs}` : pathname;
  };

  return (
    <main className="min-h-screen pb-20 pt-20">
      <div className="container-padded md:max-w-7xl mx-auto">
        <SectionHeader />

        <Toolbar
          medio={medio}
          orden={orden}
          pathname={pathname}
          searchParams={searchParams}
        />

        <section>
          {obrasFiltradasOrdenadas.length === 0 ? (
            <div className="py-20 text-center text-muted-foreground">
              <p>No se encontraron obras con estos filtros.</p>
              <Button
                variant="link"
                onClick={() => router.replace(pathname, { scroll: false })}
              >
                Limpiar filtros
              </Button>
            </div>
          ) : (
            <motion.ul
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ staggerChildren: 0.05 }}
              className="grid gap-8 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
            >
              {obrasFiltradasOrdenadas.map((obra) => (
                <motion.li
                  key={obra.id}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                >
                  <ArtworkCard
                    title={obra.title}
                    meta={obra.meta}
                    imageSrc={obra.imageSrc}
                    chip={obra.chip}
                    href={addParamsToHref(obra.id)}
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
                </motion.li>
              ))}
            </motion.ul>
          )}
        </section>

        <div className="mt-20 text-center">
          <p className="text-sm text-muted-foreground/60">
            © 2025 Catálogo de Arte. Todas las obras son propiedad del artista.
          </p>
        </div>
      </div>

      <ArtworkModal
        open={open}
        onOpenChange={setOpen}
        artwork={modalArtwork ?? undefined}
        currency="GTQ"
        onAddToCart={(art) => {
          add(
            {
              id: art.id,
              name: art.title,
              price: Number(art.price ?? 0),
              imageUrl: art.images?.[0] ?? "/images/placeholder.jpg",
            },
            1
          );
        }}
      />
    </main>
  );
}
