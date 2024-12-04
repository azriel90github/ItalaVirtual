import { createContext, useState, useEffect, useContext, type ReactNode } from "react";

// Tipo para os produtos
export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  image?: string;
}

// Tipo para o carrinho
interface CartItem {
  id: number;
  title: string;
  price: number;
  count: number;
  total: number;
}

// Tipo para o contexto
interface CartContextData {
  products: Product[];
  counts: { [key: number]: number };
  totals: { [key: number]: number };
  buttonColors: { [key: number]: string };
  icons: { [key: number]: boolean };
  addButtonTexts: { [key: number]: string };
  removeButtonTexts: { [key: number]: string };
  cartItems: CartItem[];
  isScrolled: boolean;
  incrementCount: (id: number) => void;
  decrementCount: (id: number) => void;
  toggleIcon: (id: number) => void;
  handleRemoveFromCart: (id: number) => void;

  // Novas funções adicionadas aqui
  getUniqueFlavorsCount: () => number;
  getTotalPayment: () => number;
}

// Criação do Contexto
const CartContext = createContext<CartContextData | undefined>(undefined);

export const CartProvider = ({ children }: { children: ReactNode }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [counts, setCounts] = useState<{ [key: number]: number }>({});
  const [totals, setTotals] = useState<{ [key: number]: number }>({});
  const [buttonColors, setButtonColors] = useState<{ [key: number]: string }>({});
  const [icons, setIcons] = useState<{ [key: number]: boolean }>({});
  const [addButtonTexts, setAddButtonTexts] = useState<{ [key: number]: string }>({});
  const [removeButtonTexts, setRemoveButtonTexts] = useState<{ [key: number]: string }>({});
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [isScrolled, setIsScrolled] = useState(false);

  // Função para buscar produtos
  const fetchProducts = async () => {
    try {
      const response = await fetch("http://localhost:3334/products");
      const data: Product[] = await response.json();
      setProducts(data);

      const initialCounts: { [key: number]: number } = {};
      const initialTotals: { [key: number]: number } = {};
      const initialColors: { [key: number]: string } = {};
      const initialIcons: { [key: number]: boolean } = {};

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

  const incrementCount = (id: number) => {
    setCounts((prevCounts) => {
      const newCount = (prevCounts[id] || 0) + 1;
      updateCart(id, newCount);
      return { ...prevCounts, [id]: newCount };
    });
    setIcons((prev) => ({ ...prev, [id]: false }));
    setButtonColors((prev) => ({ ...prev, [id]: "" }));
    setAddButtonTexts((prev) => ({ ...prev, [id]: "Adicionar no Carrinho" }));
    setRemoveButtonTexts((prev) => ({ ...prev, [id]: "Remover do Carrinho" }));
  };

  const decrementCount = (id: number) => {
    setCounts((prevCounts) => {
      const newCount = Math.max((prevCounts[id] || 0) - 1, 0);
      updateCart(id, newCount);
      return { ...prevCounts, [id]: newCount };
    });
    setIcons((prev) => ({ ...prev, [id]: false }));
    setButtonColors((prev) => ({ ...prev, [id]: "" }));
    setAddButtonTexts((prev) => ({ ...prev, [id]: "Adicionar no Carrinho" }));
    setRemoveButtonTexts((prev) => ({ ...prev, [id]: "Remover do Carrinho" }));
  };

  const updateCart = (id: number, count: number) => {
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
            item.id === id
              ? { ...item, count, total } // Atualiza o item no carrinho
              : item
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
            count, // Registra o número de colheres
            total, // Registra o valor total
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

  const toggleIcon = (id: number) => {
    setIcons((prev) => ({ ...prev, [id]: true }));
    setButtonColors((prev) => ({ ...prev, [id]: "green" }));
    setAddButtonTexts((prev) => ({ ...prev, [id]: "Adicionado com Sucesso" }));
    setRemoveButtonTexts((prev) => ({ ...prev, [id]: "Remover do Carrinho" }));
  };

  const handleRemoveFromCart = (id: number) => {
    setCounts((prev) => ({ ...prev, [id]: 0 }));
    setTotals((prev) => ({ ...prev, [id]: 0 }));
    setIcons((prev) => ({ ...prev, [id]: false }));
    setButtonColors((prev) => ({ ...prev, [id]: "red" }));
    setAddButtonTexts((prev) => ({ ...prev, [id]: "Adicionar no Carrinho" }));
    setRemoveButtonTexts((prev) => ({ ...prev, [id]: "Removido com Sucesso" }));

    // Atualiza o carrinho
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
        getUniqueFlavorsCount, // Adicionado
        getTotalPayment,       // Adicionado
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
