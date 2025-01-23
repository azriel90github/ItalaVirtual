import { Languages, X } from "lucide-react";
import { useState } from "react";
import i18n from "../../i18n";
import { t } from "i18next";
// Certifique-se de que o caminho para o i18n está correto

type Variant = "default" | "outlined" | "filled" | "iconOnly";

export function LanguageModal({ variant = "default" }: { variant?: Variant }) {

	function disableScroll() {
    document.body.style.overflow = "hidden";
  }
  
  function enableScroll() {
    document.body.style.overflow = "";
  }

	const [selectedOption, setSelectedOption] = useState(""); // Estado para o valor selecionado
	const [isLanguageModalOpen, setIsLanguageModalOpen] = useState(false);

	// Função para fechar o modal e definir a opção selecionada
	const handleSelectOption = (option: string, languageCode: string) => {
		// i18n.changeLanguage(Languages); // Muda o idioma globalmente
		setSelectedOption(option);
		i18n.changeLanguage(languageCode); // Muda o idioma de toda a aplicação
		setIsLanguageModalOpen(false);
		enableScroll(); // Reativa a rolagem após a seleção
	};

	function openLanguageModal() {
		setIsLanguageModalOpen(true);
		disableScroll(); // Bloqueia rolagem ao abrir
	}

	function closeLanguageModal() {
		setIsLanguageModalOpen(false);
		enableScroll(); // Desbloqueia rolagem ao fechar
	}

	const buttonStyles = {
		default: "",
		outlined: "text-buttonColor font-medium text-lg bg-searchColor w-96 flex justify-between font-medium flex items-center gap-2 px-2.5 py-2.5 rounded-full",
		filled: "",
		iconOnly: "",
  };

	return (
		<>
			<button
				value={selectedOption}
				onClick={openLanguageModal}
				type="button"
				className={ buttonStyles[variant] }
			>
				{variant !== "iconOnly" && <span className="bg-colorFundo w-full py-2.5 flex items-center justify-center rounded-full">Idiomas</span>}
				<Languages className="size-7 mr-3 ml-2" />
			</button>

			{isLanguageModalOpen && (
				// biome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
					<div
					onClick={closeLanguageModal}
					className="fixed inset-0 bg-black/60 flex items-center p-4 justify-center text-xl"
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
							{t('homepage.h3modal')}
								<X onClick={closeLanguageModal} className="cursor-pointer" />
							</div>

							<div className="flex flex-col py-3 mt-2 gap-3">
								<button
									type="button"
									className="py-2 px-5 outline-none rounded-xl transition duration-400 hover:text-zinc-300 hover:bg-buttonColor bg-searchColorInput flex items-center justify-between"
									onClick={() => handleSelectOption("Umbundu", "umb")}
								>
									<p className="text-zinc-300">{t('modal.modalLanguage.umbundu')}</p>
									<img className="w-10" src="/languages/angola.png" alt="emojiAngola" />
								</button>
								<button
									type="button"
									className="py-2 px-5 outline-none rounded-xl transition duration-400 hover:text-zinc-300 hover:bg-buttonColor bg-searchColorInput flex items-center justify-between"
									onClick={() => handleSelectOption("Kimbundu", "kmb")}
								>
									<p className="text-zinc-300">{t('modal.modalLanguage.kimbundo')}</p>
									<img className="w-10" src="/languages/angola.png" alt="emojiAngola" />
								</button>
								<button
									type="button"
									className="py-2 px-5 outline-none rounded-xl transition duration-400 hover:text-zinc-300 hover:bg-buttonColor bg-searchColorInput flex items-center justify-between"
									onClick={() => handleSelectOption("Lingala", "ln")}
								>
									<p className="text-zinc-300">{t('modal.modalLanguage.lingala')}</p>
									<img className="w-10" src="/languages/angola.png" alt="emojiAngola" />
								</button>
								<button
									type="button"
									className="py-2 px-5 outline-none rounded-xl transition duration-400 hover:text-zinc-300 hover:bg-buttonColor bg-searchColorInput flex items-center justify-between"
									onClick={() => handleSelectOption("Português", "pt")}
								>
									<p className="text-zinc-300">{t('modal.modalLanguage.portugues')}</p>
									<img className="w-10" src="/languages/portugal.png" alt="emojiPortugal" />
								</button>
								<button
									type="button"
									className="py-2 px-5 outline-none rounded-xl transition duration-400 hover:text-zinc-300 hover:bg-buttonColor bg-searchColorInput flex items-center justify-between"
									onClick={() => handleSelectOption("Inglês", "en")}
								>
									<p className="text-zinc-300">{t('modal.modalLanguage.ingles')}</p>
									<img className="w-10" src="/languages/eua.png" alt="emojiEUA" />
								</button>
								<button
									type="button"
									className="py-2 px-5 outline-none rounded-xl transition duration-400 hover:text-zinc-300 hover:bg-buttonColor bg-searchColorInput flex items-center justify-between"
									onClick={() => handleSelectOption("Espanhol", "es")}
								>
									<p className="text-zinc-300">{t('modal.modalLanguage.espanhol')}</p>
									<img className="w-10" src="/languages/espanha1.png" alt="emojiFrança" />
								</button>
								<button
									type="button"
									className="py-2 px-5 outline-none rounded-xl transition duration-400 hover:text-zinc-300 hover:bg-buttonColor bg-searchColorInput flex items-center justify-between"
									onClick={() => handleSelectOption("Francês", "fr")}
								>
									<p className="text-zinc-300">{t('modal.modalLanguage.frances')}</p>
									<img className="w-10" src="/languages/franca.png" alt="emojiFrança" />
								</button>
								{/**
								 * <button
									type="button"
									className="py-2 px-5 outline-none rounded-xl transition duration-400 hover:text-zinc-300 hover:bg-buttonColor bg-searchColorInput flex items-center justify-between"
									onClick={() => handleSelectOption("Chinês (Mandarim)", "zh")}
								>
									<p className="text-zinc-300">{t('modal.modalLanguage.chines')}</p>
									<img className="w-10" src="/languages/china.png" alt="emojiChina" />
								</button>
								 */}
								{/**
								 * <button
									type="button"
									className="py-2 px-5 outline-none rounded-xl transition duration-400 hover:text-zinc-300 hover:bg-buttonColor bg-searchColorInput flex items-center justify-between"
									onClick={() => handleSelectOption("Russo", "ru")}
								>
									<p className="text-zinc-300">{t('modal.modalLanguage.russo')}</p>
									<img className="w-10" src="/languages/russia.png" alt="emojiRussia" />
								</button>
								 */}
								
							</div>
						</div>
					</div>
				</div>
			)}
		</>
	);
}

