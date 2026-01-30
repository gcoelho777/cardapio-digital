"use client";

import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  type ReactNode,
} from "react";
import type { CartItem } from "../types/cart-item";

type CartState = {
  items: CartItem[];
};

type CartAction =
  | { type: "SET_ITEMS"; payload: CartItem[] }
  | { type: "ADD_ITEM"; payload: CartItem }
  | { type: "REMOVE_ITEM"; payload: { id: string } }
  | { type: "UPDATE_QUANTITY"; payload: { id: string; quantity: number } }
  | { type: "CLEAR_CART" };

type CartContextValue = {
  items: CartItem[];
  totalItems: number;
  totalPrice: number;
  addItem: (item: CartItem) => void;
  removeItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
};

const CartContext = createContext<CartContextValue | undefined>(undefined);

const initialState: CartState = {
  items: [],
};

const STORAGE_KEY = "cart_items_v1";

const cartReducer = (state: CartState, action: CartAction): CartState => {
  switch (action.type) {
    case "SET_ITEMS":
      return { items: action.payload };
    case "ADD_ITEM": {
      const existing = state.items.find((item) => item.id === action.payload.id);

      if (existing) {
        return {
          items: state.items.map((item) =>
            item.id === action.payload.id
              ? { ...item, quantity: item.quantity + action.payload.quantity }
              : item
          ),
        };
      }

      return { items: [...state.items, action.payload] };
    }
    case "REMOVE_ITEM":
      return {
        items: state.items.filter((item) => item.id !== action.payload.id),
      };
    case "UPDATE_QUANTITY":
      return {
        items: state.items.map((item) =>
          item.id === action.payload.id
            ? { ...item, quantity: action.payload.quantity }
            : item
        ),
      };
    case "CLEAR_CART":
      return { items: [] };
    default:
      return state;
  }
};

const calculateTotals = (items: CartItem[]) => {
  return items.reduce(
    (acc, item) => {
      acc.totalItems += item.quantity;
      acc.totalPrice += item.price * item.quantity;
      return acc;
    },
    { totalItems: 0, totalPrice: 0 }
  );
};

export function CartProvider({ children }: { children: ReactNode }) {
  const [state, dispatch] = useReducer(cartReducer, initialState);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }
    try {
      const stored = window.localStorage.getItem(STORAGE_KEY);
      if (!stored) {
        return;
      }
      const parsed = JSON.parse(stored) as CartItem[];
      if (Array.isArray(parsed)) {
        dispatch({ type: "SET_ITEMS", payload: parsed });
      }
    } catch {
      // Ignore malformed localStorage content.
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }
    try {
      window.localStorage.setItem(STORAGE_KEY, JSON.stringify(state.items));
    } catch {
      // Ignore write errors (e.g. quota exceeded).
    }
  }, [state.items]);

  const { totalItems, totalPrice } = useMemo(
    () => calculateTotals(state.items),
    [state.items]
  );

  const value = useMemo<CartContextValue>(
    () => ({
      items: state.items,
      totalItems,
      totalPrice,
      addItem: (item) => dispatch({ type: "ADD_ITEM", payload: item }),
      removeItem: (id) => dispatch({ type: "REMOVE_ITEM", payload: { id } }),
      updateQuantity: (id, quantity) =>
        dispatch({ type: "UPDATE_QUANTITY", payload: { id, quantity } }),
      clearCart: () => dispatch({ type: "CLEAR_CART" }),
    }),
    [state.items, totalItems, totalPrice]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart must be used within CartProvider");
  }
  return context;
}
