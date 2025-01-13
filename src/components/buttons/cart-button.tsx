import { t } from "i18next";
import { ShoppingCart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
// Importe o contexto

export function CartButton() {
  const { getUniqueFlavorsCount } = useCart(); // Acesse a função
  const totalUniqueFlavors = getUniqueFlavorsCount(); // Total de sabores únicos
  const navigate = useNavigate();

  function OrderPage() {
    navigate("/order/123");
  }

  return (
    // biome-ignore lint/a11y/useButtonType: <explanation>
		<button
      onClick={OrderPage}
      className="cartButton flex items-center justify-between w-72 hover:bg-colorHover hover:text-zinc-200 shadow-shape bg-buttonColor2 transition duration-400 text-zinc-200 rounded-2xl px-7 py-3.5"
    >
      <p>{t('buttons.cartButton')}</p>
      <p className="flex justify-center gap-2">
        <ShoppingCart />
        <p className="text-moneyColor1">{totalUniqueFlavors}</p> {/* Exibe o número de sabores únicos */}
      </p>
    </button>
  );
}

