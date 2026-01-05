// app/tienda/page.tsx
"use client";

import { useEffect, useMemo, useState } from "react";
import Image from "next/image";
import { useRouter } from "next/navigation";
import {
  motion,
  AnimatePresence,
  type Variants,
} from "framer-motion";
import {
  ShoppingCart,
  Search,
  SlidersHorizontal,
  Sparkles,
  X,
  Eye,
} from "lucide-react";

import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Badge } from "@/components/ui/badge";
import { Separator } from "@/components/ui/separator";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { cn } from "@/lib/utils";

/* ======================= Tipos ======================= */

type Categoria =
  | "Todos"
  | "Pines"
  | "Llaveros"
  | "Collares"
  | "Dijes"
  | "Tazas"
  | "Mantas"
  | "Posters"
  | "Stickers";

type Producto = {
  id: string;
  nombre: string;
  precio: number; // Q
  imagen: string;
  categoria: Categoria;
  destacado?: boolean;
  nuevo?: boolean;
};

type SortKey = "relevancia" | "precio-asc" | "precio-desc" | "nuevo";

/* ======================= Datos demo ======================= */

const CATEGORIAS: Categoria[] = [
  "Todos",
  "Pines",
  "Llaveros",
  "Collares",
  "Dijes",
  "Tazas",
  "Mantas",
  "Posters",
  "Stickers",
];

// Coloca tus assets en /public/productos/*
const CATALOGO: Producto[] = [
  {
    id: "p01",
    nombre: "Pin — Serie ‘Nocturna’",
    precio: 65,
    imagen: "/productos/pin-nocturna.jpg",
    categoria: "Pines",
    destacado: true,
    nuevo: true,
  },
  {
    id: "p02",
    nombre: "Llavero — ‘Ojo Alquímico’",
    precio: 55,
    imagen: "/productos/llavero-ojo.jpg",
    categoria: "Llaveros",
  },
  {
    id: "p03",
    nombre: "Collar — ‘Luna & Mar’",
    precio: 180,
    imagen: "/productos/collar-luna.jpg",
    categoria: "Collares",
    destacado: true,
  },
  {
    id: "p04",
    nombre: "Dije — ‘Ave Dorada’",
    precio: 150,
    imagen: "/productos/dije-ave.jpg",
    categoria: "Dijes",
  },
  {
    id: "p05",
    nombre: "Taza — ‘Bosque Azul’",
    precio: 90,
    imagen: "/productos/taza-bosque.jpg",
    categoria: "Tazas",
    nuevo: true,
  },
  {
    id: "p06",
    nombre: "Manta — ‘Cielo de Invierno’",
    precio: 420,
    imagen: "/productos/manta-invierno.jpg",
    categoria: "Mantas",
  },
  {
    id: "p07",
    nombre: "Póster — ‘Edición Limitada 01’",
    precio: 350,
    imagen: "/productos/poster-limited.jpg",
    categoria: "Posters",
    destacado: true,
  },
  {
    id: "p08",
    nombre: "Stickers — ‘Mini Set’",
    precio: 35,
    imagen: "/productos/stickers-mini.jpg",
    categoria: "Stickers",
  },
];

/* ======================= Variants (Framer Motion) ======================= */

const heroVariants: Variants = {
  hidden: { opacity: 0, y: 12 },
  show: { opacity: 1, y: 0, transition: { duration: 0.5 } },
};

const gridVariants: Variants = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.04, delayChildren: 0.04 },
  },
};

const cardVariants: Variants = {
  hidden: { opacity: 0, y: 8 },
  show: { opacity: 1, y: 0 },
};

/* ======================= Página ======================= */

