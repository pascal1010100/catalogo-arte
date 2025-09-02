// components/cards/HeroCard.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import { cn } from "@/lib/utils"; // si no tienes esta util, puedes quitar cn y concatenar strings

type HeroCardProps = {
  title: string;
  description?: string;
  href: string;
  bgSrc: string;     // ej: "/hero/galeria.jpg"
  alt?: string;
  className?: string;
  overlayClassName?: string;
};

export default function HeroCard({
  title,
  description,
  href,
  bgSrc,
  alt = "",
  className,
  overlayClassName,
}: HeroCardProps) {
  return (
    <Link href={href} aria-label={title} className="group block">
      <div
        className={cn(
          "relative w-full overflow-hidden rounded-2xl",
          // Alturas seguras sin depender de aspect-ratio plugin
          "h-56 md:h-64 lg:h-72",
          "ring-1 ring-white/10 shadow-[0_8px_30px_rgba(0,0,0,0.12)]",
          "transition-transform duration-300 will-change-transform",
          "hover:translate-y-[-2px]",
          className
        )}
      >
        {/* Fondo */}
        <Image
          src={bgSrc}
          alt={alt}
          fill
          sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
          priority={false}
          className="object-cover object-center transition-transform duration-700 group-hover:scale-105"
        />

        {/* Overlay para legibilidad del texto */}
        <div
          className={cn(
            "absolute inset-0 bg-gradient-to-b from-black/40 via-black/35 to-black/55",
            "transition-colors duration-300 group-hover:from-black/35 group-hover:via-black/25 group-hover:to-black/45",
            overlayClassName
          )}
        />

        {/* Contenido */}
        <div className="absolute inset-0 z-10 flex flex-col justify-end p-5 md:p-6">
          <h3 className="text-white font-semibold text-lg md:text-xl leading-tight drop-shadow-[0_2px_6px_rgba(0,0,0,0.4)]">
            {title}
          </h3>
          {description ? (
            <p className="mt-1 text-white/90 text-sm md:text-base line-clamp-2 drop-shadow-[0_2px_6px_rgba(0,0,0,0.35)]">
              {description}
            </p>
          ) : null}

          {/* Pequeño affordance de interacción */}
          <span className="mt-3 inline-flex items-center gap-1 text-white/90 text-sm md:text-[0.95rem]">
            Ver más
            <svg
              className="size-4 translate-x-0 group-hover:translate-x-0.5 transition-transform"
              viewBox="0 0 24 24"
              fill="none"
              aria-hidden="true"
            >
              <path d="M8 5l8 7-8 7" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </span>
        </div>
      </div>
    </Link>
  );
}
