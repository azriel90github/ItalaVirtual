import { createContext, useState, useEffect, useContext, type ReactNode } from "react";

// Tipo para os produtos
export interface Product {
  id: string; // Alterado de number para string
  title: string;
  price: number;
  description: string;
  image?: string;
  heart: number;
  category: string;
}

// Tipo para o carrinho
interface CartItem {
  id: string; // Alterado de number para string
  title: string;
  price: number;
  count: number;
  total: number;
}

// Tipo para o contexto
interface CartContextData {
  products: Product[];
  counts: { [key: string]: number };
  totals: { [key: string]: number };
  buttonColors: { [key: string]: string };
  icons: { [key: string]: boolean };
  addButtonTexts: { [key: string]: string };
  removeButtonTexts: { [key: string]: string };
  cartItems: CartItem[];
  isScrolled: boolean;
  incrementCount: (id: string) => void;
  decrementCount: (id: string) => void;
  toggleIcon: (id: string) => void;
  handleRemoveFromCart: (id: string) => void;
  getUniqueFlavorsCount: () => number;
  getTotalPayment: () => number;
  resetCart: () => void;
}

// Criação do Contexto
const CartContext = createContext<CartContextData | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [counts, setCounts] = useState<{ [key: string]: number }>({});
  const [totals, setTotals] = useState<{ [key: string]: number }>({});
  const [buttonColors, setButtonColors] = useState<{ [key: string]: string }>({});
  const [icons, setIcons] = useState<{ [key: string]: boolean }>({});
  const [addButtonTexts, setAddButtonTexts] = useState<{ [key: string]: string }>({});
  const [removeButtonTexts, setRemoveButtonTexts] = useState<{ [key: string]: string }>({});
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isScrolled, setIsScrolled] = useState(false);

  const fetchProducts = async () => {
    try {
      const response = await fetch("http://localhost:3334/products");
      const data: Product[] = await response.json();
      setProducts(data);

      const initialCounts: { [key: string]: number } = {};
      const initialTotals: { [key: string]: number } = {};
      const initialColors: { [key: string]: string } = {};
      const initialIcons: { [key: string]: boolean } = {};

      // biome-ignore lint/complexity/noForEach: <explanation>
      data.forEach((product) => {
        initialCounts[product.id] = 0;
        initialTotals[product.id] = 0;
        initialColors[product.id] = "";
        initialIcons[product.id] = false;
      });

      setCounts(initialCounts);
      setTotals(initialTotals);
      setButtonColors(initialColors);
      setIcons(initialIcons);
    } catch (error) {
      console.error("Erro ao buscar produtos:", error);
    }
  };

  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
  useEffect(() => {
    fetchProducts();
  }, []);

  const incrementCount = (id: string) => {
    setCounts((prevCounts) => {
      const newCount = (prevCounts[id] || 0) + 1;
      return { ...prevCounts, [id]: newCount };
    });

    setIcons((prev) => ({ ...prev, [id]: false }));
    setButtonColors((prev) => ({ ...prev, [id]: "" }));
    setAddButtonTexts((prev) => ({ ...prev, [id]: "Adicionar no Carrinho" }));
    setRemoveButtonTexts((prev) => ({ ...prev, [id]: "Remover do Carrinho" }));
  };

  const decrementCount = (id: string) => {
    setCounts((prevCounts) => {
      const newCount = Math.max((prevCounts[id] || 0) - 1, 0);
      return { ...prevCounts, [id]: newCount };
    });

    setIcons((prev) => ({ ...prev, [id]: false }));
    setButtonColors((prev) => ({ ...prev, [id]: "" }));
    setAddButtonTexts((prev) => ({ ...prev, [id]: "Adicionar no Carrinho" }));
    setRemoveButtonTexts((prev) => ({ ...prev, [id]: "Remover do Carrinho" }));
  };

  const updateCart = (id: string, count: number) => {
    const product = products.find((product) => product.id === id);
    if (!product) return;

    const total = count * product.price;
    setTotals((prevTotals) => ({ ...prevTotals, [id]: total }));

    setCartItems((prevCartItems) => {
      const existingItem = prevCartItems.find((item) => item.id === id);
      if (existingItem) {
        if (count === 0) {
          return prevCartItems.filter((item) => item.id !== id);
        // biome-ignore lint/style/noUselessElse: <explanation>
        } else {
          return prevCartItems.map((item) =>
            item.id === id ? { ...item, count, total } : item
          );
        }
      // biome-ignore lint/style/noUselessElse: <explanation>
      } else if (count > 0) {
        return [
          ...prevCartItems,
          {
            id,
            title: product.title,
            price: product.price,
            count,
            total,
          },
        ];
      }
      return prevCartItems;
    });
  };

  const getUniqueFlavorsCount = () => cartItems.length;

  const getTotalPayment = () => {
    return cartItems.reduce((total, item) => total + item.total, 0);
  };

  const toggleIcon = (id: string) => {
    setIcons((prev) => ({ ...prev, [id]: true }));
    setButtonColors((prev) => ({ ...prev, [id]: "green" }));
    setAddButtonTexts((prev) => ({ ...prev, [id]: "Adicionado com Sucesso" }));
    setRemoveButtonTexts((prev) => ({ ...prev, [id]: "Remover do Carrinho" }));

    setCounts((prevCounts) => {
      const count = prevCounts[id] || 0;
      if (count > 0) {
        updateCart(id, count);
      }
      return prevCounts;
    });
  };

  const handleRemoveFromCart = (id: string) => {
    setCounts((prev) => ({ ...prev, [id]: 0 }));
    setTotals((prev) => ({ ...prev, [id]: 0 }));
    setIcons((prev) => ({ ...prev, [id]: false }));
    setButtonColors((prev) => ({ ...prev, [id]: "red" }));
    setAddButtonTexts((prev) => ({ ...prev, [id]: "Adicionar no Carrinho" }));
    setRemoveButtonTexts((prev) => ({ ...prev, [id]: "Removido com Sucesso" }));

    setCartItems((prevCartItems) => prevCartItems.filter((item) => item.id !== id));
  };

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, []);

  const resetCart = () => {
    setCounts({});
    setTotals({});
    setCartItems([]);
    setButtonColors({});
    setIcons({});
    setAddButtonTexts({});
    setRemoveButtonTexts({});
  };

  return (
    <CartContext.Provider
      value={{
        products,
        counts,
        totals,
        buttonColors,
        icons,
        addButtonTexts,
        removeButtonTexts,
        cartItems,
        isScrolled,
        incrementCount,
        decrementCount,
        toggleIcon,
        handleRemoveFromCart,
        getUniqueFlavorsCount,
        getTotalPayment,
        resetCart,
      }}
    >
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
