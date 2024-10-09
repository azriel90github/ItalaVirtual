import { ShoppingCart } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function CartButton() {

  const navigate = useNavigate(); // Esportar useNavigate do react-router-dom

	function orderPage() {
		// Navegar para a pagina orderPage
		navigate("/order/123");
	}

  return (
    // biome-ignore lint/a11y/useButtonType: <explanation>
    <button
      onClick={orderPage}
      className="flex items-center justify-between w-72 hover:bg-colorHover hover:text-zinc-100 shadow-shape bg-buttonColor2 transition duration-400 text-zinc-100 rounded-2xl px-7 py-3.5"
    >
      Carrinho
      <ShoppingCart />
    </button>
  )
}