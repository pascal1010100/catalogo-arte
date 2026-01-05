"use client";

import Image from "next/image";
import Link from "next/link";
import { Button } from "@/components/ui/button";
import clsx from "clsx";

type ArtworkCardProps = {
  title: string;
  meta?: string;
  imageSrc: string;
  href?: string; // deep-link al modal (ej. ?obra=obra-1)
  chip?: string;
  className?: string;
  // carrito (opcionales)
  priceUsd?: number;
  addLabel?: string;
  onAdd?: () => void;
};

export default function ArtworkCard({
  title,
  meta,
  imageSrc,
  href = "#",
  chip,
  className,
  priceUsd,
  addLabel = "Agregar",
  onAdd,
}: ArtworkCardProps) {
  return (
    <div
      className={clsx(
        "group rounded-2xl overflow-hidden border border-border bg-card shadow-sm",
        "transition-all duration-300 hover:shadow-md hover:border-border/80",
        className
      )}
    >
      {/* Imagen principal con Link al modal */}
      <Link
        href={href}
        scroll={false}
        className="block focus:outline-none focus:ring-2 focus:ring-ring"
      >
        <div className="relative aspect-[4/3] overflow-hidden">
          <Image
            src={imageSrc}
            alt={title}
            fill
            className="object-cover transition-transform duration-500 group-hover:scale-105"
            sizes="(max-width:768px) 100vw, 33vw"
          />
          {chip && (
            <span className="absolute left-3 top-3 rounded-full border border-border/50 bg-background/80 px-2.5 py-1 text-[10px] uppercase tracking-wide text-foreground backdrop-blur-md">
              {chip}
            </span>
          )}
        </div>
      </Link>

      {/* Footer de la tarjeta */}
      <div className="p-4 flex items-center justify-between gap-3">
        <div>
          <p className="font-semibold text-foreground">{title}</p>
          {meta && <p className="mt-0.5 text-sm text-muted-foreground">{meta}</p>}
        </div>

        <div className="flex items-center gap-2">
          {/* Botón agregar al carrito */}
          {onAdd && (
            <Button
              size="sm"
              onClick={onAdd}
              className="rounded-full px-4 h-8 text-xs"
              aria-label={`Agregar ${title}${priceUsd ? ` por $${priceUsd}` : ""}`}
            >
              {addLabel}
            </Button>
          )}

          {/* Botón Ver más → abre modal */}
          <Link
            href={href}
            scroll={false}
          >
            <Button variant="outline" size="sm" className="rounded-full px-4 h-8 text-xs">
              Ver más
            </Button>
          </Link>
        </div>
      </div>
    </div>
  );
}
