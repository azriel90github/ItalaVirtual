import { useState, useEffect, useRef } from "react";
import { t } from "i18next";
import { ShoppingCart } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useCart } from "../../context/CartContext";
// Importe o contexto

export function CartButton() {
  const { getUniqueFlavorsCount, cartItems } = useCart(); // Acesse o contexto do carrinho
  const totalUniqueFlavors = getUniqueFlavorsCount(); // Total de sabores únicos
  const navigate = useNavigate();
  const [buttonColorClass, setButtonColorClass] = useState("bg-buttonColor2"); // Estado para a cor do botão
  const prevCartItemsCount = useRef(cartItems.length); // UseRef para acompanhar o tamanho anterior do carrinho

  useEffect(() => {
    // Apenas pisca se houver adição (tamanho atual maior que o anterior)
    if (cartItems.length > prevCartItemsCount.current) {
      setButtonColorClass("bg-green-500"); // Cor temporária ao adicionar
      const timeout = setTimeout(() => {
        setButtonColorClass("bg-buttonColor2"); // Volta para a cor original
      }, 200); // Duração do efeito de piscar

      // Limpeza do timeout
      return () => clearTimeout(timeout);
    }

    // Atualiza o valor anterior do tamanho do carrinho
    prevCartItemsCount.current = cartItems.length;
  }, [cartItems]);

  function OrderPage() {
    navigate("/order/123");
  }

  return (
    // biome-ignore lint/a11y/useButtonType: <explanation>
		<button
      onClick={OrderPage}
      className={`cartButton flex items-center justify-between w-72 hover:bg-colorHover hover:text-zinc-200 shadow-shape transition duration-400 text-zinc-200 rounded-2xl px-7 py-3.5 ${buttonColorClass}`}
    >
      <p>{t('buttons.cartButton')}</p>
      <p className="flex justify-center gap-2">
        <ShoppingCart />
        <p>{totalUniqueFlavors}</p> {/* Exibe o número de sabores únicos */}
      </p>
    </button>
  );
}

