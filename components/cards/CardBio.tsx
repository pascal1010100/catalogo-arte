// components/cards/CardBio.tsx
import HeroCard from "./HeroCard";

export default function CardBio() {
  return (
    <HeroCard
      title="Biografía & statement"
      description="La voz detrás de las piezas: trayectoria, influencias y proceso."
      href="/artista"
      bgSrc="/artista/hero-bg.jpg"

      alt="Retrato o textura representativa de la biografía del artista"
    />
  );
}
