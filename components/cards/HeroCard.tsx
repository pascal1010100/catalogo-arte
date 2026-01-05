"use client";

import Image from "next/image";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

type HeroCardProps = {
  title: string;
  description?: string;
  href: string;
  bgSrc: string;
  alt?: string;
  className?: string;
  focus?: string;
  overlayClassName?: string;
};

export default function HeroCard({
  title,
  description,
  href,
  bgSrc,
  alt = "",
  className = "",
  focus = "center",
  overlayClassName = "",
}: HeroCardProps) {
  return (
    <Link href={href} className={`group block relative rounded-2xl overflow-hidden ${className}`}>
      <motion.div
        className="relative w-full h-72 md:h-80 lg:h-96 overflow-hidden rounded-2xl ring-1 ring-border/20 shadow-lg"
        whileHover="hover"
        initial="rest"
      >
        {/* Background Image with Zoom Effect */}
        <motion.div
          className="absolute inset-0 z-0"
          variants={{
            rest: { scale: 1 },
            hover: { scale: 1.08 },
          }}
          transition={{ duration: 0.6, ease: [0.33, 1, 0.68, 1] }} // smooth ease-out-cubic
        >
          <Image
            src={bgSrc}
            alt={alt}
            fill
            sizes="(min-width:1024px) 33vw, (min-width:768px) 50vw, 100vw"
            className="object-cover"
            style={{ objectPosition: focus }}
          />
        </motion.div>

        {/* Gradient Overlay */}
        <div
          className={`absolute inset-0 bg-gradient-to-t from-black/80 via-black/20 to-transparent transition-opacity duration-300 ${overlayClassName}`}
        />

        {/* Content */}
        <div className="absolute inset-0 z-10 flex flex-col justify-end p-6">
          <motion.div
            variants={{
              rest: { y: 0 },
              hover: { y: -5 },
            }}
            transition={{ duration: 0.3 }}
          >
            <h3 className="text-2xl font-bold text-white mb-2 drop-shadow-md">
              {title}
            </h3>

            {description && (
              <p className="text-white/80 text-sm md:text-base line-clamp-2 mb-4 drop-shadow-sm leading-relaxed">
                {description}
              </p>
            )}

            <div className="flex items-center gap-2 text-white font-medium text-sm">
              <span className="relative">
                Ver más
                <span className="absolute left-0 -bottom-1 w-0 h-px bg-white transition-all duration-300 group-hover:w-full" />
              </span>
              <motion.span
                variants={{
                  rest: { x: 0 },
                  hover: { x: 4 },
                }}
                transition={{ duration: 0.2 }}
              >
                <ArrowRight className="w-4 h-4" />
              </motion.span>
            </div>
          </motion.div>
        </div>
      </motion.div>
    </Link>
  );
}
