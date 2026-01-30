"use client";

import { useCart } from "../providers/cart-provider";
import type { CartItemOption } from "../types/cart-item";

type AddToCartButtonProps = {
  productId: string;
  name: string;
  price: number;
  imageUrl?: string;
  options?: CartItemOption[];
  notes?: string;
  className?: string;
  disabled?: boolean;
};

export default function AddToCartButton({
  productId,
  name,
  price,
  imageUrl,
  options,
  notes,
  className,
  disabled = false,
}: AddToCartButtonProps) {
  const { addItem } = useCart();

  const itemId =
    options && options.length > 0
      ? `${productId}-${JSON.stringify(options)}`
      : productId;

  return (
    <button
      type="button"
      className={
        className ??
        "w-full rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
      }
      disabled={disabled}
      onClick={() =>
        addItem({
          id: itemId,
          productId,
          name,
          price,
          quantity: 1,
          imageUrl,
          options,
          notes,
        })
      }
    >
      Adicionar ao carrinho
    </button>
  );
}
