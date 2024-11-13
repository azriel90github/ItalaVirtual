import { ShoppingCart } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function CartButton() {
	const navigate = useNavigate(); // Esportar useNavigate do react-router-dom

	return (
		// biome-ignore lint/a11y/useButtonType: <explanation>
		<button
			onClick={() => navigate("/order/123")}
			className="cartButton flex items-center justify-between w-72 hover:bg-colorHover hover:text-zinc-200 shadow-shape bg-buttonColor2 transition duration-400 text-zinc-200 rounded-2xl px-7 py-3.5"
		>
			Carrinho
			<ShoppingCart />
		</button>
	);
}