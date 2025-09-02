// components/cards/CardContacto.tsx
import HeroCard from "./HeroCard";

export default function CardContacto() {
  return (
    <HeroCard
      title="Contacto & comisiones"
      description="Encargos, consultas y colaboraciones. Hablemos."
      href="/contacto"
      bgSrc="/contacto/bg-herocontacto.jpg" // ← coincide con tu archivo
      alt="Textura o ilustración de la sección de contacto"
      focus="50% 70%"                         // ↓ baja el foco para mostrar el auto
      overlayClassName="from-black/20 via-black/10 to-black/30" // overlay más suave
    />
  );
}
