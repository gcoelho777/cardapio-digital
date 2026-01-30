import "./globals.css";
import type { Metadata } from "next";
import Link from "next/link";

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
        <header className="border-b border-slate-200 bg-white">
          <div className="mx-auto flex w-full max-w-5xl items-center justify-between px-4 py-4">
            <div>
              <p className="text-xs uppercase tracking-widest text-slate-500">MVP</p>
              <p className="text-xl font-semibold">Cardápio Digital</p>
            </div>
            <Link
              href="/cart"
              className="rounded-full border border-slate-200 px-4 py-2 text-sm font-medium text-slate-700 transition hover:border-slate-300 hover:bg-slate-50"
            >
              Carrinho
            </Link>
          </div>
        </header>
        <main>{children}</main>
      </body>
    </html>
  );
}
