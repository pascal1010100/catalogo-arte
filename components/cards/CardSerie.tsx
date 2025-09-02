// components/cards/CardSerie.tsx
import HeroCard from "./HeroCard";

export default function CardSerie() {
  return (
    <HeroCard
      title="Series destacadas"
      description="Colecciones curadas de obras — explora por temática y técnica."
      href="/galeria"
      bgSrc="/images/obra-1.jpg"   // ↙️ usa la misma imagen que el Hero de Galería
      alt="Vista previa de la galería del artista"
    />
  );
}
