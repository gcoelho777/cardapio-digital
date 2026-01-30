import type { CartItem } from "./cart-item";

export type DeliveryType = "retirada" | "entrega";

export interface OrderDraft {
  id: string;
  items: CartItem[];
  subtotal: number;
  deliveryFee?: number;
  total: number;
  customerName: string;
  customerPhone: string;
  customerAddress?: string;
  notes?: string;
  deliveryType: DeliveryType;
  scheduledAt?: string;
  createdAt: string;
}
