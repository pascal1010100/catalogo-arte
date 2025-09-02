// app/checkout/page.tsx
"use client";

import Link from "next/link";
import Image from "next/image";
import { useMemo, useState, type FormEvent } from "react";
import { useCart } from "@/stores/cart";

type CartItem = {
  id: string;
  name: string;
  price: number;
  imageUrl?: string;
  qty?: number;
};

type Buyer = {
  name: string;
  email: string;
  phone?: string;
  notes?: string;
};

function isCartItem(x: unknown): x is CartItem {
  if (typeof x !== "object" || x === null) return false;
  const o = x as Record<string, unknown>;
  return (
    typeof o.id === "string" &&
    typeof o.name === "string" &&
    typeof o.price === "number"
  );
}

function toCartItems(xs: unknown): CartItem[] {
  if (!Array.isArray(xs)) return [];
  return xs.filter(isCartItem);
}

export default function CheckoutPage() {
  // Normalizamos items a CartItem[] sin depender del tipo interno del store
  const itemsUnknown = useCart((s) => (s as unknown as { items?: unknown }).items ?? []);
  const items = useMemo(() => toCartItems(itemsUnknown), [itemsUnknown]);

  const clear = useCart((s) => (s as unknown as { clear?: () => void }).clear);

  const [buyer, setBuyer] = useState<Buyer>({ name: "", email: "" });

  const currency: "USD" | "GTQ" | "EUR" | string = "USD";
  const fmt = (n: number) =>
    new Intl.NumberFormat(undefined, { style: "currency", currency }).format(n);

  const totals = useMemo(() => {
    const subtotal = items.reduce((acc, it) => acc + it.price * (it.qty ?? 1), 0);
    const shipping = 0;
    const total = subtotal + shipping;
    return { subtotal, shipping, total };
  }, [items]);

  const emailOk = /\S+@\S+\.\S+/.test(buyer.email);
  const canPay = items.length > 0 && buyer.name.trim().length > 0 && emailOk;

  async function handleSubmit(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();

    // Aquí irá tu POST al backend/Stripe
    // const res = await fetch("/api/checkout", { ... })
    // const { url } = await res.json(); if (url) window.location.href = url;

    alert("Pedido creado (demo). Integraremos Stripe a continuación.");
    try { clear?.(); } catch {}
  }

  return (
    <main className="min-h-[70vh]">
      <div className="max-w-6xl mx-auto px-6 py-10">
        <header className="mb-8">
          <h1 className="text-3xl md:text-4xl font-semibold">Checkout</h1>
          <p className="mt-2 text-sm opacity-70">
            Revisa tu pedido e ingresa tus datos para continuar al pago.
          </p>
        </header>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Resumen */}
          <section className="lg:col-span-2 space-y-4">
            {items.length === 0 ? (
              <div className="rounded-2xl border border-black/10 bg-white p-6 shadow-[var(--shadow-soft)]">
                <p className="text-sm">Tu carrito está vacío.</p>
                <Link href="/galeria" className="inline-block mt-3 rounded-full px-3 py-1.5 text-xs btn-accent">
                  Volver a la galería
                </Link>
              </div>
            ) : (
              items.map((it) => (
                <article
                  key={it.id}
                  className="rounded-2xl border border-black/10 bg-white p-4 shadow-[var(--shadow-soft)] flex items-center gap-4"
                >
                  <div className="relative h-16 w-16 overflow-hidden rounded-xl ring-1 ring-black/10">
                    <Image
                      src={it.imageUrl ?? "/images/placeholder.jpg"}
                      alt={it.name}
                      fill
                      sizes="64px"
                      className="object-cover"
                    />
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className="font-semibold truncate">{it.name}</p>
                    <p className="text-xs opacity-70">
                      {fmt(it.price)} · Cantidad: {it.qty ?? 1}
                    </p>
                  </div>
                  <div className="font-semibold">
                    {fmt((it.qty ?? 1) * it.price)}
                  </div>
                </article>
              ))
            )}
          </section>

          {/* Totales + Formulario */}
          <aside className="space-y-4">
            <div className="rounded-2xl border border-black/10 bg-white p-6 shadow-[var(--shadow-soft)]">
              <h2 className="text-lg font-semibold">Resumen</h2>
              <dl className="mt-4 space-y-2 text-sm">
                <div className="flex justify-between">
                  <dt className="opacity-70">Subtotal</dt>
                  <dd>{fmt(totals.subtotal)}</dd>
                </div>
                <div className="flex justify-between">
                  <dt className="opacity-70">Envío</dt>
                  <dd>{fmt(totals.shipping)}</dd>
                </div>
                <div className="mt-2 pt-2 flex justify-between border-t">
                  <dt className="font-semibold">Total</dt>
                  <dd className="font-semibold">{fmt(totals.total)}</dd>
                </div>
              </dl>
            </div>

            <form onSubmit={handleSubmit} className="rounded-2xl border border-black/10 bg-white p-6 shadow-[var(--shadow-soft)] space-y-4">
              <h2 className="text-lg font-semibold">Datos del comprador</h2>

              <div className="grid grid-cols-1 gap-3">
                <label className="text-sm">
                  Nombre completo
                  <input
                    required
                    value={buyer.name}
                    onChange={(e) => setBuyer((b) => ({ ...b, name: e.target.value }))}
                    className="mt-1 w-full rounded-xl border border-black/10 px-3 py-2 outline-none focus:ring-2 focus:ring-black/20"
                    placeholder="Tu nombre"
                  />
                </label>

                <label className="text-sm">
                  Email
                  <input
                    required
                    type="email"
                    value={buyer.email}
                    onChange={(e) => setBuyer((b) => ({ ...b, email: e.target.value }))}
                    className="mt-1 w-full rounded-xl border border-black/10 px-3 py-2 outline-none focus:ring-2 focus:ring-black/20"
                    placeholder="tucorreo@ejemplo.com"
                  />
                </label>

                <label className="text-sm">
                  Teléfono (opcional)
                  <input
                    type="tel"
                    value={buyer.phone ?? ""}
                    onChange={(e) => setBuyer((b) => ({ ...b, phone: e.target.value }))}
                    className="mt-1 w-full rounded-xl border border-black/10 px-3 py-2 outline-none focus:ring-2 focus:ring-black/20"
                    placeholder="+502 5555-5555"
                  />
                </label>

                <label className="text-sm">
                  Notas de entrega (opcional)
                  <textarea
                    value={buyer.notes ?? ""}
                    onChange={(e) => setBuyer((b) => ({ ...b, notes: e.target.value }))}
                    className="mt-1 w-full rounded-xl border border-black/10 px-3 py-2 outline-none focus:ring-2 focus:ring-black/20"
                    rows={3}
                    placeholder="Instrucciones, preferencia de contacto, etc."
                  />
                </label>
              </div>

              <button
                type="submit"
                className="w-full h-11 rounded-xl btn-accent disabled:opacity-60"
                disabled={!canPay}
              >
                Continuar al pago
              </button>

              <p className="text-[11px] leading-relaxed opacity-70">
                Al continuar aceptas ser contactado por la galería/artista para coordinar el pago y la entrega. 
                Próximamente integraremos pagos en línea.
              </p>
            </form>

            <div className="text-xs opacity-60">
              <Link href="/galeria" className="underline underline-offset-4 hover:opacity-80">
                ← Seguir explorando
              </Link>
            </div>
          </aside>
        </div>
      </div>
    </main>
  );
}