export default function TiendaPage() {
  const router = useRouter();

  // UI
  const [query, setQuery] = useState<string>("");
  const [categoria, setCategoria] = useState<Categoria>("Todos");
  const [sort, setSort] = useState<SortKey>("relevancia");
  const [cargando, setCargando] = useState<boolean>(true);

  // Carrito local (luego: conectar a useCart global)
  const [carrito, setCarrito] = useState<Producto[]>([]);

  // Quick View
  const [preview, setPreview] = useState<Producto | null>(null);

  useEffect(() => {
    const t = setTimeout(() => setCargando(false), 420);
    return () => clearTimeout(t);
  }, []);

  const items = useMemo(() => {
    let list = [...CATALOGO];

    if (categoria !== "Todos") {
      list = list.filter((p) => p.categoria === categoria);
    }

    if (query.trim()) {
      const q = query.toLowerCase();
      list = list.filter((p) => p.nombre.toLowerCase().includes(q));
    }

    switch (sort) {
      case "precio-asc":
        list.sort((a, b) => a.precio - b.precio);
        break;
      case "precio-desc":
        list.sort((a, b) => b.precio - a.precio);
        break;
      case "nuevo":
        list.sort((a, b) => Number(b.nuevo) - Number(a.nuevo));
        break;
      default:
        // relevancia: destacados primero
        list.sort((a, b) => Number(b.destacado) - Number(a.destacado));
    }

    return list;
  }, [categoria, query, sort]);

  const total = useMemo(
    () => carrito.reduce((acc, i) => acc + i.precio, 0),
    [carrito]
  );

  function agregarAlCarrito(p: Producto) {
    setCarrito((prev) => [...prev, p]);
  }

  return (
    <div className="min-h-screen">
      {/* HERO */}
      <section className="relative overflow-hidden">
        <div
          aria-hidden
          className="pointer-events-none absolute inset-0 bg-gradient-to-b from-background to-background/60"
        />
        <motion.div
          initial="hidden"
          animate="show"
          variants={heroVariants}
          className="relative"
          style={{ paddingTop: "calc(56px + env(safe-area-inset-top))" }}
        >
          <div className="container mx-auto px-4 py-10 md:py-14">
            <div className="flex flex-col items-center text-center gap-4">
              <Badge
                variant="secondary"
                className="backdrop-blur supports-[backdrop-filter]:bg-background/60"
              >
                <Sparkles className="mr-1 h-4 w-4" />
                Nueva sección
              </Badge>
              <h1 className="text-4xl md:text-5xl font-semibold tracking-tight">
                Tienda del Artista
              </h1>
              <p className="text-muted-foreground max-w-2xl">
                Merch original y ediciones especiales. Piezas pensadas para
                acompañarte todos los días.
              </p>
            </div>
          </div>
        </motion.div>
      </section>

      {/* CONTROLES */}
      <section className="container mx-auto px-4">
        <Card className="p-4 md:p-6 border-border/60 bg-card/60 backdrop-blur supports-[backdrop-filter]:bg-card/60">
          <div className="flex flex-col md:flex-row gap-4 md:items-center md:justify-between">
            {/* Búsqueda */}
            <div className="relative w-full md:max-w-md">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
              <Input
                placeholder="Buscar producto…"
                className="pl-9"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                aria-label="Buscar producto"
              />
            </div>

            {/* Ordenar */}
            <div className="flex items-center gap-2">
              <SlidersHorizontal className="h-4 w-4 text-muted-foreground" />
              <select
                value={sort}
                onChange={(e) => setSort(e.target.value as SortKey)}
                className={cn(
                  "h-10 rounded-md border bg-background px-3 text-sm",
                  "focus:outline-none focus:ring-2 focus:ring-primary/40"
                )}
                aria-label="Ordenar por"
              >
                <option value="relevancia">Relevancia</option>
                <option value="precio-asc">Precio: menor a mayor</option>
                <option value="precio-desc">Precio: mayor a menor</option>
                <option value="nuevo">Novedades</option>
              </select>
            </div>
          </div>

          {/* Categorías */}
          <div className="mt-4 md:mt-6 flex flex-wrap gap-2">
            {CATEGORIAS.map((cat) => {
              const active = categoria === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setCategoria(cat)}
                  className={cn(
                    "px-3 py-1.5 rounded-full text-sm border transition",
                    "hover:bg-accent hover:text-accent-foreground",
                    active
                      ? "bg-primary text-primary-foreground border-primary"
                      : "bg-background/50 text-foreground border-border"
                  )}
                  aria-pressed={active}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </Card>
      </section>

      <Separator className="my-8 container mx-auto" />

      {/* GRID */}
      <section className="container mx-auto px-4 pb-16">
        {cargando ? (
          <GridSkeleton />
        ) : items.length === 0 ? (
          <EmptyState query={query} />
        ) : (
          <motion.div
            initial="hidden"
            animate="show"
            variants={gridVariants}
            className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4"
          >
            {items.map((p) => (
              <motion.div key={p.id} variants={cardVariants}>
                <ProductoCard
                  data={p}
                  onAdd={() => agregarAlCarrito(p)}
                  onPreview={() => setPreview(p)}
                />
              </motion.div>
            ))}
          </motion.div>
        )}

        {/* Carrito flotante */}
        <AnimatePresence>
          {carrito.length > 0 && (
            <motion.div
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 16 }}
              className="fixed bottom-4 left-1/2 z-40 w-[92%] max-w-3xl -translate-x-1/2"
            >
              <Card className="flex items-center justify-between gap-4 p-4 shadow-lg bg-background/90 backdrop-blur supports-[backdrop-filter]:bg-background/70 border-border/60">
                <div className="flex items-center gap-2 text-sm">
                  <ShoppingCart className="h-4 w-4" />
                  <span>
                    {carrito.length} {carrito.length === 1 ? "producto" : "productos"}
                  </span>
                  <span className="text-muted-foreground">•</span>
                  <span className="font-medium">Total: Q{total}</span>
                </div>
                <div className="flex gap-2">
                  <Button variant="outline" onClick={() => setCarrito([])}>
                    Vaciar
                  </Button>
                  <Button
                    onClick={() => {
                      // Próximo paso: router.push("/checkout")
                      alert("Continuar al checkout (pendiente conectar)");
                      // router.push("/checkout");
                    }}
                  >
                    Ir al checkout
                  </Button>
                </div>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>
      </section>

      {/* Quick View */}
      <Dialog open={!!preview} onOpenChange={() => setPreview(null)}>
        <DialogContent className="sm:max-w-2xl">
          {preview && (
            <>
              <DialogHeader>
                <DialogTitle>{preview.nombre}</DialogTitle>
                <div className="flex items-center gap-2">
                  <Badge variant="outline">{preview.categoria}</Badge>
                  {preview.nuevo && <Badge>Nuevo</Badge>}
                  {preview.destacado && (
                    <Badge variant="secondary">Destacado</Badge>
                  )}
                </div>
              </DialogHeader>

              <div className="grid gap-6 md:grid-cols-2">
                <div className="relative aspect-square overflow-hidden rounded-lg border">
                  <Image
                    src={preview.imagen}
                    alt={preview.nombre}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                  />
                </div>
                <div className="flex flex-col">
                  <p className="text-2xl font-semibold">Q{preview.precio}</p>
                  <DialogDescription className="text-sm text-muted-foreground mt-2">
                    Pieza de merchandising original del artista. Materiales de
                    alta calidad. Envío nacional disponible.
                  </DialogDescription>

                  <div className="mt-auto flex gap-2 pt-6">
                    <Button variant="outline" onClick={() => setCarrito([])}>
                      Vaciar
                    </Button>
                    <Button
                      onClick={() => {
                        agregarAlCarrito(preview);
                        setPreview(null);
                      }}
                    >
                      <ShoppingCart className="mr-2 h-4 w-4" />
                      Agregar al carrito
                    </Button>
                  </div>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

/* ======================= Subcomponentes ======================= */

function ProductoCard({
  data,
  onAdd,
  onPreview,
}: {
  data: Producto;
  onAdd: () => void;
  onPreview: () => void;
}) {
  return (
    <Card className="group overflow-hidden border-border/60 bg-card/70 backdrop-blur supports-[backdrop-filter]:bg-card/60">
      <div className="relative aspect-square">
        <Image
          src={data.imagen}
          alt={data.nombre}
          fill
          className="object-cover transition-transform duration-500 group-hover:scale-[1.03]"
          sizes="(max-width: 768px) 100vw, 33vw"
        />
        <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-background/40 via-transparent to-transparent opacity-0 transition-opacity duration-300 group-hover:opacity-100" />

        <div className="absolute left-3 top-3 flex gap-2">
          {data.nuevo && <Badge>Nuevo</Badge>}
          {data.destacado && <Badge variant="secondary">Destacado</Badge>}
        </div>

        <div className="absolute right-3 top-3">
          <button
            onClick={onPreview}
            className={cn(
              "inline-flex items-center justify-center rounded-full border bg-background/80 p-2",
              "opacity-0 transition-all duration-300 group-hover:opacity-100 hover:scale-105"
            )}
            aria-label="Vista rápida"
          >
            <Eye className="h-4 w-4" />
          </button>
        </div>
      </div>

      <div className="p-4">
        <div className="flex items-start justify-between gap-3">
          <div>
            <h3 className="text-base font-medium leading-tight">
              {data.nombre}
            </h3>
            <p className="text-sm text-muted-foreground">{data.categoria}</p>
          </div>
          <p className="text-base font-semibold whitespace-nowrap">
            Q{data.precio}
          </p>
        </div>

        <div className="mt-4 flex gap-2">
          <Button className="w-full" onClick={onAdd}>
            <ShoppingCart className="mr-2 h-4 w-4" />
            Agregar
          </Button>
        </div>
      </div>
    </Card>
  );
}

function GridSkeleton() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
      {Array.from({ length: 8 }).map((_, i) => (
        <Card
          key={i}
          className="animate-pulse overflow-hidden border-border/60 bg-card/60 backdrop-blur"
        >
          <div className="aspect-square bg-muted/40" />
          <div className="p-4 space-y-3">
            <div className="h-4 w-3/4 bg-muted rounded" />
            <div className="h-3 w-1/2 bg-muted rounded" />
            <div className="h-9 w-full bg-muted rounded" />
          </div>
        </Card>
      ))}
    </div>
  );
}

function EmptyState({ query }: { query: string }) {
  return (
    <Card className="p-10 text-center">
      <p className="text-lg font-medium">No encontramos resultados</p>
      <p className="text-muted-foreground">
        {query ? (
          <>
            No hay productos que coincidan con{" "}
            <span className="font-semibold">“{query}”</span>.
          </>
        ) : (
          <>Prueba otra categoría o busca por nombre.</>
        )}
      </p>
    </Card>
  );
}
