// src/contexts/CartContext.tsx
import { createContext, useContext, useState, type ReactNode } from "react";

// Tipo para os itens do carrinho
interface CartItem {
  id: number;
  title: string;
  price: number;
  quantity: number;
  total: number;
}

// Tipo do contexto
interface CartContextType {
  cart: CartItem[];
  addToCart: (item: CartItem) => void;
  clearCart: () => void;
}

// Contexto inicial
const CartContext = createContext<CartContextType | undefined>(undefined);

// Provedor do contexto
export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [cart, setCart] = useState<CartItem[]>([]);

  // Adiciona ou atualiza um item no carrinho
  const addToCart = (item: CartItem) => {
    setCart((prevCart) => {
      const existingItem = prevCart.find((cartItem) => cartItem.id === item.id);

      if (existingItem) {
        // Atualiza o item existente
        return prevCart.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: item.quantity, total: item.total }
            : cartItem
        );
      }

      // Adiciona um novo item
      return [...prevCart, item];
    });
  };

  // Limpa o carrinho
  const clearCart = () => setCart([]);

  return (
    <CartContext.Provider value={{ cart, addToCart, clearCart }}>
      {children}
    </CartContext.Provider>
  );
};

// Hook para usar o contexto
export const useCart = () => {
  const context = useContext(CartContext);
  if (!context) {
    throw new Error("useCart deve ser usado dentro de um CartProvider");
  }
  return context;
};
