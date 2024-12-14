import {
  ArrowLeft,
  House,
} from "lucide-react"; // Ícones do Lucide
import { useParams, useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
import { CartButton } from "../../components/buttons/cart-button";
// Supondo que esta função existe

export function ProductDetail() {
  const { isScrolled } = useCart();
  const navigate = useNavigate();

	const { id } = useParams<{ id: string }>(); // Força 'id' como string

  const { products } = useCart(); // Obtém os produtos do contexto

	const product = products.find((prod) => prod.id === id); // Para strings

	if (!product) {
		return <p>Produto não encontrado.</p>;
	}



  const goToHomePage = () => navigate("/");

  return (
    <div className="mx-auto space-y-9 bg-fundoHome bg-no-repeat bg-top bg-fixed">
      {/* Cabeçalho */}
      <div
        className={`border-b-2 border-colorInput h-20 shadow-shape bg-searchColor text-buttonColor flex flex-wrap items-center justify-around font-medium text-xl ${
          isScrolled ? "-translate-y-10" : "translate-y-0"
        }`}
      >
        <div className="flex items-center">
          <button type="button" onClick={goToHomePage} className="flex gap-2">
            <ArrowLeft size={24} />
            <House size={24} />
          </button>
        </div>
        <div className="flex items-center">
          <CartButton />
        </div>
      </div>
			{/* Cabeçalho */}
			<div className="bg-white rounded-lg shadow-lg p-6">
        <h1 className="text-2xl font-bold">{product.title}</h1>
        <img
          src={product.image}
          alt={product.title}
          className="w-48 h-48 object-cover mx-auto my-4"
        />
        <p className="text-gray-600 mb-4">{product.description}</p>
        <p className="text-green-500 font-bold text-xl">
          kz {product.price},00
        </p>
      </div>
     
      {/* Rodapé */}
      <footer
        className={`footerMenu flex flex-wrap h-20 items-center justify-around fixed bottom-0 left-0 w-full transition-transform duration-500 ease-in-out border-t-2 border-colorInput bg-searchColor ${
          isScrolled ? "translate-y-0" : "translate-y-full"
        }`}
      >
        <div className="flex items-center">
          <button
            type="button"
            onClick={goToHomePage}
            className="flex gap-2 text-buttonColor"
          >
            <ArrowLeft size={24} />
            <House size={24} />
          </button>
        </div>
        <div className="flex gap-4 items-center">
          <CartButton />
        </div>
      </footer>
    </div>
  );
}
