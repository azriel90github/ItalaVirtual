import { useNavigate, useLocation } from "react-router-dom";
import { useImage } from "../../context/ImageContext";
import { CartButton } from "../../components/buttons/cart-button";
import { ArrowLeft, House, QrCode, Star } from "lucide-react";
import { useCart } from "../../context/CartContext"; // Import cart context to handle counts and cart actions
import { CircleCheck, Plus, Minus, Trash2, ShoppingCart } from "lucide-react"; // Import icons for buttons

export function ProductDetail() {
  const navigate = useNavigate();
  const location = useLocation();
  const { getImageByTitle } = useImage();
  const { isScrolled, incrementCount, decrementCount, counts, toggleIcon, buttonColors, addButtonTexts, removeButtonTexts, icons, handleRemoveFromCart } = useCart(); // Using the CartContext for cart functionality

  // Dados do produto passado via state
  const product = location.state?.product;

  function menuPage() {
		navigate("/menu/123");
	}

  return (
    <div className="">
      {/* Cabeçalho */}
      <div className={`border-b-2 border-colorInput h-20 shadow-shape bg-searchColor text-buttonColor flex flex-wrap items-center justify-around font-medium text-xl ${
					isScrolled ? '-translate-y-10' : 'translate-y-0'
				}`}>
				<div className="flex items-center">
					<button type="button" onClick={menuPage} className="flex gap-2"> {/* Clicar na seta da página menu e levar para o inicio*/}
						<ArrowLeft className="size-6" />
						<House />
					</button>
				</div>

				<div className="flex items-center" > 
					<CartButton />
				</div>
			</div>

      <div className="">
        {/* Detalhes do produto */}
        {product ? (
          <div className="produtDetailMobile flex items-center pt-20 justify-center gap-10">
            <div>
              <img
                src={getImageByTitle(product.title)} // Usando a função do contexto para pegar a imagem
                alt={`Imagem de ${product.title}`}
                className="w-96 h-96 mx-auto"
              />
            </div>

            <div className="produtDetailDescMobile flex flex-col">
              <div>
                <div className="flex items-center gap-3 justify-between">
                  <h1 className="text-buttonColor text-4xl font-light">{product.title}</h1>
                  <p className="flex gap-2">
                    <QrCode className="text-zinc-200 size-7" />
                  </p>
                </div>
                <span className="flex text-zinc-200 font-normal mt-1 text-2xl gap-2 py-3">
                  <small className="text-2xl text-moneyColor1">kz</small>
                  <p className="text-8xl mt-1">{product.price}</p>
                  <small className="text-2xl">00</small>
                </span>
                {/* Div para estrelas */}
                <div className="starDiv flex my-3 pb-1">
                  {[...Array(4)].map((_, index) => (
                    // biome-ignore lint/suspicious/noArrayIndexKey: <explanation>
                  <Star key={index} className="text-yellow-400 mx-1" size={24} />
                  ))}
                </div>
              </div>
              <div className="flex flex-col">
                <h2 className="text-buttonColor text-[20px] font-medium">Descrição: </h2>
                <p className="text-xl w-96 text-zinc-200 mt-2">{product.description || "Descrição não disponível."}</p>
              </div>
              <div>
              <div className="produtDetailMobileButton flex w-80 flex-col gap-3 mt-10">
                <button
                  type="button"
                  className="flex transition duration-400 bg-buttonColor hover:bg-colorHover text-zinc-100 py-3 px-5 rounded-2xl justify-between"
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
                  className={`flex transition duration-400 hover:bg-moneyColor text-zinc-100 py-3 px-5 rounded-2xl justify-between ${
                    buttonColors[product.id] === "green" ? "bg-moneyColor" : "bg-searchColor"
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
                  className={`flex transition duration-400 hover:bg-colorRemove text-zinc-100 py-3 px-5 rounded-2xl justify-between ${
                    buttonColors[product.id] === "red" ? "bg-colorRemove" : "bg-searchColor"
                  }`}
                  disabled={counts[product.id] === 0}
                >
                  {removeButtonTexts[product.id] || "Remover do Carrinho"}
                  <Trash2 />
                </button>
            </div>
              </div>
            </div>
            <div>
              {/* Lógica do botão de adicionar/remover */}
        
            </div>
        
          </div>
        ) : (
          <p>Produto não encontrado!</p>
        )}
      </div>

      {/* Rodapé */}
      <footer
					className={`footerMenu flex flex-wrap h-20 items-center justify-around fixed bottom-0 left-0 w-full transition-transform duration-500 ease-in-out border-t-2 border-colorInput bg-searchColor ${
						isScrolled ? 'translate-y-0' : 'translate-y-full'
					}`}
				> 
					<div className="flex items-center">
						<button type="button" onClick={menuPage} className="flex gap-2 text-buttonColor"> {/* Clicar na seta da página menu e levar para o inicio*/}
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



