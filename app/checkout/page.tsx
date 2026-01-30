"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useCart } from "../providers/cart-provider";
import { formatPrice } from "../utils/format";
import { buildWhatsAppUrl } from "../utils/whatsapp";

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
  const [touched, setTouched] = useState({
    customerName: false,
    customerPhone: false,
    customerAddress: false,
    scheduledAt: false,
  });

  const deliveryFee = deliveryFeeInput
    ? Number(deliveryFeeInput.replace(",", "."))
    : undefined;

  const trimmedName = customerName.trim();
  const trimmedPhone = customerPhone.trim();
  const trimmedAddress = customerAddress.trim();

  const phoneDigits = trimmedPhone.replace(/\D/g, "");
  const phoneIsValid = phoneDigits.length === 10 || phoneDigits.length === 11;
  const deliveryFeeIsValid =
    deliveryFeeInput.trim() === "" ||
    (Number.isFinite(deliveryFee) && deliveryFee >= 0);
  const scheduledAtIsValid =
    scheduledAt !== "" && !Number.isNaN(Date.parse(scheduledAt));
  const scheduledDate = scheduledAtIsValid ? new Date(scheduledAt) : null;
  const now = new Date();
  const minLeadTimeMs = 2 * 60 * 60 * 1000;
  const minAllowedDate = new Date(now.getTime() + minLeadTimeMs);
  const withinBusinessHours = scheduledDate
    ? scheduledDate.getHours() >= 8 && scheduledDate.getHours() <= 18
    : false;
  const isNotPast = scheduledDate ? scheduledDate >= now : false;
  const hasMinimumLeadTime = scheduledDate
    ? scheduledDate >= minAllowedDate
    : false;
  const isSunday = scheduledDate ? scheduledDate.getDay() === 0 : false;
  const isSaturday = scheduledDate ? scheduledDate.getDay() === 6 : false;
  const isSaturdayAfternoon = scheduledDate
    ? isSaturday && scheduledDate.getHours() >= 12
    : false;
  const scheduleDayAllowed = !(isSunday || isSaturdayAfternoon);
  const schedulingRulesValid =
    scheduledAtIsValid &&
    isNotPast &&
    hasMinimumLeadTime &&
    withinBusinessHours &&
    scheduleDayAllowed;

  const nameIsValid = trimmedName.length >= 2;
  const addressIsValid =
    deliveryType === "entrega" ? trimmedAddress.length >= 5 : true;

  const formIsValid =
    items.length > 0 &&
    nameIsValid &&
    phoneIsValid &&
    addressIsValid &&
    deliveryFeeIsValid &&
    schedulingRulesValid;

  const subtotal = totalPrice;
  const total =
    subtotal + (typeof deliveryFee === "number" ? deliveryFee : 0);

  const whatsappNumber =
    process.env.NEXT_PUBLIC_WHATSAPP_NUMBER ?? "93991306374";
  const whatsappUrl = useMemo(() => {
    if (!formIsValid) {
      return "";
    }
    return buildWhatsAppUrl({
      phoneNumber: whatsappNumber,
      orderDraft: {
        id: "draft",
        items,
        subtotal,
        deliveryFee,
        total,
        customerName,
        customerPhone,
        customerAddress: deliveryType === "entrega" ? customerAddress : undefined,
        notes,
        deliveryType,
        scheduledAt: scheduledAt || undefined,
        createdAt: new Date().toISOString(),
      },
    });
  }, [
    formIsValid,
    whatsappNumber,
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
  ]);

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
    <div className="grid gap-6 pb-28 lg:grid-cols-[minmax(0,1fr)_360px] lg:pb-0">
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
              onBlur={() =>
                setTouched((prev) => ({ ...prev, customerName: true }))
              }
              className={`h-11 rounded-xl border px-4 text-base focus:outline-none ${
                touched.customerName && !nameIsValid
                  ? "border-rose-300 text-rose-600 focus:border-rose-400"
                  : "border-slate-200 text-slate-700 focus:border-slate-400"
              }`}
              placeholder="Seu nome completo"
            />
            {touched.customerName && !nameIsValid ? (
              <p className="text-xs text-rose-500">
                Informe seu nome completo.
              </p>
            ) : null}
          </div>

          <div className="grid gap-2">
            <label className="text-sm font-semibold text-slate-700">
              WhatsApp
            </label>
            <input
              value={customerPhone}
              onChange={(event) => setCustomerPhone(event.target.value)}
              onBlur={() =>
                setTouched((prev) => ({ ...prev, customerPhone: true }))
              }
              className={`h-11 rounded-xl border px-4 text-base focus:outline-none ${
                touched.customerPhone && !phoneIsValid
                  ? "border-rose-300 text-rose-600 focus:border-rose-400"
                  : "border-slate-200 text-slate-700 focus:border-slate-400"
              }`}
              placeholder="(DDD) 90000-0000"
            />
            {touched.customerPhone && !phoneIsValid ? (
              <p className="text-xs text-rose-500">
                Informe um WhatsApp válido.
              </p>
            ) : null}
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
                onBlur={() =>
                  setTouched((prev) => ({ ...prev, customerAddress: true }))
                }
                className={`h-11 rounded-xl border px-4 text-base focus:outline-none ${
                  touched.customerAddress && !addressIsValid
                    ? "border-rose-300 text-rose-600 focus:border-rose-400"
                    : "border-slate-200 text-slate-700 focus:border-slate-400"
                }`}
                placeholder="Rua, número, bairro"
              />
              {touched.customerAddress && !addressIsValid ? (
                <p className="text-xs text-rose-500">
                  Informe o endereço completo.
                </p>
              ) : null}
            </div>
          ) : null}

          <div className="grid gap-2">
            <label className="text-sm font-semibold text-slate-700">
              Agendamento
            </label>
            <input
              type="datetime-local"
              value={scheduledAt}
              onChange={(event) => setScheduledAt(event.target.value)}
              onBlur={() =>
                setTouched((prev) => ({ ...prev, scheduledAt: true }))
              }
              className={`h-11 rounded-xl border px-4 text-base focus:outline-none ${
                touched.scheduledAt && !schedulingRulesValid
                  ? "border-rose-300 text-rose-600 focus:border-rose-400"
                  : "border-slate-200 text-slate-700 focus:border-slate-400"
              }`}
            />
            {touched.scheduledAt && !schedulingRulesValid ? (
              <p className="text-xs text-rose-500">
                Agende para um horário válido (08h–18h), com 2h de antecedência
                e sem datas passadas. Não ocorre domingo e sábado após 12h.
              </p>
            ) : null}
          </div>

          <div className="grid gap-2">
            <label className="text-sm font-semibold text-slate-700">
              Observações
            </label>
            <textarea
              value={notes}
              onChange={(event) => setNotes(event.target.value)}
              className="min-h-[100px] rounded-xl border border-slate-200 px-4 py-3 text-base text-slate-700 focus:border-slate-400 focus:outline-none"
              placeholder="Ex: sem açúcar, ponto do bolo, etc."
            />
          </div>
        </div>
      </section>

      <aside className="h-fit rounded-2xl border border-slate-200 bg-white p-5 shadow-sm lg:sticky lg:top-6">
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
              className={`h-10 rounded-xl border px-3 text-base focus:outline-none ${
                !deliveryFeeIsValid
                  ? "border-rose-300 text-rose-600 focus:border-rose-400"
                  : "border-slate-200 text-slate-700 focus:border-slate-400"
              }`}
              placeholder="0,00"
            />
            {!deliveryFeeIsValid ? (
              <p className="text-xs text-rose-500">
                Informe um valor válido para entrega.
              </p>
            ) : null}
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
            formIsValid
              ? "bg-emerald-600 text-white hover:bg-emerald-500"
              : "cursor-not-allowed bg-slate-200 text-slate-500"
          }`}
          aria-disabled={!formIsValid}
          onClick={(event) => {
            if (!formIsValid) {
              event.preventDefault();
              setTouched((prev) => ({
                ...prev,
                customerName: true,
                customerPhone: true,
                customerAddress: deliveryType === "entrega",
                scheduledAt: true,
              }));
            }
          }}
        >
          Enviar pedido no WhatsApp
        </a>
        {!formIsValid ? (
          <p className="mt-3 text-xs text-slate-500">
            Preencha os dados obrigatórios para continuar.
          </p>
        ) : null}
      </aside>
      <div className="fixed inset-x-4 bottom-4 z-20 rounded-2xl border border-slate-200 bg-white/95 p-4 shadow-lg backdrop-blur lg:hidden">
        <div className="flex items-center justify-between text-sm text-slate-600">
          <span>Total</span>
          <span className="text-base font-semibold text-slate-900">
            {formatPrice(total)}
          </span>
        </div>
        <a
          href={whatsappUrl}
          target="_blank"
          rel="noreferrer"
          className={`mt-3 flex w-full items-center justify-center rounded-xl px-4 py-3 text-sm font-semibold transition ${
            formIsValid
              ? "bg-emerald-600 text-white hover:bg-emerald-500"
              : "cursor-not-allowed bg-slate-200 text-slate-500"
          }`}
          aria-disabled={!formIsValid}
          onClick={(event) => {
            if (!formIsValid) {
              event.preventDefault();
              setTouched((prev) => ({
                ...prev,
                customerName: true,
                customerPhone: true,
                customerAddress: deliveryType === "entrega",
                scheduledAt: true,
              }));
            }
          }}
        >
          Enviar no WhatsApp
        </a>
      </div>
    </div>
  );
}
