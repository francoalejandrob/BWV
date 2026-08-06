"use client";

import { createContext, useCallback, useContext, useMemo, useState } from "react";
import type { UiProduct } from "@/lib/catalog";

type QuickViewContextValue = {
  product: UiProduct | null;
  isOpen: boolean;
  open: (product: UiProduct) => void;
  close: () => void;
};

const QuickViewContext = createContext<QuickViewContextValue | null>(null);

export function QuickViewProvider({ children }: { children: React.ReactNode }) {
  const [product, setProduct] = useState<UiProduct | null>(null);
  const [isOpen, setIsOpen] = useState(false);

  const open = useCallback((p: UiProduct) => {
    setProduct(p);
    setIsOpen(true);
  }, []);

  const close = useCallback(() => setIsOpen(false), []);

  const value = useMemo(() => ({ product, isOpen, open, close }), [product, isOpen, open, close]);

  return <QuickViewContext.Provider value={value}>{children}</QuickViewContext.Provider>;
}

export function useQuickView() {
  const ctx = useContext(QuickViewContext);
  if (!ctx) throw new Error("useQuickView must be used within a QuickViewProvider");
  return ctx;
}
