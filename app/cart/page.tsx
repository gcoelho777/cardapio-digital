"use client";

import Image from "next/image";
import Link from "next/link";
import { useCart } from "../providers/cart-provider";
import { formatPrice } from "../utils/format";

export default function CartPage() {
  const { items, totalItems, totalPrice, updateQuantity, removeItem } =
    useCart();

  if (items.length === 0) {
    return (
      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h1 className="text-2xl font-semibold text-slate-900">Seu carrinho</h1>
        <p className="mt-2 text-sm text-slate-600">
          Seu carrinho está vazio. Explore o catálogo e adicione produtos.
        </p>
        <Link
          href="/"
          className="mt-4 inline-flex rounded-xl border border-brand px-4 py-2 text-sm font-semibold text-brand transition hover:bg-brand-soft"
        >
          Ver catálogo
        </Link>
      </section>
    );
  }

  return (
    <div className="grid gap-6 pb-28 lg:grid-cols-[minmax(0,1fr)_320px] lg:pb-0">
      <section className="space-y-4">
        <header className="flex items-center justify-between">
          <div>
            <h1 className="text-2xl font-semibold text-slate-900">
              Seu carrinho
            </h1>
            <p className="text-sm text-slate-600">
              {totalItems} {totalItems === 1 ? "item" : "itens"} adicionados
            </p>
          </div>
          <Link
            href="/"
            className="rounded-xl border border-brand px-4 py-2 text-sm font-semibold text-brand transition hover:bg-brand-soft"
          >
            Continuar comprando
          </Link>
        </header>

        <div className="space-y-3">
          {items.map((item) => (
            <article
              key={item.id}
              className="flex flex-col gap-4 rounded-2xl border border-slate-200 bg-white p-4 shadow-sm sm:flex-row sm:items-center"
            >
              <div className="relative h-24 w-24 flex-shrink-0 overflow-hidden rounded-xl bg-slate-100">
                <Image
                  src={item.imageUrl ?? "/images/placeholder.svg"}
                  alt={`Foto do produto ${item.name}`}
                  fill
                  className="object-cover"
                  sizes="96px"
                />
              </div>
              <div className="flex-1 space-y-2">
                <div className="flex items-start justify-between gap-4">
                  <div>
                    <h2 className="text-base font-semibold text-slate-900">
                      {item.name}
                    </h2>
                    {item.options?.length ? (
                      <p className="text-xs text-slate-500">
                        {item.options.map((opt) => opt.value).join(" • ")}
                      </p>
                    ) : null}
                  </div>
                  <div className="text-sm font-semibold text-slate-900">
                    {formatPrice(item.price * item.quantity)}
                  </div>
                </div>
                <div className="flex flex-wrap items-center justify-between gap-3">
                  <div className="inline-flex items-center rounded-full border border-slate-200">
                    <button
                      type="button"
                      className="h-9 w-9 text-lg font-semibold text-slate-600 transition hover:bg-slate-100"
                      onClick={() =>
                        item.quantity === 1
                          ? removeItem(item.id)
                          : updateQuantity(item.id, item.quantity - 1)
                      }
                    >
                      -
                    </button>
                    <span className="px-3 text-sm font-semibold text-slate-700">
                      {item.quantity}
                    </span>
                    <button
                      type="button"
                      className="h-9 w-9 text-lg font-semibold text-slate-600 transition hover:bg-slate-100"
                      onClick={() =>
                        updateQuantity(item.id, item.quantity + 1)
                      }
                    >
                      +
                    </button>
                  </div>
                  <button
                    type="button"
                    className="text-xs font-semibold uppercase tracking-widest text-slate-400 transition hover:text-slate-600"
                    onClick={() => removeItem(item.id)}
                  >
                    Remover
                  </button>
                </div>
              </div>
            </article>
          ))}
        </div>
      </section>

      <aside className="h-fit rounded-2xl border border-slate-200 bg-white p-5 shadow-sm lg:sticky lg:top-6">
        <h2 className="text-lg font-semibold text-slate-900">Resumo</h2>
        <div className="mt-4 space-y-3 text-sm text-slate-600">
          <div className="flex items-center justify-between">
            <span>Subtotal</span>
            <span className="font-semibold text-slate-900">
              {formatPrice(totalPrice)}
            </span>
          </div>
          <div className="flex items-center justify-between">
            <span>Entrega</span>
            <span className="font-semibold text-slate-900">Sob consulta</span>
          </div>
          <div className="h-px bg-slate-200" />
          <div className="flex items-center justify-between text-base font-semibold text-slate-900">
            <span>Total</span>
            <span>{formatPrice(totalPrice)}</span>
          </div>
        </div>
        <Link
          href="/checkout"
          className="mt-4 hidden w-full items-center justify-center rounded-xl bg-brand px-4 py-3 text-sm font-semibold text-white transition hover:bg-brand-dark lg:flex"
        >
          Finalizar pedido
        </Link>
      </aside>
      <div className="fixed inset-x-4 bottom-4 z-20 rounded-2xl border border-slate-200 bg-white/95 p-4 shadow-lg backdrop-blur lg:hidden">
        <div className="flex items-center justify-between text-sm text-slate-600">
          <span>Total</span>
          <span className="text-base font-semibold text-slate-900">
            {formatPrice(totalPrice)}
          </span>
        </div>
        <Link
          href="/checkout"
          className="mt-3 flex w-full items-center justify-center rounded-xl bg-brand px-4 py-3 text-sm font-semibold text-white transition hover:bg-brand-dark"
        >
          Finalizar pedido
        </Link>
      </div>
    </div>
  );
}
