import { createContext, useContext, useState, useEffect } from "react";
import type { ReactNode } from "react";

type Product = {
  id: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
  discount: number;
  original: number;
  size: string;
};

type CartContextType = {
  cart: Product[];
  addToCart: (product: Product) => void;
  removeFromCart: (id: string, size: string) => void;
  increment: (id: string, size: string) => void;
  decrement: (id: string, size: string) => void;
};


const CartContext = createContext<CartContextType | undefined>(undefined);

export function CartProvider({ children }: { children: ReactNode }) {
  const [cart, setCart] = useState<Product[]>(() => {
    const storedCart = localStorage.getItem("cart");
    return storedCart ? JSON.parse(storedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem("cart", JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product: Product) => {
    setCart((prev) => {
      const existing = prev.find((p) => p.id === product.id && p.size === product.size);
      if (existing) {
        return prev.map((p) =>
          p.id === product.id && p.size === product.size
            ? { ...p, quantity: p.quantity + product.quantity }
            : p
        );
      }
      return [...prev, product];
    });
  };
  

  const removeFromCart = (id: string, size: string) => {
    setCart((prev) => prev.filter((p) => !(p.id === id && p.size === size)));
  };
  
  const increment = (id: string, size: string) => {
    setCart((prev) =>
      prev.map((p) =>
        p.id === id && p.size === size
          ? { ...p, quantity: p.quantity + 1 }
          : p
      )
    );
  };
  
  const decrement = (id: string, size: string) => {
    setCart((prev) =>
      prev.map((p) =>
        p.id === id && p.size === size && p.quantity > 1
          ? { ...p, quantity: p.quantity - 1 }
          : p
      )
    );
  };
  

  return (
    <CartContext.Provider value={{ cart, addToCart, removeFromCart, increment, decrement }}>
      {children}
    </CartContext.Provider>
  );
}

export function useCart() {
  const context = useContext(CartContext);
  if (!context) throw new Error("useCart must be used within a CartProvider");
  return context;
}
