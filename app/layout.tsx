// app/layout.tsx
import type { Metadata, Viewport } from "next";
import "./globals.css";

import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Nunito } from "next/font/google";

// Tipografía (coherente con tu globals.css que usa --font-nunito)
const nunito = Nunito({
  subsets: ["latin"],
  variable: "--font-nunito",
  display: "swap",
});

export const metadata: Metadata = {
  title: {
    default: "Catálogo Arte — ZPTVRD",
    template: "%s · ZPTVRD",
  },
  description:
    "Galería del artista: obras pictoplasma en paletas pastel — minimal y contemporáneo.",
  metadataBase: new URL("https://example.com"), // cambia por tu dominio si tienes
  icons: { icon: "/favicon.ico" },
  openGraph: {
    title: "Catálogo Arte — ZPTVRD",
    description:
      "Obras pictoplasma en paletas pastel — minimal y contemporáneo.",
    url: "https://example.com",
    siteName: "ZPTVRD",
    images: [{ url: "/og.jpg", width: 1200, height: 630 }],
    locale: "es_ES",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Catálogo Arte — ZPTVRD",
    description:
      "Obras pictoplasma en paletas pastel — minimal y contemporáneo.",
    images: ["/og.jpg"],
  },
};

export const viewport: Viewport = {
  themeColor: "#f3ede4", // tu --bg (fondo crema)
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es">
      <body className={`${nunito.variable} min-h-screen flex flex-col bg-[color:var(--bg)] text-[color:var(--fg)]`}>
        {/* Accesibilidad: saltar directo al contenido */}
        <a
          href="#contenido"
          className="sr-only focus:not-sr-only focus:fixed focus:top-2 focus:left-2 focus:z-[100] bg-white px-3 py-2 rounded-md shadow"
        >
          Saltar al contenido
        </a>

        {/* Navbar fijo (altura h-14 ⇒ dejamos padding-top en el wrapper) */}
        <Navbar />

        {/* Wrapper del contenido: deja espacio para el navbar */}
        <div id="contenido" className="flex-1 pt-14">
          {children}
        </div>

        <Footer />
      </body>
    </html>
  );
}
