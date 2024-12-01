import { //Importações
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
  id: number; // Identificador único do produto
  title: string; // Nome do produto
  price: number; // Preço do produto
  description: string; // Descrição do produto
  image?: string; // URL da imagem do produto (opcional)
}

export function MenuPage() {
  // Estado para armazenar os produtos recebidos do servidor
  const [products, setProducts] = useState<Product[]>([]);
  
  // Estado para armazenar a quantidade de itens adicionados para cada produto
  const [counts, setCounts] = useState<{ [key: number]: number }>({});

  // Estado para armazenar o total (quantidade * preço) para cada produto
  const [ totals, setTotals] = useState<{ [key: number]: number }>({});
  
  // Estado para armazenar a cor dos botões (ex.: verde ao adicionar, vermelho ao remover)
  const [buttonColors, setButtonColors] = useState<{ [key: number]: string }>({});
  
  // Estado para alternar o ícone exibido (ex.: carrinho ou check)
  const [icons, setIcons] = useState<{ [key: number]: boolean }>({});

  const [cartItems, setCartItems] = useState<
    { id: number; title: string; price: number; count: number; total: number }[]
  >([]); // Dados do carrinho
  
  // Hook de navegação para redirecionar o usuário para outras páginas
  const navigate = useNavigate();

  // Função para buscar os produtos do servidor
  const fetchProducts = async () => {
    try {
      const response = await fetch("http://localhost:3334/products"); // Requisição à API local
      const data: Product[] = await response.json(); // Conversão da resposta em JSON

      setProducts(data); // Define os produtos no estado

      // Inicializa os estados relacionados a cada produto
      const initialCounts: { [key: number]: number } = {};
      const initialTotals: { [key: number]: number } = {};
      const initialColors: { [key: number]: string } = {};
      const initialIcons: { [key: number]: boolean } = {};

      // Prepara os estados iniciais com valores padrão para cada produto
      // biome-ignore lint/complexity/noForEach: <explanation>
        data.forEach((product) => {
        initialCounts[product.id] = 0; // Inicializa a quantidade como 0
        initialTotals[product.id] = 0; // Inicializa o total como 0
        initialColors[product.id] = ""; // Inicializa a cor do botão como vazia
        initialIcons[product.id] = false; // Inicializa o ícone como "não selecionado"
      });

      // Atualiza os estados com os valores iniciais
      setCounts(initialCounts);
      setTotals(initialTotals);
      setButtonColors(initialColors);
      setIcons(initialIcons);
    } catch (error) {
      console.error("Erro ao buscar produtos:", error); // Loga o erro, caso a requisição falhe
    }
  };

  // Chama a função de busca ao montar o componente
  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
    useEffect(() => {
    fetchProducts();
  }, []);

  // Incrementa a quantidade de um produto no carrinho
  const incrementCount = (id: number) => {
    setCounts((prevCounts) => {
      const newCount = (prevCounts[id] || 0) + 1; // Incrementa o contador do produto
      updateCart(id, newCount); // Atualiza o total baseado na nova quantidade
      return {
        ...prevCounts,
        [id]: newCount,
      };
    });



    // Reseta o botão para o estado padrão
    setIcons((prev) => ({ ...prev, [id]: false }));
    setButtonColors((prev) => ({ ...prev, [id]: "" }));
    setAddButtonTexts((prev) => ({ ...prev, [id]: "Adicionar no Carrinho" }));
    setRemoveButtonTexts((prev) => ({ ...prev, [id]: "Remover do Carrinho" }));
    setCartItems((prev) => prev.filter((item) => item.id !== id)); // Remove o item do carrinho
  };



  // Decrementa a quantidade de um produto no carrinho (mínimo de 0)
  const decrementCount = (id: number) => {
    setCounts((prevCounts) => {
      const newCount = Math.max((prevCounts[id] || 0) - 1, 0); // Garante que o contador não fique negativo
      updateCart(id, newCount); // Atualiza o total baseado na nova quantidade
      return {
        ...prevCounts,
        [id]: newCount,
      };
    });

    // Reseta o botão para o estado padrão
    setIcons((prev) => ({ ...prev, [id]: false }));
    setButtonColors((prev) => ({ ...prev, [id]: "" }));
    setAddButtonTexts((prev) => ({ ...prev, [id]: "Adicionar no Carrinho" }));
    setRemoveButtonTexts((prev) => ({ ...prev, [id]: "Remover do Carrinho" }));
  };

  // Estado para os textos dos botões "Adicionar" e "Remover"
  const [addButtonTexts, setAddButtonTexts] = useState<{ [key: number]: string }>({});
  const [removeButtonTexts, setRemoveButtonTexts] = useState<{ [key: number]: string }>({});

  // Atualiza o total (preço total do produto = quantidade * preço unitário)
  const updateCart = (id: number, count: number) => {
    const product = products.find((product) => product.id === id); // Busca o produto pelo ID
    if (!product) return;

    const total = count * product.price; // Calcula o total baseado na quantidade
    setTotals((prevTotals) => ({ ...prevTotals, [id]: total }));

    setCartItems((prevCartItems) => {
      // Atualiza o item existente ou adiciona um novo no carrinho
      const existingItem = prevCartItems.find((item) => item.id === id);
      if (existingItem) {
        if (count === 0) {
          // Remove o item se a quantidade for 0
          return prevCartItems.filter((item) => item.id !== id);
        // biome-ignore lint/style/noUselessElse: <explanation>
        } else {
          // Atualiza os dados do item
          return prevCartItems.map((item) =>
            item.id === id ? { ...item, count, total } : item
          );
        }
      // biome-ignore lint/style/noUselessElse: <explanation>
      } else if (count > 0) {
        // Adiciona um novo item ao carrinho
        return [...prevCartItems, { id, title: product.title, price: product.price, count, total }];
      }
      return prevCartItems; // Retorna o estado atual se nada mudar
    });
  };

  // Alterna o estado do ícone e a cor do botão
  const toggleIcon = (id: number) => {
    setIcons((prev) => ({ ...prev, [id]: true })); // Define o ícone como "check"
    setButtonColors((prev) => ({ ...prev, [id]: "green" })); // Define o botão como verde
    setAddButtonTexts((prev) => ({ ...prev, [id]: "Adicionado com Sucesso" })); // Atualiza o texto do botão Adicionar
    setRemoveButtonTexts((prev) => ({ ...prev, [id]: "Remover do Carrinho" })); // Reseta o texto do botão Remover
  };

  // Remove um produto do carrinho
  const handleRemoveFromCart = (id: number) => {
    setCounts((prev) => ({ ...prev, [id]: 0 })); // Reseta a quantidade para 0
    setTotals((prev) => ({ ...prev, [id]: 0 })); // Reseta o total para 0
    setIcons((prev) => ({ ...prev, [id]: false })); // Reseta o ícone para o estado padrão
    setButtonColors((prev) => ({ ...prev, [id]: "red" })); // Define o botão como vermelho
    setAddButtonTexts((prev) => ({ ...prev, [id]: "Adicionar no Carrinho" })); // Atualiza o texto do botão Adicionar
    setRemoveButtonTexts((prev) => ({ ...prev, [id]: "Removido com Sucesso" })); // Atualiza o texto do botão Remover
  };

  // Estado para verificar se o usuário rolou na página
  const [isScrolled, setIsScrolled] = useState(false);
  useEffect(() => {
    const handleScroll = () => {
      // Marca como rolado se passar de 50px
      setIsScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);

    // Remove o listener ao desmontar o componente
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  // Redireciona para a página inicial ao clicar em um botão
  function HomePage() {
    navigate("/"); // Redireciona para a página inicial
  }

  // Busca os produtos ao montar o componente
  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
    useEffect(() => {
    fetchProducts();
  }, []);

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







