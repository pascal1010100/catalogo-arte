// components/ui/card.tsx
import * as React from "react"
import Image from "next/image"

type Pastel = "peach" | "mint" | "lavender" | "lemon" | "sky" | "lilac"
type Variant = "surface" | "frame" | "outline"

const surface = (color: Pastel) =>
  ({
    peach: "pastel-surface-peach",
    mint: "pastel-surface-mint",
    lavender: "pastel-surface-lavender",
    lemon: "pastel-surface-lemon",
    sky: "pastel-surface-sky",
    lilac: "pastel-surface-lilac",
  }[color])

type CardProps = React.HTMLAttributes<HTMLDivElement> & {
  color?: Pastel
  variant?: Variant
  imageSrc?: string
  imageAlt?: string
  imageAspect?: "square" | "4/3" | "16/10"
}

export function Card({
  color = "mint",
  variant = "surface",
  imageSrc,
  imageAlt = "",
  imageAspect = "4/3",
  className = "",
  children,
  ...props
}: CardProps) {
  // clase de aspect ratio
  const aspect =
    imageAspect === "square"
      ? "aspect-square"
      : imageAspect === "16/10"
      ? "aspect-[16/10]"
      : "aspect-[4/3]"

  if (variant === "frame") {
    // Marco degradado con superficie interna crema (sin fondo pastel sólido)
    return (
      <div className={`frame-gradient ${className}`} {...props}>
        <div className="frame-surface card-surface card-hover p-4 md:p-5">
          {imageSrc ? (
            <div className={`relative overflow-hidden rounded-xl ${aspect}`}>
              <Image
                src={imageSrc}
                alt={imageAlt}
                fill
                priority={false}
                sizes="(min-width:1024px) 30vw, 90vw"
                className="object-cover"
              />
            </div>
          ) : null}
          <div className={imageSrc ? "mt-4 md:mt-5" : ""}>{children}</div>
        </div>
      </div>
    )
  }

  // outline simple (borde pastel, fondo crema)
  if (variant === "outline") {
    return (
      <div
        className={`card-surface card-hover p-6 md:p-7 ${className}`}
        style={{
          background: "var(--bg)",
          boxShadow: "inset 0 0 0 1px rgba(0,0,0,0.08), 0 8px 22px rgba(0,0,0,0.12)",
        }}
        {...props}
      >
        {imageSrc ? (
          <div className={`relative overflow-hidden rounded-xl ${aspect}`}>
            <Image
              src={imageSrc}
              alt={imageAlt}
              fill
              sizes="(min-width:1024px) 30vw, 90vw"
              className="object-cover"
            />
          </div>
        ) : null}
        <div className={imageSrc ? "mt-4 md:mt-5" : ""}>{children}</div>
      </div>
    )
  }

  // surface pastel sólido (como ya tenías)
  return (
    <div className={`card-surface card-hover ${surface(color)} p-6 md:p-8 ${className}`} {...props}>
      {imageSrc ? (
        <div className={`relative overflow-hidden rounded-xl ${aspect}`}>
          <Image
            src={imageSrc}
            alt={imageAlt}
            fill
            sizes="(min-width:1024px) 30vw, 90vw"
            className="object-cover"
          />
        </div>
      ) : null}
      <div className={imageSrc ? "mt-4 md:mt-5" : ""}>{children}</div>
    </div>
  )
}

export function CardTitle(props: React.HTMLAttributes<HTMLHeadingElement>) {
  return <h3 className="text-lg md:text-xl font-bold tracking-tight" {...props} />
}

export function CardText(props: React.HTMLAttributes<HTMLParagraphElement>) {
  return <p className="mt-2 text-sm md:text-base text-[color:var(--muted)]" {...props} />
}
