"use client";

import Link from "next/link";
import { useCart } from "../providers/cart-provider";

export default function CartLink() {
  const { totalItems } = useCart();

  return (
    <Link
      href="/cart"
      className="relative inline-flex items-center gap-2 rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
    >
      Carrinho
      {totalItems > 0 ? (
        <span className="flex h-5 min-w-[20px] items-center justify-center rounded-full bg-slate-900 px-1 text-xs font-semibold text-white">
          {totalItems}
        </span>
      ) : null}
    </Link>
  );
}
