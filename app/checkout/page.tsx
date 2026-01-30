"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useCart } from "../providers/cart-provider";

const formatPrice = (value: number) =>
  new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);

const buildWhatsAppMessage = (params: {
  items: ReturnType<typeof useCart>["items"];
  customerName: string;
  customerPhone: string;
  customerAddress?: string;
  notes?: string;
  deliveryType: "retirada" | "entrega";
  scheduledAt?: string;
  subtotal: number;
  deliveryFee?: number;
  total: number;
}) => {
  const {
    items,
    customerName,
    customerPhone,
    customerAddress,
    notes,
    deliveryType,
    scheduledAt,
    subtotal,
    deliveryFee,
    total,
  } = params;

  const lines: string[] = [];
  lines.push("Pedido - Cardápio Digital");
  lines.push("");
  lines.push(`Cliente: ${customerName}`);
  lines.push(`WhatsApp: ${customerPhone}`);
  lines.push(`Tipo: ${deliveryType === "entrega" ? "Entrega" : "Retirada"}`);
  if (deliveryType === "entrega" && customerAddress) {
    lines.push(`Endereço: ${customerAddress}`);
  }
  if (scheduledAt) {
    lines.push(`Agendamento: ${scheduledAt}`);
  }
  if (notes) {
    lines.push(`Observações: ${notes}`);
  }
  lines.push("");
  lines.push("Itens:");
  items.forEach((item) => {
    const optionLabel = item.options?.length
      ? ` (${item.options.map((opt) => opt.value).join(" • ")})`
      : "";
    lines.push(
      `- ${item.quantity}x ${item.name}${optionLabel} — ${formatPrice(
        item.price * item.quantity
      )}`
    );
  });
  lines.push("");
  lines.push(`Subtotal: ${formatPrice(subtotal)}`);
  if (typeof deliveryFee === "number") {
    lines.push(`Entrega: ${formatPrice(deliveryFee)}`);
  }
  lines.push(`Total: ${formatPrice(total)}`);

  return lines.join("\n");
};

