import type { OrderDraft } from "../types/order-draft";

const formatPrice = (value: number) =>
  new Intl.NumberFormat("pt-BR", {
    style: "currency",
    currency: "BRL",
  }).format(value);

export const buildWhatsAppMessage = (orderDraft: OrderDraft) => {
  const {
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
  } = orderDraft;

  const lines: string[] = [];
  lines.push("Pedido - Cardápio Digital");
  lines.push("");
  lines.push(`Cliente: ${customerName}`);
  lines.push(`WhatsApp: ${customerPhone}`);
  lines.push(`Tipo: ${deliveryType === "entrega" ? "Entrega" : "Retirada"}`);
  if (deliveryType === "entrega" && customerAddress) {
    lines.push(`Endereço: ${customerAddress}`);
  }
  if (scheduledAt) {
    lines.push(`Agendamento: ${scheduledAt}`);
  }
  if (notes) {
    lines.push(`Observações: ${notes}`);
  }
  lines.push("");
  lines.push("Itens:");
  items.forEach((item) => {
    const optionLabel = item.options?.length
      ? ` (${item.options.map((opt) => opt.value).join(" • ")})`
      : "";
    lines.push(
      `- ${item.quantity}x ${item.name}${optionLabel} — ${formatPrice(
        item.price * item.quantity
      )}`
    );
  });
  lines.push("");
  lines.push(`Subtotal: ${formatPrice(subtotal)}`);
  if (typeof deliveryFee === "number") {
    lines.push(`Entrega: ${formatPrice(deliveryFee)}`);
  }
  lines.push(`Total: ${formatPrice(total)}`);

  return lines.join("\n");
};

export const buildWhatsAppUrl = (params: {
  phoneNumber: string;
  orderDraft: OrderDraft;
}) => {
  const { phoneNumber, orderDraft } = params;
  const message = buildWhatsAppMessage(orderDraft);
  return `https://wa.me/${phoneNumber}?text=${encodeURIComponent(message)}`;
};
