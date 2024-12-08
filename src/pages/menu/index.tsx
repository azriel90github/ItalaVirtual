import { //Importações
  ArrowLeft,
  CircleCheck,
  House,
  Minus,
  Plus,
  ShoppingCart,
  Trash2,
} from "lucide-react"; // Ícones do Lucide
//import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CartButton } from "../../components/buttons/cart-button";
import { Searchbox } from "../../components/searchBox/search-box";
import { useCart } from "../../context/CartContext";
import { useImage } from '../../context/ImageContext';
import { useState } from "react";

// Tipo para os produtos
export interface Product {
  id: string; // Alterado de number para string
  title: string; // Nome do produto
  price: number; // Preço do produto
  description: string; // Descrição do produto
  image?: string; // URL da imagem do produto (opcional)
}

export function MenuPage() { 
  const {
    products,
    counts,
    buttonColors,
    icons,
    addButtonTexts,
    removeButtonTexts,
    incrementCount,
    decrementCount,
    toggleIcon,
    handleRemoveFromCart,
    isScrolled,
  } = useCart();

  const navigate = useNavigate();

  const HomePage = () => {
    navigate("/");
  };

  const [selecteCategory, setSelectedCategory] = useState<string>("");

  // Função para filtrar os produtos com base no título selecionado
  const filteredProducts = selecteCategory
    ? products.filter((product) => product.category === selecteCategory)
    : products;

    const { getImageByTitle } = useImage(); // Atualizado para o novo método

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
					<CartButton />
				</div>
			</div>

				<div className="flex flex-wrap justify-center gap-4">
					{/** <ContactAndLanguage /> */}
					<Searchbox onCategorySelect={setSelectedCategory}  />
				</div>
        {/* Renderização dos cards */}
				<div className="flex flex-wrap gap-5 justify-center pb-10">
        {filteredProducts.map((product) => (
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
                src={getImageByTitle(product.title)} // Usando o título do produto
                alt={`Product ${product.title}`}
              />
            </div>
            <span className="flex justify-center text-zinc-200 font-normal text-2xl gap-2 py-3">
              <small className="text-lx">kz</small>
              <p className="text-6xl">{product.price}</p>
              <small className="text-lx">00</small>
            </span>

            <p className="text-center py-4 mb-2 text-buttonColor font-light text-xl">
              {/**/product.description || "Sem descrição disponível"}
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
					<Searchbox onCategorySelect={setSelectedCategory} />
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
					<CartButton />
					</div>
				</footer>		 
		</div>
	);
}







