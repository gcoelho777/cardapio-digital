export interface CartItemOption {
  label: string;
  value: string | number;
}

export interface CartItem {
  id: string;
  productId: string;
  name: string;
  price: number;
  quantity: number;
  notes?: string;
  imageUrl?: string;
  options?: CartItemOption[];
}
