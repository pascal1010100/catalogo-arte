// components/cards/CardContacto.tsx
import HeroCard from "./HeroCard";

export default function CardContacto() {
  return (
    <HeroCard
      title="Contacto & comisiones"
      description="Encargos, consultas y colaboraciones. Hablemos."
      href="/contacto"
      bgSrc="/contacto/bg-herocontacto.jpg"  // ↙️ misma imagen/estilo que el Hero de contacto
      alt="Textura o fondo que acompaña la sección de contacto"
    />
  );
}
