"use client";

import { CartProvider } from "@/context/CartContext";
import { QuickViewProvider } from "@/context/QuickViewContext";

export default function Providers({ children }: { children: React.ReactNode }) {
  return (
    <CartProvider>
      <QuickViewProvider>{children}</QuickViewProvider>
    </CartProvider>
  );
}
