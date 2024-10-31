import { Logs, X } from "lucide-react";
import { type SetStateAction, useState } from "react";

export function SearchBoxModal() {
	const [, setSelectedOption] = useState(""); // Estado para o valor selecionado
	// Função para fechar o modal e definir a opção selecionada
	const handleSelectOption = (option: SetStateAction<string>) => {
		setSelectedOption(option);
		setIsSearchBoxModalOpen(false);
	};

	const [isSearchBoxModalOpen, setIsSearchBoxModalOpen] = useState(false);

	function openSearchBoxModal() {
		setIsSearchBoxModalOpen(true);
	}

	function closeSearchBoxModal() {
		setIsSearchBoxModalOpen(false);
	}

	return (
		<>
			{/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
      <div
				onClick={openSearchBoxModal}
				className="bg-colorFundo w-full flex items-center rounded-full py-2.5 px-5 justify-between"
      >
        Categoria
        <Logs />
      </div>
			{isSearchBoxModalOpen && (
				// biome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
				<div
					onClick={closeSearchBoxModal}
					className="fixed inset-0 bg-black/60 flex items-center justify-center"
				>
					{/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
					<div
						onClick={() => setIsSearchBoxModalOpen(false)}
						className="w-[640px] rounded-xl py-5 px-6 bg-colorFundo"
					>
						{/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
						<div
							onClick={(e) => e.stopPropagation()}
							className="text-buttonColor font-medium"
						>
							<div className="flex items-center justify-between text-xl ml-1">
								Escolher categoria
								<X onClick={closeSearchBoxModal} className="cursor-pointer" />
								{/** <X className="size-6 cursor-pointer" /> */}
							</div>
							<div className="flex flex-col py-3 mt-2 gap-3">
								<button
									type="button"
									className="py-3 px-5 outline-none rounded-xl transition duration-400 hover:text-zinc-300 hover:bg-buttonColor bg-searchColorInput flex items-center justify-between"
									onClick={() => handleSelectOption("Dinheiro em mão")}
								>
									<p className="text-zinc-300">Menta</p>
									<Logs />
								</button>
								<button
									type="button"
									className="py-3 px-5 outline-none rounded-xl transition duration-400 hover:text-zinc-300 hover:bg-buttonColor bg-searchColorInput flex items-center justify-between"
									onClick={() => handleSelectOption("Transferência Bancária")}
								>
									<p className="text-zinc-300">Chocolate</p>
									<Logs />
								</button>
								<button
									type="button"
									className="py-3 px-5 outline-none rounded-xl transition duration-400 hover:text-zinc-300 hover:bg-buttonColor bg-searchColorInput flex items-center justify-between"
									onClick={() => handleSelectOption("TPA (presencial)")}
								>
									<p className="text-zinc-300">Morango</p>
									<Logs />
								</button>
							</div>
						</div>
					</div>
				</div>
			)}
		</>
	);
}