import { Languages, X } from "lucide-react";
import { useState } from "react";
import i18n from "../../i18n";
// Certifique-se de que o caminho para o i18n está correto

export function LanguageModal() {
	const [selectedOption, setSelectedOption] = useState(""); // Estado para o valor selecionado
	const [isLanguageModalOpen, setIsLanguageModalOpen] = useState(false);

	// Função para fechar o modal e definir a opção selecionada
	const handleSelectOption = (option: string, languageCode: string) => {
		setSelectedOption(option);
		i18n.changeLanguage(languageCode); // Muda o idioma de toda a aplicação
		setIsLanguageModalOpen(false);
	};

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
				<div
					onClick={closeLanguageModal}
					className="fixed inset-0 bg-black/60 flex items-center justify-center text-xl"
				>
					<div
						onClick={() => setIsLanguageModalOpen(false)}
						className="w-[640px] rounded-xl py-5 px-6 bg-colorFundo"
					>
						<div
							onClick={(e) => e.stopPropagation()}
							className="text-buttonColor font-normal"
						>
							<div className="flex items-center justify-between text-2xl ml-1">
								Selecionar Idioma
								<X onClick={closeLanguageModal} className="cursor-pointer" />
							</div>

							<div className="flex flex-col py-3 mt-2 gap-3">
								<button
									type="button"
									className="py-2 px-5 outline-none rounded-xl transition duration-400 hover:text-zinc-300 hover:bg-buttonColor bg-searchColorInput flex items-center justify-between"
									onClick={() => handleSelectOption("Umbundu", "umb")}
								>
									<p className="text-zinc-300">Umbundu</p>
									<img className="w-10" src="/languages/angola.png" alt="emojiAngola" />
								</button>
								<button
									type="button"
									className="py-2 px-5 outline-none rounded-xl transition duration-400 hover:text-zinc-300 hover:bg-buttonColor bg-searchColorInput flex items-center justify-between"
									onClick={() => handleSelectOption("Kimbundu", "kmb")}
								>
									<p className="text-zinc-300">Kimbundu</p>
									<img className="w-10" src="/languages/angola.png" alt="emojiAngola" />
								</button>
								<button
									type="button"
									className="py-2 px-5 outline-none rounded-xl transition duration-400 hover:text-zinc-300 hover:bg-buttonColor bg-searchColorInput flex items-center justify-between"
									onClick={() => handleSelectOption("Português", "pt")}
								>
									<p className="text-zinc-300">Português</p>
									<img className="w-10" src="/languages/portugal.png" alt="emojiPortugal" />
								</button>
								<button
									type="button"
									className="py-2 px-5 outline-none rounded-xl transition duration-400 hover:text-zinc-300 hover:bg-buttonColor bg-searchColorInput flex items-center justify-between"
									onClick={() => handleSelectOption("Inglês", "en")}
								>
									<p className="text-zinc-300">Inglês</p>
									<img className="w-10" src="/languages/eua.png" alt="emojiEUA" />
								</button>
								<button
									type="button"
									className="py-2 px-5 outline-none rounded-xl transition duration-400 hover:text-zinc-300 hover:bg-buttonColor bg-searchColorInput flex items-center justify-between"
									onClick={() => handleSelectOption("Francês", "fr")}
								>
									<p className="text-zinc-300">Francês</p>
									<img className="w-10" src="/languages/franca.png" alt="emojiFrança" />
								</button>
								<button
									type="button"
									className="py-2 px-5 outline-none rounded-xl transition duration-400 hover:text-zinc-300 hover:bg-buttonColor bg-searchColorInput flex items-center justify-between"
									onClick={() => handleSelectOption("Chinês (Mandarim)", "zh")}
								>
									<p className="text-zinc-300">Chinês (Mandarim)</p>
									<img className="w-10" src="/languages/china.png" alt="emojiChina" />
								</button>
								<button
									type="button"
									className="py-2 px-5 outline-none rounded-xl transition duration-400 hover:text-zinc-300 hover:bg-buttonColor bg-searchColorInput flex items-center justify-between"
									onClick={() => handleSelectOption("Russo", "ru")}
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

