import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Checkout | Cardápio Digital",
  description: "Finalize o pedido e envie os dados pelo WhatsApp.",
};

export default function CheckoutLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
