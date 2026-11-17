"use client";

import { MENU, MenuItem } from "@/app/menu/section/menuData";
import React, {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
} from "react";

const STORAGE_KEY = "wrapz-cart-v1";
const MAX_QTY = 20;

export type CartLine = { item: MenuItem; qty: number };

type CartContextValue = {
  lines: CartLine[];
  count: number;
  subtotal: number;
  qtyOf: (id: string) => number;
  add: (id: string) => void;
  remove: (id: string) => void;
  removeAll: (id: string) => void;
  clear: () => void;
  isOpen: boolean;
  openCart: () => void;
  closeCart: () => void;
};

const CartContext = createContext<CartContextValue | null>(null);

export function CartProvider({ children }: { children: React.ReactNode }) {
  const [qtys, setQtys] = useState<Record<string, number>>({});
  const [hydrated, setHydrated] = useState(false);
  const [isOpen, setIsOpen] = useState(false);

  // Load saved cart (only keep items that still exist on the menu)
  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) {
        const parsed = JSON.parse(raw) as Record<string, number>;
        const clean: Record<string, number> = {};
        for (const [id, q] of Object.entries(parsed)) {
          if (MENU.some((m) => m.id === id) && Number.isInteger(q) && q > 0) {
            clean[id] = Math.min(q, MAX_QTY);
          }
        }
        setQtys(clean);
      }
    } catch {
      /* ignore */
    }
    setHydrated(true);
  }, []);

  useEffect(() => {
    if (!hydrated) return;
    try {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(qtys));
    } catch {
      /* ignore */
    }
  }, [qtys, hydrated]);

  const add = useCallback((id: string) => {
    setQtys((p) => ({ ...p, [id]: Math.min((p[id] ?? 0) + 1, MAX_QTY) }));
  }, []);

  const remove = useCallback((id: string) => {
    setQtys((p) => {
      const next = { ...p };
      if ((next[id] ?? 0) <= 1) delete next[id];
      else next[id] -= 1;
      return next;
    });
  }, []);

  const removeAll = useCallback((id: string) => {
    setQtys((p) => {
      const next = { ...p };
      delete next[id];
      return next;
    });
  }, []);

  const clear = useCallback(() => setQtys({}), []);
  const openCart = useCallback(() => setIsOpen(true), []);
  const closeCart = useCallback(() => setIsOpen(false), []);

  const lines = useMemo<CartLine[]>(
    () =>
      MENU.filter((m) => qtys[m.id] > 0).map((m) => ({
        item: m,
        qty: qtys[m.id],
      })),
    [qtys]
  );

  const count = useMemo(() => lines.reduce((n, l) => n + l.qty, 0), [lines]);
  const subtotal = useMemo(
    () => lines.reduce((n, l) => n + l.qty * l.item.price, 0),
    [lines]
  );

  const qtyOf = useCallback((id: string) => qtys[id] ?? 0, [qtys]);

  const value = useMemo(
    () => ({
      lines,
      count,
      subtotal,
      qtyOf,
      add,
      remove,
      removeAll,
      clear,
      isOpen,
      openCart,
      closeCart,
    }),
    [lines, count, subtotal, qtyOf, add, remove, removeAll, clear, isOpen, openCart, closeCart]
  );

  return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}

export function useCart() {
  const ctx = useContext(CartContext);
  if (!ctx) throw new Error("useCart must be used inside <CartProvider>");
  return ctx;
}