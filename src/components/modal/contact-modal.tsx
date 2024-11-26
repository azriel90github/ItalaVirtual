import { Facebook, Headset, Instagram, Mail, MessageCircle, Twitter, X, Youtube } from "lucide-react";
import { type SetStateAction, useState } from "react";
import { useTranslation } from "react-i18next";

export function ContactModal() {

	function disableScroll() {
		document.body.style.overflow = "hidden";
	}
	
	function enableScroll() {
		document.body.style.overflow = "";
	}

	const { t } = useTranslation()

	const [, setSelectedOption] = useState(""); // Estado para o valor selecionado
	// Função para fechar o modal e definir a opção selecionada
	const handleSelectOption = (option: SetStateAction<string>) => {
		setSelectedOption(option);
		setIsContactModalOpen(false);
	};

	const [isContactModalOpen, setIsContactModalOpen] = useState(false);

	function openContactModal() {
		setIsContactModalOpen(true);
		disableScroll();
	}

	function closeContactModal() {
		setIsContactModalOpen(false);
		enableScroll();
	}

	return (
		<>
			<button
				type="button"
				className="accountButton px-8 py-4 w-80 border-2 border-colorInput flex items-center justify-between bg-searchColor rounded-full shadow-shape text-buttonColor hover:bg-colorHover hover:text-zinc-200 transition duration-400 font-medium text-xl"
				onClick={openContactModal}
			>
				<p className="text-1xl font-normal">{t('homepage.buttonContact')}</p>
				<Headset />
			</button>
				{isContactModalOpen && (
					// biome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
					<div
						onClick={closeContactModal}
						className="fixed inset-0 bg-black/60 flex items-center justify-center"
					>
						{/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
						<div
							onClick={() => setIsContactModalOpen(false)}
							className="w-[640px] rounded-xl py-5 px-6 bg-colorFundo"
						>
							{/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
							<div
								onClick={(e) => e.stopPropagation()}
								className="text-buttonColor font-medium"
							>
								<div className="flex items-center justify-between text-xl ml-1">
									{t('modal.modalContact.title')}
									<X onClick={closeContactModal} className="cursor-pointer" />
									{/** <X className="size-6 cursor-pointer" /> */}
								</div>
								<div className="flex flex-col py-3 mt-2 gap-3">
								<h3 className="flex mx-2 text-lx">Número</h3>
                <button
										type="button"
										className="py-3 px-5 outline-none rounded-xl transition duration-400 hover:text-zinc-300 hover:bg-buttonColor bg-searchColorInput flex items-center justify-between"
										onClick={() => handleSelectOption("")}
									>
										<p className="text-zinc-300">Africel - 959 261 926</p>
                    <Headset />
									</button>
									<button
										type="button"
										className="py-3 px-5 outline-none rounded-xl transition duration-400 hover:text-zinc-300 hover:bg-buttonColor bg-searchColorInput flex items-center justify-between"
										onClick={() => handleSelectOption("")}
									>
										<p className="text-zinc-300">Unitel - 929 261 926</p>
                    <Headset />
									</button>
									<h3 className="flex mx-2 text-lx">Social</h3>
									<button
										type="button"
										className="py-3 px-5 outline-none rounded-xl transition duration-400 hover:text-zinc-300 hover:bg-buttonColor bg-searchColorInput flex items-center justify-between"
										onClick={() => handleSelectOption("")}
									>
                    <p className="text-zinc-300">WhatsApp</p>
                    <MessageCircle />
									</button>
									<button
										type="button"
										className="py-3 px-5 outline-none rounded-xl transition duration-400 hover:text-zinc-300 hover:bg-buttonColor bg-searchColorInput flex items-center justify-between"
										onClick={() => handleSelectOption("")}
									>
                    <p className="text-zinc-300">Twitter</p>
                    <Twitter />
									</button>
									<button
										type="button"
										className="py-3 px-5 outline-none rounded-xl transition duration-400 hover:text-zinc-300 hover:bg-buttonColor bg-searchColorInput flex items-center justify-between"
										onClick={() => handleSelectOption("")}
									>
										<p className="text-zinc-300">Instagram</p>
                    <Instagram />
									</button>
									<button
										type="button"
										className="py-3 px-5 outline-none rounded-xl transition duration-400 hover:text-zinc-300 hover:bg-buttonColor bg-searchColorInput flex items-center justify-between"
										onClick={() => handleSelectOption("")}
									>
                    <p className="text-zinc-300">Facebook</p>
                    <Facebook />
									</button>
									<button
										type="button"
										className="py-3 px-5 outline-none rounded-xl transition duration-400 hover:text-zinc-300 hover:bg-buttonColor bg-searchColorInput flex items-center justify-between"
										onClick={() => handleSelectOption("")}
									>
                    <p className="text-zinc-300">YouTube</p>
                    <Youtube />
									</button>
									<h3 className="flex mx-2 text-lx">Email</h3>
									<button
										type="button"
										className="py-3 px-5 outline-none rounded-xl transition duration-400 hover:text-zinc-300 hover:bg-buttonColor bg-searchColorInput flex items-center justify-between"
										onClick={() => handleSelectOption("")}
									>
                    <p className="text-zinc-300">azrielgithub@gmail.com</p>
                    <Mail />
									</button>
									<button
										type="button"
										className="py-3 px-5 outline-none rounded-xl transition duration-400 hover:text-zinc-300 hover:bg-buttonColor bg-searchColorInput flex items-center justify-between"
										onClick={() => handleSelectOption("")}
									>
                    <p className="text-zinc-300">azrielmoreira@gmail.com</p>
                    <Mail />
									</button>
									
								</div>
							</div>
						</div>
					</div>
				)}
		</>
	);
}
