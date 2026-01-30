"use client";

import { useMemo, useState } from "react";
import AddToCartButton from "./add-to-cart-button";

type ProductOption = {
  preco: number;
  peso_kg?: number;
  volume_l?: number;
};

type ProductPurchaseProps = {
  productId: string;
  name: string;
  imageUrl?: string;
  basePrice: number | null;
  options?: ProductOption[];
};

const formatPrice = (value: number) =>
  new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);

const getSizeLabel = (option: ProductOption) => {
  if (typeof option.peso_kg === "number") {
    return `${option.peso_kg} kg`;
  }
  if (typeof option.volume_l === "number") {
    return `${option.volume_l} L`;
  }
  return "Tamanho único";
};

export default function ProductPurchase({
  productId,
  name,
  imageUrl,
  basePrice,
  options,
}: ProductPurchaseProps) {
  const hasOptions = Boolean(options?.length);
  const [selectedIndex, setSelectedIndex] = useState<number | null>(null);

  const selectedOption = useMemo(() => {
    if (!hasOptions || !options) {
      return null;
    }
    if (selectedIndex === null) {
      return null;
    }
    return options[selectedIndex];
  }, [hasOptions, options, selectedIndex]);

  const price = selectedOption?.preco ?? basePrice;

  const selectedLabel = selectedOption ? getSizeLabel(selectedOption) : null;
  const selectionRequired = hasOptions && selectedOption === null;

  return (
    <div className="space-y-4">
      {hasOptions && options ? (
        <div className="space-y-2">
          <p className="text-sm font-semibold text-slate-700">
            Escolha o tamanho
          </p>
          <div className="grid gap-2 sm:grid-cols-2">
            {options.map((option, index) => {
              const label = getSizeLabel(option);
              const selected = index === selectedIndex;
              return (
                <label
                  key={`${option.preco}-${label}`}
                  className={`flex cursor-pointer items-center justify-between rounded-2xl border px-4 py-3 text-sm transition ${
                    selected
                      ? "border-slate-900 bg-slate-900 text-white"
                      : "border-slate-200 text-slate-700 hover:border-slate-300"
                  }`}
                >
                  <span>{label}</span>
                  <span className="font-semibold">
                    {formatPrice(option.preco)}
                  </span>
                  <input
                    type="radio"
                    name="product-option"
                    className="sr-only"
                    checked={selected}
                    onChange={() => setSelectedIndex(index)}
                  />
                </label>
              );
            })}
          </div>
          {selectionRequired ? (
            <p className="text-xs text-slate-500">
              Selecione um tamanho para adicionar ao carrinho.
            </p>
          ) : null}
        </div>
      ) : null}

      {price === null ? (
        <button
          type="button"
          className="w-full rounded-xl border border-slate-200 px-4 py-3 text-sm font-semibold text-slate-400"
          disabled
        >
          Sob consulta
        </button>
      ) : (
        <AddToCartButton
          productId={productId}
          name={name}
          price={price}
          imageUrl={imageUrl}
          options={
            selectedLabel
              ? [{ label: "Tamanho", value: selectedLabel }]
              : undefined
          }
          className={`w-full rounded-xl border px-4 py-3 text-sm font-semibold transition ${
            selectionRequired
              ? "border-slate-200 text-slate-400"
              : "border-slate-200 text-slate-700 hover:border-slate-300 hover:bg-slate-50"
          }`}
          disabled={selectionRequired}
        />
      )}
    </div>
  );
}
