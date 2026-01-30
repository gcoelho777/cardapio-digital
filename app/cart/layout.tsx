import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Carrinho | Cardápio Digital",
  description: "Revise os itens adicionados ao carrinho e ajuste quantidades.",
};

export default function CartLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
