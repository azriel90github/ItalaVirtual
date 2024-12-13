import { //Importações
  ArrowLeft,

  House,

} from "lucide-react"; // Ícones do Lucide
//import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { CartButton } from "../../components/buttons/cart-button";

import { useCart } from "../../context/CartContext";
import { useParams } from "react-router-dom";


// Tipo para os produtos
export interface Product {
  id: string; // Alterado de number para string
  title: string; // Nome do produto
  price: number; // Preço do produto
  description: string; // Descrição do produto
  image?: string; // URL da imagem do produto (opcional)
}

export function ProductDetail() { 
  const {
    isScrolled,
  } = useCart();

  const navigate = useNavigate();

  const HomePage = () => {
    navigate("/");
  };

  const { id } = useParams();

  // Busque o produto pelo ID (ou carregue dos dados já existentes)
  const product = products.find((p) => p.id === parseInt(id));

  if (!product) return <p>Produto não encontrado</p>;


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

      <div>
        <h1>{product.title}</h1>
        <img src={getImageByTitle(product.title)} alt={`Product ${product.title}`} />
        <p>Descrição: {product.description}</p>
        <p>Preço: kz {product.price}.00</p>
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
