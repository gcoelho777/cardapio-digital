import "./globals.css";
import type { Metadata } from "next";
import CartLink from "./components/cart-link";
import { CartProvider } from "./providers/cart-provider";

export const metadata: Metadata = {
  title: "Cardápio Digital",
  description: "Catálogo simples para restaurantes",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="pt-BR">
      <body>
        <CartProvider>
          <header className="border-b border-slate-200 bg-white">
            <div className="mx-auto flex w-full max-w-5xl items-center justify-between px-4 py-4">
              <div>
                <p className="text-xs uppercase tracking-widest text-slate-500">MVP</p>
                <p className="text-xl font-semibold">Cardápio Digital</p>
              </div>
              <CartLink />
            </div>
          </header>
          <main>{children}</main>
        </CartProvider>
      </body>
    </html>
  );
}
