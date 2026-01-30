"use client";

import { useMemo } from "react";
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
};

export default function AddToCartButton({
  productId,
  name,
  price,
  imageUrl,
  options,
  notes,
  className,
}: AddToCartButtonProps) {
  const { addItem } = useCart();

  const itemId = useMemo(() => productId, [productId]);

  return (
    <button
      type="button"
      className={
        className ??
        "w-full rounded-xl border border-slate-200 px-4 py-2 text-sm font-semibold text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
      }
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
