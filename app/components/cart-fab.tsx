"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { useCart } from "../providers/cart-provider";

export default function CartFab() {
  const { totalItems, lastAddedAt } = useCart();
  const pathname = usePathname();
  const [animate, setAnimate] = useState(false);

  useEffect(() => {
    if (!lastAddedAt) {
      return;
    }
    setAnimate(true);
    const timer = window.setTimeout(() => setAnimate(false), 600);
    return () => window.clearTimeout(timer);
  }, [lastAddedAt]);

  if (pathname === "/cart" || pathname === "/checkout") {
    return null;
  }

  return (
    <Link
      href="/cart"
      className={`fixed bottom-5 right-5 z-30 flex h-14 w-14 items-center justify-center rounded-full bg-brand text-white shadow-lg transition hover:bg-brand-dark ${
        animate ? "cart-bounce" : ""
      }`}
      aria-label="Abrir carrinho"
    >
      <svg
        viewBox="0 0 24 24"
        aria-hidden="true"
        className="h-6 w-6"
        fill="none"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <circle cx="9" cy="21" r="1" />
        <circle cx="20" cy="21" r="1" />
        <path d="M1 1h4l2.6 12.4a2 2 0 0 0 2 1.6H19a2 2 0 0 0 2-1.6L23 6H6" />
      </svg>
      {totalItems > 0 ? (
        <span className="absolute -top-1 -right-1 flex h-5 min-w-[20px] items-center justify-center rounded-full bg-white px-1 text-[10px] font-semibold text-brand shadow">
          {totalItems}
        </span>
      ) : null}
    </Link>
  );
}