export default function CheckoutPage() {
  const { items, totalPrice } = useCart();
  const [customerName, setCustomerName] = useState("");
  const [customerPhone, setCustomerPhone] = useState("");
  const [customerAddress, setCustomerAddress] = useState("");
  const [notes, setNotes] = useState("");
  const [deliveryType, setDeliveryType] = useState<"retirada" | "entrega">(
    "retirada"
  );
  const [scheduledAt, setScheduledAt] = useState("");
  const [deliveryFeeInput, setDeliveryFeeInput] = useState("");

  const deliveryFee = deliveryFeeInput
    ? Number(deliveryFeeInput.replace(",", "."))
    : undefined;

  const subtotal = totalPrice;
  const total =
    subtotal + (typeof deliveryFee === "number" ? deliveryFee : 0);

  const whatsappNumber = process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "";
  const whatsappMessage = useMemo(
    () =>
      buildWhatsAppMessage({
        items,
        customerName,
        customerPhone,
        customerAddress: deliveryType === "entrega" ? customerAddress : undefined,
        notes,
        deliveryType,
        scheduledAt: scheduledAt || undefined,
        subtotal,
        deliveryFee,
        total,
      }),
    [
      items,
      customerName,
      customerPhone,
      customerAddress,
      notes,
      deliveryType,
      scheduledAt,
      subtotal,
      deliveryFee,
      total,
    ]
  );

  const whatsappUrl = whatsappNumber
    ? `https://wa.me/${whatsappNumber}?text=${encodeURIComponent(
        whatsappMessage
      )}`
    : "";

  if (items.length === 0) {
    return (
      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <h1 className="text-2xl font-semibold text-slate-900">Checkout</h1>
        <p className="mt-2 text-sm text-slate-600">
          Seu carrinho está vazio. Adicione produtos antes de continuar.
        </p>
        <Link
          href="/"
          className="mt-4 inline-flex rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
        >
          Ver catálogo
        </Link>
      </section>
    );
  }

  return (
    <div className="grid gap-6 lg:grid-cols-[minmax(0,1fr)_360px]">
      <section className="rounded-2xl border border-slate-200 bg-white p-6 shadow-sm">
        <header className="space-y-2">
          <h1 className="text-2xl font-semibold text-slate-900">Checkout</h1>
          <p className="text-sm text-slate-600">
            Preencha os dados para finalizar o pedido.
          </p>
        </header>

        <div className="mt-6 grid gap-5">
          <div className="grid gap-2">
            <label className="text-sm font-semibold text-slate-700">
              Nome
            </label>
            <input
              value={customerName}
              onChange={(event) => setCustomerName(event.target.value)}
              className="h-11 rounded-xl border border-slate-200 px-4 text-sm text-slate-700 focus:border-slate-400 focus:outline-none"
              placeholder="Seu nome completo"
            />
          </div>

          <div className="grid gap-2">
            <label className="text-sm font-semibold text-slate-700">
              WhatsApp
            </label>
            <input
              value={customerPhone}
              onChange={(event) => setCustomerPhone(event.target.value)}
              className="h-11 rounded-xl border border-slate-200 px-4 text-sm text-slate-700 focus:border-slate-400 focus:outline-none"
              placeholder="(DDD) 90000-0000"
            />
          </div>

          <div className="grid gap-2">
            <label className="text-sm font-semibold text-slate-700">
              Tipo de pedido
            </label>
            <div className="flex flex-wrap gap-3">
              <button
                type="button"
                className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${
                  deliveryType === "retirada"
                    ? "border-slate-900 bg-slate-900 text-white"
                    : "border-slate-200 text-slate-700 hover:border-slate-300"
                }`}
                onClick={() => setDeliveryType("retirada")}
              >
                Retirada
              </button>
              <button
                type="button"
                className={`rounded-full border px-4 py-2 text-sm font-semibold transition ${
                  deliveryType === "entrega"
                    ? "border-slate-900 bg-slate-900 text-white"
                    : "border-slate-200 text-slate-700 hover:border-slate-300"
                }`}
                onClick={() => setDeliveryType("entrega")}
              >
                Entrega
              </button>
            </div>
          </div>

          {deliveryType === "entrega" ? (
            <div className="grid gap-2">
              <label className="text-sm font-semibold text-slate-700">
                Endereço
              </label>
              <input
                value={customerAddress}
                onChange={(event) => setCustomerAddress(event.target.value)}
                className="h-11 rounded-xl border border-slate-200 px-4 text-sm text-slate-700 focus:border-slate-400 focus:outline-none"
                placeholder="Rua, número, bairro"
              />
            </div>
          ) : null}

          <div className="grid gap-2">
            <label className="text-sm font-semibold text-slate-700">
              Agendamento (opcional)
            </label>
            <input
              type="datetime-local"
              value={scheduledAt}
              onChange={(event) => setScheduledAt(event.target.value)}
              className="h-11 rounded-xl border border-slate-200 px-4 text-sm text-slate-700 focus:border-slate-400 focus:outline-none"
            />
          </div>

          <div className="grid gap-2">
            <label className="text-sm font-semibold text-slate-700">
              Observações
            </label>
            <textarea
              value={notes}
              onChange={(event) => setNotes(event.target.value)}
              className="min-h-[100px] rounded-xl border border-slate-200 px-4 py-3 text-sm text-slate-700 focus:border-slate-400 focus:outline-none"
              placeholder="Ex: sem açúcar, ponto do bolo, etc."
            />
          </div>
        </div>
      </section>

      <aside className="h-fit rounded-2xl border border-slate-200 bg-white p-5 shadow-sm">
        <h2 className="text-lg font-semibold text-slate-900">
          Resumo do pedido
        </h2>
        <div className="mt-4 space-y-3 text-sm text-slate-600">
          <div className="space-y-2">
            {items.map((item) => (
              <div
                key={item.id}
                className="flex items-start justify-between gap-4"
              >
                <div>
                  <p className="font-semibold text-slate-800">
                    {item.quantity}x {item.name}
                  </p>
                  {item.options?.length ? (
                    <p className="text-xs text-slate-500">
                      {item.options.map((opt) => opt.value).join(" • ")}
                    </p>
                  ) : null}
                </div>
                <span className="font-semibold text-slate-900">
                  {formatPrice(item.price * item.quantity)}
                </span>
              </div>
            ))}
          </div>
          <div className="h-px bg-slate-200" />
          <div className="flex items-center justify-between">
            <span>Subtotal</span>
            <span className="font-semibold text-slate-900">
              {formatPrice(subtotal)}
            </span>
          </div>
          <div className="grid gap-2">
            <label className="text-xs font-semibold uppercase tracking-widest text-slate-500">
              Taxa de entrega (opcional)
            </label>
            <input
              inputMode="decimal"
              value={deliveryFeeInput}
              onChange={(event) => setDeliveryFeeInput(event.target.value)}
              className="h-10 rounded-xl border border-slate-200 px-3 text-sm text-slate-700 focus:border-slate-400 focus:outline-none"
              placeholder="0,00"
            />
          </div>
          <div className="flex items-center justify-between text-base font-semibold text-slate-900">
            <span>Total</span>
            <span>{formatPrice(total)}</span>
          </div>
        </div>
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noreferrer"
          className={`mt-4 flex w-full items-center justify-center rounded-xl px-4 py-3 text-sm font-semibold transition ${
            whatsappNumber
              ? "bg-emerald-600 text-white hover:bg-emerald-500"
              : "cursor-not-allowed bg-slate-200 text-slate-500"
          }`}
          aria-disabled={!whatsappNumber}
          onClick={(event) => {
            if (!whatsappNumber) {
              event.preventDefault();
            }
          }}
        >
          Enviar pedido no WhatsApp
        </a>
        {!whatsappNumber ? (
          <p className="mt-3 text-xs text-slate-500">
            Configure `NEXT_PUBLIC_WHATSAPP_NUMBER` para ativar o envio.
          </p>
        ) : null}
      </aside>
    </div>
  );
}
