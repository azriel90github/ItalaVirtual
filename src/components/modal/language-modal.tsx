import { Languages, X } from "lucide-react";
import { type SetStateAction, useState } from "react";

export function LanguageModal() {
	const [selectedOption, setSelectedOption] = useState(""); // Estado para o valor selecionado
	// Função para fechar o modal e definir a opção selecionada
	const handleSelectOption = (option: SetStateAction<string>) => {
		setSelectedOption(option);
		setIsLanguageModalOpen(false);
	};

	const [isLanguageModalOpen, setIsLanguageModalOpen] = useState(false);

	function openLanguageModal() {
		setIsLanguageModalOpen(true);
	}

	function closeLanguageModal() {
		setIsLanguageModalOpen(false);
	}

	return (
		<>
			<button
				value={selectedOption}
				onClick={openLanguageModal}
				type="button"
				className="text-buttonColor mr-2"
			>
				<Languages className="size-7" />
			</button>

				{isLanguageModalOpen && (
					// biome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
					<div
						onClick={closeLanguageModal}
						className="fixed inset-0 bg-black/60 flex items-center justify-center text-xl"
					>
						{/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
						<div
							onClick={() => setIsLanguageModalOpen(false)}
							className="w-[640px] rounded-xl py-5 px-6 bg-colorFundo"
						>
							{/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
							<div
								onClick={(e) => e.stopPropagation()}
								className="text-buttonColor font-normal"
							>
								<div className="flex items-center justify-between text-2xl ml-1">
									Selecionar Idioma
									<X onClick={closeLanguageModal} className="cursor-pointer" />
									{/** <X className="size-6 cursor-pointer" /> */}
								</div>

								<div className="flex flex-col py-3 mt-2 gap-3">
								<button
										type="button"
										className="py-2 px-5 outline-none rounded-xl transition duration-400 hover:text-zinc-300 hover:bg-buttonColor bg-searchColorInput flex items-center justify-between"
										onClick={() => handleSelectOption("Transferência Bancária")}
									>
										<p className="text-zinc-300">Umbundu</p>
										<img className="w-10" src="/languages/angola.png" alt="emojiAngola" />
									</button>
									<button
										type="button"
										className="py-2 px-5 outline-none rounded-xl transition duration-400 hover:text-zinc-300 hover:bg-buttonColor bg-searchColorInput flex items-center justify-between"
										onClick={() => handleSelectOption("TPA (presencial)")}
									>
										<p className="text-zinc-300">Kimbundu</p>
										<img className="w-10" src="/languages/angola.png" alt="emojiAngola" />
									</button>
									<button
										type="button"
										className="py-2 px-5 outline-none rounded-xl transition duration-400 hover:text-zinc-300 hover:bg-buttonColor bg-searchColorInput flex items-center justify-between"
										onClick={() => handleSelectOption("Dinheiro em mão")}
									>
										<p className="text-zinc-300">Português</p>
										<img className="w-10" src="/languages/portugal.png" alt="emojiPortugal" />
									</button>
									<button
										type="button"
										className="py-2 px-5 outline-none rounded-xl transition duration-400 hover:text-zinc-300 hover:bg-buttonColor bg-searchColorInput flex items-center justify-between"
										onClick={() => handleSelectOption("TPA (presencial)")}
									>
										<p className="text-zinc-300">Inglês</p>
										<img className="w-10" src="/languages/eua.png" alt="emojiEUA" />
									</button>
                  <button
										type="button"
										className="py-2 px-5 outline-none rounded-xl transition duration-400 hover:text-zinc-300 hover:bg-buttonColor bg-searchColorInput flex items-center justify-between"
										onClick={() => handleSelectOption("TPA (presencial)")}
									>
										<p className="text-zinc-300">Francês</p>
										<img className="w-10" src="/languages/franca.png" alt="emojiFrança" />
									</button>
                  <button
										type="button"
										className="py-2 px-5 outline-none rounded-xl transition duration-400 hover:text-zinc-300 hover:bg-buttonColor bg-searchColorInput flex items-center justify-between"
										onClick={() => handleSelectOption("TPA (presencial)")}
									>
										<p className="text-zinc-300">Chinês (Mandarim)</p>
										<img className="w-10" src="/languages/china.png" alt="emojiChina" />
									</button>
                  <button
										type="button"
										className="py-2 px-5 outline-none rounded-xl transition duration-400 hover:text-zinc-300 hover:bg-buttonColor bg-searchColorInput flex items-center justify-between"
										onClick={() => handleSelectOption("TPA (presencial)")}
									>
										<p className="text-zinc-300">Russo</p>
										<img className="w-10" src="/languages/russia.png" alt="emojiRussia" />
									</button>
								</div>
							</div>
						</div>
					</div>
				)}
		</>
	);
}
