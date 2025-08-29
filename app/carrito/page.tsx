"use client";

import Link from "next/link";
import Image from "next/image";
import { useMemo } from "react";
import { useCart } from "@/stores/cart";

/* ===== Config ===== */
const BG_URL = "/hero/backgroundhero.jpg";

type CartItem = {
  id: string;
  name: string;
  price: number;
  quantity: number;
  imageUrl?: string;
};

/* ===== Subcomponentes simples (en el mismo archivo) ===== */
function CartHeader({ isEmpty }: { isEmpty: boolean }) {
  return (
    <header className="mb-10 text-center text-white">
      <div className="eyebrow text-white/90">Checkout</div>
      <h1 className="h1 mt-2">Carrito de compras</h1>
      <p className="mt-2 text-white/90">
        {isEmpty ? "Cuando agregues obras, aparecerán aquí." : "Revisa tus obras antes de continuar."}
      </p>
    </header>
  );
}

function EmptyState() {
  return (
    <div className="min-h-[40vh] grid place-items-center">
      <div className="text-center">
        <h2 className="text-3xl md:text-4xl font-bold text-white">Tu carrito está vacío</h2>
        <p className="mt-2 text-white/90">Cuando agregues obras, aparecerán aquí.</p>
        <Link href="/galeria" className="btn btn-accent mt-5 inline-block">
          Explora la galería
        </Link>
      </div>
    </div>
  );
}

function ItemRow({
  item,
  onDec,
  onInc,
  onInput,
  onRemove,
  fmt,
}: {
  item: CartItem;
  onDec: () => void;
  onInc: () => void;
  onInput: (value: string) => void;
  onRemove: () => void;
  fmt: (n: number) => string;
}) {
  return (
    <article
      className="p-4 flex items-center justify-between rounded-[16px] border border-white/25
                 bg-white/70 backdrop-blur-sm shadow-[var(--shadow-soft)] hover:shadow-[var(--shadow-lift)] transition"
      aria-label={`Producto: ${item.name}`}
    >
      <div className="flex items-center gap-4">
        <div className="relative size-16 rounded-[12px] overflow-hidden bg-white/60">
          {item.imageUrl ? (
            <Image src={item.imageUrl} alt={item.name} fill className="object-cover" sizes="64px" />
          ) : (
            <div className="grid place-items-center h-full text-xs opacity-60">Sin imagen</div>
          )}
        </div>
        <div className="text-[color:var(--fg)]">
          <p className="font-semibold">{item.name}</p>
          <p className="text-sm opacity-70">{fmt(item.price)}</p>
        </div>
      </div>

      <div className="flex items-center gap-3">
        <div className="flex items-center rounded-full border border-black/10 bg-white overflow-hidden">
          <button aria-label={`Disminuir ${item.name}`} className="px-3 py-1 hover:bg-black/5" onClick={onDec}>
            −
          </button>
          <input
            inputMode="numeric"
            pattern="[0-9]*"
            min={1}
            max={999}
            value={item.quantity ?? 1}
            onChange={(e) => onInput(e.target.value)}
            className="w-14 text-center py-1 outline-none"
            aria-label={`Cantidad de ${item.name}`}
          />
          <button aria-label={`Aumentar ${item.name}`} className="px-3 py-1 hover:bg-black/5" onClick={onInc}>
            +
          </button>
        </div>

        <button onClick={onRemove} className="text-sm underline underline-offset-2 hover:opacity-80">
          Eliminar
        </button>
      </div>
    </article>
  );
}

function Summary({
  total,
  onClear,
  fmt,
}: {
  total: number;
  onClear: () => void;
  fmt: (n: number) => string;
}) {
  return (
    <section className="mt-10 flex flex-col items-end gap-3">
      <p className="text-lg text-white">
        <span className="opacity-80 mr-2">Total:</span>
        <span className="font-semibold">{fmt(total)}</span>
      </p>
      <div className="flex items-center gap-3">
        <button onClick={onClear} className="btn bg-white/85 hover:bg-white text-[color:var(--fg)]">
          Vaciar carrito
        </button>
        <Link href="/checkout" className="btn btn-accent">
          Continuar al pago
        </Link>
      </div>
    </section>
  );
}

/* ===== Página ===== */
export default function CartPage() {
  const { items, remove, updateQuantity, clear } = useCart() as {
    items: CartItem[];
    remove: (id: string) => void;
    updateQuantity: (id: string, qty: number) => void;
    clear: () => void;
  };

  const fmtCurrency = useMemo(
    () => new Intl.NumberFormat("es-ES", { style: "currency", currency: "USD" }),
    []
  );
  const fmt = (n: number) => fmtCurrency.format(n);

  const total = useMemo(
    () => items?.reduce((acc, it) => acc + it.price * (it.quantity || 1), 0) ?? 0,
    [items]
  );

  const isEmpty = !items || items.length === 0;

  return (
    <main
      className="min-h-[70vh] py-12"
      style={{
        backgroundImage: `linear-gradient(0deg, rgba(0,0,0,0.35), rgba(0,0,0,0.35)), url("${BG_URL}")`,
        backgroundSize: "cover",
        backgroundPosition: "center",
      }}
    >
      <div className="container-padded">
        <CartHeader isEmpty={isEmpty} />

        {isEmpty ? (
          <EmptyState />
        ) : (
          <>
            <section className="space-y-4">
              {items.map((item) => (
                <ItemRow
                  key={item.id}
                  item={item}
                  fmt={fmt}
                  onDec={() => updateQuantity(item.id, Math.max(1, (item.quantity ?? 1) - 1))}
                  onInc={() => updateQuantity(item.id, Math.min(999, (item.quantity ?? 1) + 1))}
                  onInput={(value) => {
                    const n = Number(value.replace(/[^\d]/g, ""));
                    updateQuantity(item.id, Number.isFinite(n) && n > 0 ? Math.min(n, 999) : 1);
                  }}
                  onRemove={() => remove(item.id)}
                />
              ))}
            </section>

            <Summary total={total} onClear={clear} fmt={fmt} />
          </>
        )}
      </div>
    </main>
  );
}
