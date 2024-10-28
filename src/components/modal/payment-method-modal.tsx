import { CreditCard, HandCoins, Landmark } from "lucide-react";
import { type SetStateAction, useState } from "react";

export function PaymentMethodModal() {
	const [selectedOption, setSelectedOption] = useState(""); // Estado para o valor selecionado
	// Função para fechar o modal e definir a opção selecionada
	const handleSelectOption = (option: SetStateAction<string>) => {
		setSelectedOption(option);
		setIsPaymentMethodModalOpen(false);
	};

	const [isPaymentMethodModalOpen, setIsPaymentMethodModalOpen] =
		useState(false);

	function openPaymentMethodModal() {
		setIsPaymentMethodModalOpen(true);
	}

	function closePaymentMethodModal() {
		setIsPaymentMethodModalOpen(false);
	}

	return (
		<>
			<input
				readOnly
				value={selectedOption}
				placeholder="Selecionar tipo de pagamento"
				type="text"
				onClick={openPaymentMethodModal}
				className="flex items-center justify-between cursor-pointer m-0 py-3 px-4 outline-none rounded-xl bg-searchColorInput text-headerColor border-2 border-searchColor focus:border-2 placeholder:text-headerColor font-medium text-lx"
			/>
			{isPaymentMethodModalOpen && (
				// biome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
				<div
					onClick={closePaymentMethodModal}
					className="fixed inset-0 bg-black/60 flex items-center justify-center"
				>
					{/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
					<div
						onClick={() => setIsPaymentMethodModalOpen(false)}
						className="w-[640px] rounded-xl py-5 px-6 bg-colorFundo"
					>
						{/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
						<div
							onClick={(e) => e.stopPropagation()}
							className="text-buttonColor font-medium text-xl"
						>
							<div className="flex items-center justify-between">
								Selecionar método de pagamento
								{/** <X className="size-6 cursor-pointer" /> */}
							</div>
							<div className="flex flex-col text-lx py-3 mt-2 gap-3">
								<button
									type="button"
									className="py-3 px-4 outline-none rounded-xl bg-searchColorInput flex items-center justify-between"
									onClick={() => handleSelectOption("Dinheiro em mão")}
								>
									Dinheiro em mão
									<HandCoins />
								</button>
								<button
									type="button"
									className="py-3 px-4 outline-none rounded-xl bg-searchColorInput flex items-center justify-between"
									onClick={() => handleSelectOption("Transferência Bancária")}
								>
									Transferência báncaria
									<Landmark />
								</button>
								<button
									type="button"
									className="py-3 px-4 outline-none rounded-xl bg-searchColorInput flex items-center justify-between"
									onClick={() => handleSelectOption("TPA (presencial)")}
								>
									TPA (presencial)
									<CreditCard />
								</button>
							</div>
						</div>
					</div>
				</div>
			)}
		</>
	);
}