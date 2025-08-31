"use client";

import * as React from "react";
import Image from "next/image";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogDescription,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Separator } from "@/components/ui/separator";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Badge } from "@/components/ui/badge";
import { ShoppingCart, Phone, Info, Check } from "lucide-react";

export type ModalArtwork = {
  id: string;
  slug?: string;
  title: string;
  year?: string | number;
  medium?: string;
  size?: string;
  price?: number;
  availability?: "available" | "reserved" | "sold" | string;
  images: string[];
  description?: string;
  series?: string;
  tags?: string[];
};

type ArtworkModalProps = {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  artwork?: ModalArtwork | null;
  onAddToCart?: (art: ModalArtwork) => void;
  currency?: string;
  whatsappPhoneE164?: string;
};

function formatMoney(value?: number, currency = "USD") {
  if (typeof value !== "number") return "—";
  try {
    return new Intl.NumberFormat(undefined, { style: "currency", currency }).format(value);
  } catch {
    return `${value.toFixed(2)} ${currency}`;
  }
}

export default function ArtworkModal({
  open,
  onOpenChange,
  artwork,
  onAddToCart,
  currency = "USD",
  whatsappPhoneE164,
}: ArtworkModalProps) {
  const [activeIdx, setActiveIdx] = React.useState(0);
  React.useEffect(() => setActiveIdx(0), [artwork?.id, open]);

  const mainImg = artwork?.images?.[activeIdx];

  const availabilityLabel =
    artwork?.availability === "sold"
      ? "Vendido"
      : artwork?.availability === "reserved"
      ? "Reservado"
      : artwork?.availability === "available"
      ? "Disponible"
      : artwork?.availability || "—";

  const canAdd = !!artwork && artwork.availability !== "sold" && artwork.availability !== "reserved";

  const handleAdd = () => {
    if (artwork && onAddToCart) onAddToCart(artwork);
  };

  const waMessage = artwork
    ? encodeURIComponent(`Hola, me interesa la obra "${artwork.title}"${artwork.year ? ` (${artwork.year})` : ""}. ¿Podemos conversar?`)
    : "";
  const waHref = whatsappPhoneE164 && waMessage ? `https://wa.me/${whatsappPhoneE164}?text=${waMessage}` : undefined;

  /** Bloque reutilizable de ficha/acciones */
  const Details = () => (
    <div className="p-6 pt-4">
      <div className="flex flex-wrap items-center gap-2">
        <Badge variant="secondary" className="whitespace-nowrap">{availabilityLabel}</Badge>
        {artwork?.series ? <Badge variant="outline">{artwork.series}</Badge> : null}
        {artwork?.tags?.slice(0, 3).map((t) => (
          <Badge key={t} variant="outline" className="capitalize">{t}</Badge>
        ))}
      </div>

      <div className="mt-5 grid grid-cols-1 sm:grid-cols-2 gap-x-8 gap-y-4">
        <dl className="space-y-1">
          <dt className="text-[11px] uppercase tracking-[0.18em] text-[color:var(--muted)]">Técnica</dt>
          <dd className="text-base font-medium">{artwork?.medium ?? "—"}</dd>
        </dl>
        <dl className="space-y-1">
          <dt className="text-[11px] uppercase tracking-[0.18em] text-[color:var(--muted)]">Tamaño</dt>
          <dd className="text-base font-medium">{artwork?.size ?? "—"}</dd>
        </dl>
        <dl className="space-y-1">
          <dt className="text-[11px] uppercase tracking-[0.18em] text-[color:var(--muted)]">Precio</dt>
          <dd className="text-lg font-semibold">{formatMoney(artwork?.price, currency)}</dd>
        </dl>
        <dl className="space-y-1">
          <dt className="text-[11px] uppercase tracking-[0.18em] text-[color:var(--muted)]">Código</dt>
          <dd className="text-base font-medium">{artwork?.id ?? "—"}</dd>
        </dl>
      </div>

      {artwork?.description ? (
        <>
          <Separator className="my-6" />
          <div className="space-y-2">
            <p className="text-[11px] uppercase tracking-[0.18em] text-[color:var(--muted)]">Descripción</p>
            <p className="leading-relaxed">{artwork.description}</p>
          </div>
        </>
      ) : null}

      <Separator className="my-6" />
      <div className="flex flex-col sm:flex-row gap-2">
        <Button
          className="flex-1 h-11 rounded-xl btn-accent"
          onClick={handleAdd}
          disabled={!canAdd}
          aria-disabled={!canAdd}
        >
          <ShoppingCart className="mr-2 h-4 w-4" />
          {canAdd ? "Agregar al carrito" : "No disponible"}
        </Button>

        {waHref ? (
          <Button asChild variant="outline" className="flex-1 h-11 rounded-xl border-black/12">
            <a href={waHref} target="_blank" rel="noopener noreferrer">
              <Phone className="mr-2 h-4 w-4" />
              Consultar disponibilidad
            </a>
          </Button>
        ) : null}
      </div>

      <div className="mt-4 text-xs text-[color:var(--muted)] flex items-center gap-2">
        <Check className="h-3.5 w-3.5" />
        Entrega y embalaje acordados directamente con el artista/galería.
      </div>
    </div>
  );

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent aria-describedby="artwork-details" className="p-0">
        {/* Header fijo dentro del contenido scrolleable */}
        <div className="px-6 py-4 border-b border-black/10 bg-gradient-to-b from-[var(--bg)] to-[var(--bg)]/85 sticky top-0 z-10">
          <div className="flex items-center gap-3">
            <span className="inline-flex h-6 w-6 items-center justify-center rounded-full bg-black/[0.06] ring-1 ring-black/10">
              <Info className="h-3.5 w-3.5" aria-hidden />
            </span>
            <DialogHeader className="flex-1">
              <DialogTitle className="truncate">
                {artwork?.title ?? "Obra"}
                {artwork?.year ? (
                  <span className="ml-2 font-normal text-[color:var(--muted)]">({artwork.year})</span>
                ) : null}
              </DialogTitle>
              <DialogDescription id="artwork-details" className="sr-only">
                Detalles de la obra seleccionada
              </DialogDescription>
            </DialogHeader>
          </div>
        </div>

        {/* CONTENIDO con scroll general (móvil) */}
        <div className="max-h-[calc(90vh-64px)] overflow-y-auto">
          {/* móvil: columna única; desktop: split */}
          <div className="grid grid-cols-1 lg:grid-cols-2 lg:divide-x lg:divide-black/10">
            {/* IMAGEN + THUMBS */}
            <div className="bg-[var(--bg)]">
              <div className="mx-6 my-6 rounded-2xl bg-white shadow-[var(--shadow-soft)] ring-1 ring-black/10 overflow-hidden">
                <div className="relative aspect-[4/3] w-full">
                  {mainImg ? (
                    <Image
                      src={mainImg}
                      alt={artwork?.title ?? "Obra"}
                      fill
                      className="object-contain"
                      sizes="(max-width:1024px) 100vw, 50vw"
                    />
                  ) : (
                    <div className="absolute inset-0 grid place-items-center text-[color:var(--muted)]">Sin imagen</div>
                  )}
                </div>
              </div>

              {artwork?.images?.length ? (
                <div className="px-6 pb-6">
                  <div className="flex gap-2 overflow-x-auto">
                    {artwork.images.map((src, idx) => {
                      const active = activeIdx === idx;
                      return (
                        <button
                          key={`${src}-${idx}`}
                          onClick={() => setActiveIdx(idx)}
                          aria-label={`Vista ${idx + 1}`}
                          className={[
                            "relative h-16 w-20 rounded-xl overflow-hidden border transition",
                            active
                              ? "ring-2 ring-[var(--accent)] border-transparent"
                              : "border-black/12 hover:border-black/20 hover:ring-1 hover:ring-black/10"
                          ].join(" ")}
                        >
                          <Image src={src} alt={`Vista ${idx + 1}`} fill className="object-cover" sizes="80px" />
                        </button>
                      );
                    })}
                  </div>
                </div>
              ) : null}
            </div>

            {/* DETALLES (en desktop, siéntete libre de mantener scroll general) */}
            <div className="bg-[var(--bg)]">
              <Details />
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
