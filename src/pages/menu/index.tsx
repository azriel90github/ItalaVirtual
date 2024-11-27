import {
  ArrowLeft,
  CircleCheck,
  House,
  Minus,
  Plus,
  ShoppingCart,
  Trash2,
} from "lucide-react"; // Ícones do Lucide
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CartButton } from "../../components/buttons/cart-button";
import { Searchbox } from "../../components/searchBox/search-box";

// Tipo para os produtos
export interface Product {
  id: number;
  title: string;
  price: number;
  description: string;
  image?: string; // Imagem opcional
}


export function MenuPage() {
  const [products, setProducts] = useState<Product[]>([]);
  const [counts, setCounts] = useState<{ [key: number]: number }>({});
  const [, setTotals] = useState<{ [key: number]: number }>({});
  const [buttonColors, setButtonColors] = useState<{ [key: number]: string }>({});
  const [icons, setIcons] = useState<{ [key: number]: boolean }>({});
  const navigate = useNavigate();

  const [cartItems, setCartItems] = useState<(Product & { scoops: number; total: number })[]>([]); // Extensão da interface Product
  const updateCartItem = (id: number, scoops: number) => {
    const product = products.find((p) => p.id === id);
    if (product) {
      const existingItemIndex = cartItems.findIndex((item) => item.id === id);

      const updatedItem = {
        ...product, // Inclui todos os campos da interface Product
        scoops,
        total: product.price * scoops,
      };

      setCartItems((prev) => {
        if (existingItemIndex !== -1) {
          // Atualiza o item existente
          const updatedCart = [...prev];
          updatedCart[existingItemIndex] = updatedItem;
          return updatedCart;
        // biome-ignore lint/style/noUselessElse: <explanation>
        } else {
          // Adiciona um novo item
          return [...prev, updatedItem];
        }
      });
    }
  };

  /**
  
  const [orderSummary, setOrderSummary] = useState<{ flavors: number; total: number }>({
    flavors: 0,
    total: 0,
  });

  const updateOrderSummary = () => {
    const flavors = Object.values(counts).filter((count) => count > 0).length;
    const total = Object.entries(counts).reduce((sum, [id, count]) => {
      const product = products.find((p) => p.id === Number(id));
      return sum + (product ? product.price * count : 0);
    }, 0);
  
    setOrderSummary({ flavors, total });
  };
  
  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
    useEffect(() => {
    updateOrderSummary();
  }, [counts]); // Atualiza sempre que os contadores mudarem.
   */
  

  // Função para buscar os produtos do servidor
  const fetchProducts = async () => {
    try {
      const response = await fetch("http://localhost:3334/products");
      const data: Product[] = await response.json();

      setProducts(data);

      // Inicializando os estados para cada produto
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


  // Funções independentes para cada produto
  const incrementCount = (id: number) => {
    setCounts((prev) => {
      const newCount = (prev[id] || 0) + 1;
      updateTotal(id, newCount); // Atualiza o total com o novo count
      updateCartItem(id, newCount); // Atualiza o item no carrinho
      return {
        ...prev,
        [id]: newCount,
      };
    });
    updateTotal(id, counts[id] + 1);
  
    // Reseta o botão "Adicionar ao Carrinho" ao estado original
    setIcons((prev) => ({
      ...prev,
      [id]: false, // Ícone volta ao carrinho
    }));
    setButtonColors((prev) => ({
      ...prev,
      [id]: "", // Cor do botão volta ao estado original
    }));
    // Reseta os textos dos botões ao adicionar colheres
    setAddButtonTexts((prev) => ({
      ...prev,
      [id]: "Adicionar no Carrinho", // Reseta o texto do botão Adicionar
    }));

    setRemoveButtonTexts((prev) => ({
      ...prev,
      [id]: "Remover do Carrinho", // Reseta o texto do botão Remover
    }));
  };
  
  const decrementCount = (id: number) => {
    setCounts((prev) => {
      const newCount = Math.max((prev[id] || 0) - 1, 0);
      updateTotal(id, newCount); // Atualiza o total com o novo count
      updateCartItem(id, newCount); // Atualiza o item no carrinho
      return {
        ...prev,
        [id]: newCount,
      };
    });
    // Reseta o botão "Adicionar ao Carrinho" ao estado original
    setIcons((prev) => ({
      ...prev,
      [id]: false, // Ícone volta ao carrinho
    }));
    setButtonColors((prev) => ({
      ...prev,
      [id]: "", // Cor do botão volta ao estado original
    }));
    // Reseta os textos dos botões ao adicionar colheres
    setAddButtonTexts((prev) => ({
      ...prev,
      [id]: "Adicionar no Carrinho", // Reseta o texto do botão Adicionar
    }));

    setRemoveButtonTexts((prev) => ({
      ...prev,
      [id]: "Remover do Carrinho", // Reseta o texto do botão Remover
    }));
  };
  
  const [addButtonTexts, setAddButtonTexts] = useState<{ [key: number]: string }>({});
  const [removeButtonTexts, setRemoveButtonTexts] = useState<{ [key: number]: string }>({});


  const updateTotal = (id: number, count: number) => {
    // Encontre o produto correspondente pelo id
    const product = products.find((product) => product.id === id);
  
    if (product) {
      setTotals((prev) => ({
        ...prev,
        [id]: count * product.price, // Multiplicador com base no preço do banco
      }));
    }
  };

  const toggleIcon = (id: number) => {
    setIcons((prev) => ({
      ...prev,
      [id]: true, // Define o ícone para "check"
    }));
    setButtonColors((prev) => ({
      ...prev,
      [id]: "green", // Define o botão como verde
    }));
    setAddButtonTexts((prev) => ({
      ...prev,
      [id]: "Adicionado com Sucesso", // Atualiza o texto do botão Adicionar
    }));
    setRemoveButtonTexts((prev) => ({
      ...prev,
      [id]: "Remover do Carrinho", // Reseta o texto do botão Remover
    }));
  };

  const handleRemoveFromCart = (id: number) => {
    setCartItems((prev) => prev.filter((item) => item.id !== id));
    setCounts((prev) => ({
      ...prev,
      [id]: 0, // Reseta o contador de colheres
    }));
    setTotals((prev) => ({
      ...prev,
      [id]: 0, // Reseta o total
    }));
    setIcons((prev) => ({
      ...prev,
      [id]: false, // Reseta o ícone para o estado original
    }));
    setButtonColors((prev) => ({
      ...prev,
      [id]: "red", // Define o botão como vermelho ao remover
    }));
    setAddButtonTexts((prev) => ({
      ...prev,
      [id]: "Adicionar no Carrinho", // Reseta o texto do botão Adicionar
    }));
    setRemoveButtonTexts((prev) => ({
      ...prev,
      [id]: "Removido com Sucesso", // Atualiza o texto do botão Remover
    }));
  };
  
  // Estado para o sroller
	const [isScrolled, setIsScrolled] = useState(false);
  useEffect(() => {
		const handleScroll = () => {
			// Verifica se o usuário rolou mais de 50px da página
			if (window.scrollY > 50) {
				setIsScrolled(true);
			} else {
				setIsScrolled(false);
			}
		};
		window.addEventListener('scroll', handleScroll);
		// Limpar o event listener quando o componente for desmontado
		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	}, []);

  // Clicar na seta da página menu e levar para o início
  function HomePage() {
    navigate("/");
  }


	return (
		<div className="mx-auto space-y-9 bg-fundoHome bg-no-repeat bg-top bg-fixed">
			<div className={`border-b-2 border-colorInput h-20 shadow-shape bg-searchColor text-buttonColor flex flex-wrap items-center justify-around font-medium text-xl ${
					isScrolled ? '-translate-y-10' : 'translate-y-0'
				}`}>
				<div className="flex items-center">
					<button type="button" onClick={HomePage} className="flex gap-2"> {/* Clicar na seta da página menu e levar para o inicio*/}
						<ArrowLeft className="size-6" />
						<House />
					</button>
				</div>

				<div className="flex items-center" > 
					<CartButton cartItems={[]} />
				</div>
			</div>

				<div className="flex flex-wrap justify-center gap-4">
					{/** <ContactAndLanguage /> */}
					<Searchbox />
				</div>
        {/* Renderização dos cards */}
				<div className="flex flex-wrap gap-5 justify-center pb-10">
        {products.map((product) => (
          <div key={product.id} className="bg-searchColor rounded-3xl py-4 px-4 w-80 cardProd">
            {/* Informações do produto */}
            <div className="flex items-center justify-between py-2 px-3 text-xl font-medium">
              <p className="text-buttonColor text-xl">{product.title}</p>
              <span role="img" aria-label="favorite">
                ❤️
              </span>
            </div>
            <div className="py-3">
              <img
                className="mx-auto w-36 h-36 rounded-full"
                src="/menu/ice-cream 1.png"
                alt="Imagem do produto"
              />
            </div>
            <span className="flex justify-center text-zinc-200 font-normal text-2xl gap-2 py-3">
              <small className="text-lx">kz</small>
              <p className="text-6xl">{product.price}</p>
              <small className="text-lx">00</small>
            </span>
            <div className="text-buttonColor flex items-center justify-center gap-2 py-3">
							⭐ ⭐ ⭐ ⭐ ⭐
						</div>
            <p className="text-center py-4 mb-2 text-buttonColor font-light text-xl">
              {product.description || "Sem descrição disponível"}
            </p>
            <div className="flex flex-col gap-3">
              <button
                type="button"
                className="flex transition duration-400 bg-buttonColor2 hover:bg-colorHover text-zinc-100 py-3 px-5 w-full rounded-2xl justify-between"
              >
                <div>
                  Colheres <span className="ml-2">{counts[product.id]}</span>
                </div>
                <div className="flex gap-5">
                  <Plus onClick={() => incrementCount(product.id)} />
                  <Minus onClick={() => decrementCount(product.id)} />
                </div>
              </button>
              <button
                type="button"
                onClick={() => toggleIcon(product.id)}
                className={`flex transition duration-400 hover:bg-moneyColor text-zinc-100 py-3 px-5 w-full rounded-2xl justify-between ${
                  buttonColors[product.id] === "green" ? "bg-moneyColor" : "bg-buttonColor2"
                }`}
                disabled={counts[product.id] === 0}
              >
                {addButtonTexts[product.id] || "Adicionar no Carrinho"}
                {icons[product.id] ? <CircleCheck /> : <ShoppingCart />}
              </button>
              {/* Botão de Remover do Carrinho */}
              <button
                type="button"
                onClick={() => handleRemoveFromCart(product.id)}
                className={`flex transition duration-400 hover:bg-colorRemove text-zinc-100 py-3 px-5 w-full rounded-2xl justify-between ${
                  buttonColors[product.id] === "red" ? "bg-colorRemove" : "bg-buttonColor2"
                }`}
                disabled={counts[product.id] === 0} // Botão desativado se não houver colheres
              >
                {removeButtonTexts[product.id] || "Remover do Carrinho"}
                <Trash2 />
              </button>

            </div>
          </div>
        ))}
      </div>	

				<div className="flex pb-32 flex-wrap justify-center gap-4">
					{/** <ContactAndLanguage /> */}
					<Searchbox />
				</div>
				<footer
					className={`footerMenu flex flex-wrap h-20 items-center justify-around fixed bottom-0 left-0 w-full transition-transform duration-500 ease-in-out border-t-2 border-colorInput bg-searchColor ${
						isScrolled ? 'translate-y-0' : 'translate-y-full'
					}`}
				> 
					<div className="flex items-center">
						<button type="button" onClick={HomePage} className="flex gap-2 text-buttonColor"> {/* Clicar na seta da página menu e levar para o inicio*/}
							<ArrowLeft className="size-6" />
							<House />
						</button>
					</div>

					<div className="flex gap-4 items-center">
					<CartButton cartItems={[]} />
					</div>
				</footer>		 
		</div>
	);
}







