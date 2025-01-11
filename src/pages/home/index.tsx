import { Library, MessageCircleMore, PersonStanding, Rss, ShoppingCart, SquareChartGantt, UserRoundCog } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { LanguageModal } from "../../components/modal/language-modal";
import { ProfileModal } from "../../components/modal/profile-modal";
//import { AccountButton } from "../../components/buttons/account-button";
import { ContactModal } from "../../components/modal/contact-modal";
//import { GalleryModal } from "../../components/modal/gallery-modal";
import { useTranslation } from 'react-i18next';

export function HomePage() {
	const { t } = useTranslation();
	const navigate = useNavigate();

	function menuPage() {
		navigate("/menu/123");
	}

	function orderPage() {
		navigate("/order/123");
	}

	function blogPage() {
		navigate("/blog/123");
	}

	function AccessibilityPage() {
		navigate("/accessibility/123");
	}

	function LibraryPage() {
		navigate("/library/123");
	}

	return (
		<div>
			<div className="flex items-center py-3 px-3 justify-between">
				{/* <GalleryModal /> */}
				<button 
					onClick={() => {
						const phoneNumber = "932101903"; // Substitua pelo número desejado
						const message = encodeURIComponent("Olá! Estou entrando em contato..."); // Mensagem inicial opcional
						const whatsappUrl = `https://wa.me/${phoneNumber}?text=${message}`;
						window.open(whatsappUrl, "_blank");
					}}
					className="w-72 flex transition duration-400 border-2 border-[#32C728] bg-[#248D1C] hover:bg-[#32C728] text-1xl text-zinc-100 py-3.5 px-6 rounded-full justify-between" type="button">
					<p>WhatsApp</p>
					<MessageCircleMore />
				</button>
				<LanguageModal />
			</div>
			<div className="mainHome h-screen w-full flex items-center justify-center bg-fundoHome fundo bg-no-repeat bg-center">
				<div className="max-w-3xl w-full px-6 text-center space-y-10">
					<div className="flex flex-col items-center gap-4">
						<img className="w-64" src="/logo-geladaria.png" alt="logoItalala" />
						<p className="text-zinc-300 text-2xl font-light">
							{t('homepage.description')}
						</p>
					</div>
					<div className="w-full">
						<div className="flex justify-center flex-wrap gap-4 w-full">
							{/* biome-ignore lint/a11y/useButtonType: <explanation> */}
							<button
								onClick={blogPage}
								className="accountButton border-2 border-colorInput flex items-center justify-between w-80 bg-searchColor px-8 py-4 rounded-full shadow-shape text-buttonColor hover:bg-colorHover hover:text-zinc-200 transition duration-400 font-medium text-xl"
							>
								<p className="text-1xl font-normal">{t('homepage.buttonBlog')}</p>
								<Rss className="size-6" />
							</button>

							<ContactModal />

							{/* biome-ignore lint/a11y/useButtonType: <explanation> */}
							<button
								onClick={menuPage}
								className="accountButton border-2 border-colorInput flex items-center justify-between w-80 bg-searchColor px-8 py-4 rounded-full shadow-shape text-buttonColor hover:bg-colorHover hover:text-zinc-200 transition duration-400 font-medium text-xl"
							>
								<p className="text-1xl font-normal">{t('homepage.buttonMenu')}</p>
								{/*
									<div className="w-px h-6 bg-zinc-800">
									</div>
								*/}
								<SquareChartGantt className="size-6" />
							</button>
							{/* biome-ignore lint/a11y/useButtonType: <explanation> */}
							<button
								onClick={orderPage}
								className="accountButton border-2 border-colorInput flex items-center justify-between w-80 bg-searchColor px-8 py-4 rounded-full shadow-shape text-buttonColor hover:bg-colorHover hover:text-zinc-200 transition duration-400 font-medium text-xl"
							>
								<p className="text-1xl font-normal">{t('homepage.buttonCart')}</p>
								<ShoppingCart className="size-6" />
							</button>
							<button type="button"
								onClick={LibraryPage}
								className="accountButton border-2 border-colorInput flex items-center justify-between w-80 bg-searchColor px-8 py-4 rounded-full shadow-shape text-buttonColor hover:bg-colorHover hover:text-zinc-200 transition duration-400 font-medium text-xl"
							>
								<p className="text-1xl font-normal">Biblioteca</p>
								<Library className="size-6" />
							</button>
							<button type="button"
								onClick={AccessibilityPage}
								className="accountButton border-2 border-colorInput flex items-center justify-between w-80 bg-searchColor px-8 py-4 rounded-full shadow-shape text-buttonColor hover:bg-colorHover hover:text-zinc-200 transition duration-400 font-medium text-xl"
							>
								<p className="text-1xl font-normal">Acessibilidade</p>
								<PersonStanding className="size-6" />
							</button>
						</div>
					</div>
					<p className="text-lg text-colorText1 font-normal">
						{t('homepage.terms')}
					</p>
				</div>
			</div>
			<p className="px-3 py-3 flex items-center justify-between text-1xl text-colorText1">
				<ProfileModal />
				<a href="https://portofolio-perfil.vercel.app/" target="_blank"  rel="noreferrer" >
					<UserRoundCog className="mr-2 size-7" />
				</a>
				
			</p>
		</div>
	);
}

