import { CircleDollarSign, X } from "lucide-react";
import { useState } from "react";

export function PaymentMethodModal() {

  const [isPaymentMethodModalOpen, setIsPaymentMethodModalOpen] = useState(false);

  function openPaymentMethodModal() {
    setIsPaymentMethodModalOpen(true);
  }

  function closePaymentMethodModal() {
    setIsPaymentMethodModalOpen(false);
  }

  return (
		<>
			<button
				type="button"
				onClick={openPaymentMethodModal}
				className="flex text-lg hover:bg-colorHover bg-buttonColor2 text-zinc-100 py-3 px-5 w-full rounded-2xl justify-between transition duration-400"
			>
				Método de Pagamento
				<CircleDollarSign />
			</button>
			<div>
				{isPaymentMethodModalOpen && (
					// biome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
					<div
						onClick={closePaymentMethodModal}
						className="fixed inset-0 bg-black/60 flex items-center justify-center"
					>
						<div className="w-[640px] rounded-3xl py-5 px-6 bg-colorFundo">
							<div className="flex items-center justify-between text-buttonColor font-medium text-xl">
								Selecionar método de pagamento
								<X className="size-6 cursor-pointer" />
							</div>
						</div>
					</div>
				)}
			</div>
		</>
	);
}