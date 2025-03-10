//import { t } from "i18next";
import { ArrowLeft, Download, FolderOpen, House } from "lucide-react";
import { MenuButton } from "../../components/buttons/menu-button";
import { useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";
import { useTranslation } from "react-i18next";


export function LibraryPage() {

	const { t } = useTranslation();
	//Variavél navigate recebendo o useNavigate do react-router-dom
	const navigate = useNavigate();
	//Função homePage para navegar da blogPage para a homePage ao clicar no evento onclick{homePage}
	function homePage() {
		navigate("/"); //Navegar para a página home
	}

	//Esse código utiliza React para detectar quando o usuário rola a página mais de 50px e ajusta o estado isScrolled de acordo
	const [isScrolled, setIsScrolled] = useState(false);

	//O listener é removido no cleanup do useEffect quando o componente é desmontado para evitar vazamentos de memória
	useEffect(() => {
		const handleScroll = () => {
			//Função que verifica se window.scrollY é maior que 50px. Se sim, isScrolled é definido como true; caso contrário, false
			//Verifica se o usuário rolou mais de 50px da página
			if (window.scrollY > 50) {
				setIsScrolled(true);
			} else {
				setIsScrolled(false);
			}
		};

		//significa que um "listener" (ouvinte) de evento está sendo registrado para o evento de rolagem ("scroll") da janela (window)
		window.addEventListener("scroll", handleScroll);

		// Limpar o event listener quando o componente for desmontado
		return () => {
			window.removeEventListener("scroll", handleScroll);
		};
	}, []);


	return (
		<div>
			<div
				className={`border-b-2 border-colorInput h-20 shadow-shape bg-searchColor text-buttonColor flex flex-wrap items-center justify-around font-medium text-xl ${
					isScrolled ? "-translate-y-10" : "translate-y-0"
				}`}
			>
				<div className="flex items-center justify-between">
					<div>
						{/* biome-ignore lint/a11y/useButtonType: <explanation> */}
						<button className="flex items-center gap-3" onClick={homePage}>
							<ArrowLeft className="size-6" />
							<p className="text-2xl font-normal">
								<House />
							</p>
						</button>
					</div>
				</div>
					<MenuButton />
			</div>
			<div>
				
				<div>
					<div>
						<div className="w-10/12 leading-loose flex flex-col gap-4 mx-auto pl-2">
							<h1 className="text-4xl flex items-start justify-center text-buttonColor py-2 mt-8 mb-5 font-normal">
								{t('biblioteca.bibliotecah3')}
							</h1>
							
							<div className="libraryPage flex items-center w-full mb-48 justify-center gap-8">
								<p>
									<a href="/pdf/modelo_fatura.pdf">
										<img className="rounded-t-xl w-80 h-auto opacity-80" src="/doc-1.jpeg" alt="" />
										<div className="flex cursor-pointer items-center justify-between transition duration-400 rounded-b-xl bg-searchColor text-zinc-100 py-2.5 px-8 w-80">
											{t('biblioteca.faturaDigital')}
											<FolderOpen />
										</div>
									</a>
										<a className="text-zinc-100 font-medium text-lg mt-4 bg-searchColor w-80 flex justify-between items-center gap-2 px-2.5 py-2.5 rounded-full" href="/pdf/modelo_fatura.pdf" download="modelo_fatura.pdf">
											<p className="bg-colorFundo w-full py-2.5 flex items-center justify-between px-6 rounded-full">
												{t('biblioteca.baixarFatura')}
												<Download />
											</p>
											
										</a>
								</p>	

								<p>
									<a href="/pdf/coordenadas_bancarias.pdf"><img className="rounded-t-xl w-80 h-full opacity-80" src="/doc-1.jpeg" alt="" />
										<div className="flex cursor-pointer items-center justify-between transition duration-400 rounded-b-xl bg-searchColor text-zinc-100 py-2.5 px-8 w-80">
											{t('biblioteca.coordenadasBancarias')}
											<FolderOpen />
										</div>
									</a>
										<a className="text-zinc-100 font-medium text-lg mt-4 bg-searchColor w-80 flex justify-between items-center gap-2 px-2.5 py-2.5 rounded-full" href="/pdf/coordenadas_bancarias.pdf" download="coordenadas_bancarias.pdf">
											<p className="bg-colorFundo w-full py-2.5 flex items-center justify-between px-6 rounded-full">
												{t('biblioteca.baixarCoordenadas')}
												<Download />
											</p>
										</a>
								</p>							
							</div>
				
						</div>
					</div>
				</div>
			</div>
			
			<footer
				className={`queryFooterBlog flex py-3 gap-3 items-center flex-wrap justify-around fixed bottom-0 left-0 w-full transition-transform duration-500 ease-in-out border-t-2 border-colorInput bg-searchColor ${
					isScrolled ? "translate-y-0" : "translate-y-full"
				}`}
			>

				{/** <ProfileModal /> */}
				<button type="button" className="flex items-center gap-3 text-buttonColor" onClick={homePage}>
					<ArrowLeft className="size-6" />
					<p className="text-2xl font-normal">
						<House />
					</p>
				</button>
				
				<div className="flex gap-4">
				<MenuButton />
					{/**
					 <div className="w-px h-12 bg-buttonColor2"></div>
					*/}
				</div>
			</footer>
		</div>
	);
}