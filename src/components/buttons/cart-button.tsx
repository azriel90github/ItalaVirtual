import { t } from "i18next";
import { ShoppingCart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import type { Product } from "../../pages/menu/index";// Importe sua interface Product~

interface CartButtonProps {
  cartItems: (Product & { scoops: number; total: number })[]; // Dados do carrinho
}

export function CartButton({ cartItems }: CartButtonProps) {
	const navigate = useNavigate(); // Esportar useNavigate do react-router-dom
	function OrderPage() {
    navigate("/order/123" , { state: { cartItems } });
  }

	return (
		// biome-ignore lint/a11y/useButtonType: <explanation>
		<button
			onClick={OrderPage}
			className="cartButton flex items-center justify-between w-72 hover:bg-colorHover hover:text-zinc-200 shadow-shape bg-buttonColor2 transition duration-400 text-zinc-200 rounded-2xl px-7 py-3.5"
		>
			{t('buttons.cartButton')}
			<ShoppingCart />
		</button>
	);
}