import Image from "next/image";
import clsx from "clsx";

type ArtworkCardProps = {
  title: string;
  meta?: string;
  imageSrc: string;
  href?: string;
  chip?: string;
  className?: string;
  // carrito (opcionales)
  priceUsd?: number;
  addLabel?: string;
  onAdd?: () => void;
  // modal (opcionales)
  viewLabel?: string;
  onView?: () => void;
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
  viewLabel = "Ver más",
  onView,
}: ArtworkCardProps) {
  return (
    <div
      className={clsx(
        "group rounded-2xl overflow-hidden border border-black/10 bg-white shadow-[var(--shadow-soft)]",
        "transition hover:shadow-[var(--shadow-lift)]",
        className
      )}
    >
      <a
        href={href}
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
      </a>

      <div className="p-4 flex items-center justify-between gap-3">
        <div>
          <p className="font-semibold">{title}</p>
          {meta && <p className="mt-0.5 text-sm opacity-70">{meta}</p>}
        </div>

        <div className="flex gap-2">
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

          {onView && (
            <button
              type="button"
              onClick={onView}
              className="shrink-0 rounded-full px-3 py-1.5 text-xs font-semibold border border-black/10 hover:bg-black/[0.04] transition"
              aria-label={`Ver más sobre ${title}`}
            >
              {viewLabel}
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
