"use client";

import Image from "next/image";
import Link from "next/link";
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
        "group rounded-2xl overflow-hidden border border-black/10 bg-white shadow-[var(--shadow-soft)]",
        "transition hover:shadow-[var(--shadow-lift)]",
        className
      )}
    >
      {/* Imagen principal con Link al modal */}
      <Link
        href={href}
        scroll={false}
        className="block focus:outline-none focus:ring-2 focus:ring-black/10"
      >
        <div className="relative aspect-[4/3]">
          <Image
            src={imageSrc}
            alt={title}
            fill
            className="object-cover transition group-hover:scale-[1.02]"
            sizes="(max-width:768px) 100vw, 33vw"
          />
          {chip && (
            <span className="absolute left-3 top-3 rounded-full border border-black/10 bg-white/85 px-2.5 py-1 text-[10px] uppercase tracking-wide text-[color:var(--fg)]/80 backdrop-blur">
              {chip}
            </span>
          )}
        </div>
      </Link>

      {/* Footer de la tarjeta */}
      <div className="p-4 flex items-center justify-between gap-3">
        <div>
          <p className="font-semibold">{title}</p>
          {meta && <p className="mt-0.5 text-sm opacity-70">{meta}</p>}
        </div>

        <div className="flex items-center gap-2">
          {/* Botón agregar al carrito */}
          {onAdd && (
            <button
              type="button"
              onClick={onAdd}
              className="shrink-0 rounded-full px-3 py-1.5 text-xs font-semibold btn-accent"
              aria-label={`Agregar ${title}${priceUsd ? ` por $${priceUsd}` : ""}`}
            >
              {addLabel}
            </button>
          )}

          {/* Botón Ver más → abre modal */}
          <Link
            href={href}
            scroll={false}
            className="shrink-0 rounded-full px-3 py-1.5 text-xs font-medium border border-black/10 hover:border-black/20 transition"
            aria-label={`Ver más sobre ${title}`}
          >
            Ver más
          </Link>
        </div>
      </div>
    </div>
  );
}
