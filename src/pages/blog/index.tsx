import {
	ArrowLeft,
	Facebook,
	House,
	Instagram,
	MapPin,
	Twitter,
} from "lucide-react"; //Importando icones do lucide-react
import { useEffect, useState } from "react"; //Importando useEffect e useState do react
import { useNavigate } from "react-router-dom"; //Importando useNavigate do react
import { MenuButton } from "../../components/buttons/menu-button"; //Importando o componente menu-button
import { Language } from "../../components/language"; //Importando o componente Language
import { Profile } from "../../components/profile"; //Importando o componente Profile

//Retornando função BlogPage( Página do blog ) e exportando a mesma
export function BlogPage() {


	//Iniciando funcionalidades na página Blog-----------------------------------------------------------------

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

	//Retornando o a página Blog---------------------------------------------------------------------------------
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
				<div className="flex items-center justify-between">
					{/*Social*/}
					<div className="flex gap-1 text-buttonColor">
						{/* biome-ignore lint/a11y/useValidAnchor: <explanation> */}
						<a href="#">
							<Instagram className="size-6" />
						</a>
						{/* biome-ignore lint/a11y/useValidAnchor: <explanation> */}
						<a href="#">
							<Facebook className="size-6" />
						</a>

						{/* biome-ignore lint/a11y/useValidAnchor: <explanation> */}
						<a href="#">
							<Twitter className="size-6" />
						</a>
					</div>
				</div>
			</div>
			<div>
				<div>
					<img
						className="size-cover h-full w-full bg-cover bg-center"
						src="/banner2.jpg"
						alt=""
					/>
				</div>

				<div className="flex flex-wrap gap-2 mb-44">
					<div>
						<div className="w-10/12 leading-loose flex flex-col gap-4 mx-auto">
							<h1 className="text-5xl flex items-start justify-between text-buttonColor py-2 mt-12 font-normal">
								Sobre nós
								<p>
									<Language />
								</p>
							</h1>
							<p className="text-lg text-zinc-300">
								"Olá! Sou o Cunha Shombossi, a mente e o coração por trás da
								Geladaria Italala. Minha paixão por criar sabores únicos e
								oferecer momentos doces para as pessoas começou há muitos anos,
								quando descobri a magia que um simples sorvete pode trazer para
								o dia de alguém."
							</p>
							<p className="text-lg text-zinc-300">
								"Na Geladaria Itala, usamos apenas ingredientes frescos e de
								alta qualidade. Todos os nossos sorvetes são preparados com
								muito cuidado e amor, para garantir uma explosão de sabores em
								cada mordida. Valorizamos o processo artesanal, e cada detalhe é
								pensado para oferecer a melhor experiência aos nossos clientes."
							</p>
							<p className="text-lg text-zinc-300">
								"Na Italala, você encontrará um ambiente familiar e
								descontraído, perfeito para saborear um delicioso sorvete em boa
								companhia. Além dos nossos sabores tradicionais, oferecemos
								opções veganas e sem lactose, para que todos possam aproveitar
								essa experiência. Acompanhe nossas redes sociais e fique por
								dentro das nossas promoções e novidades, Visite-nos ja, ou faça
								sua encomenda por aqui!"
							</p>
						</div>
					</div>

					<div className="w-10/12 flex flex-col mx-auto gap-4">
						<h1 className="text-5xl text-buttonColor py-5 mt-3 font-normal">
							Depoimentos
						</h1>
						<div className="flex flex-wrap gap-7">
							<figure className="flex flex-wrap gap-4">
								<div className="">
									<img
										className="w-32 h-32 rounded-full"
										src="/perfis-blog/perfil02.jpg"
										alt=""
									/>
								</div>
								<div className="">
									<p className="text-lg text-zinc-300 w-80">
										"O melhor sorvete que já provei! Sabores incríveis e textura
										perfeita. Já virei cliente fiel"
									</p>
									<div>
										<span className="text-2xl text-colorText1">
											Varstoque Armando
										</span>
										<p className="text-buttonColor flex items-center justify-between w-36">
											<MapPin className="size-5 text-zinc-300" />
											Samba, Luanda
										</p>
									</div>
								</div>
							</figure>
							<figure className="flex flex-wrap gap-4">
								<div className="">
									<img
										className="w-32 h-32 rounded-full"
										src="/perfis-blog/perfil01.jpg"
										alt=""
									/>
								</div>
								<div className="">
									<p className="text-lg text-zinc-300 w-80">
										"O melhor sorvete que já provei! Sabores incríveis e textura
										perfeita. Já virei cliente fiel"
									</p>
									<div>
										<span className="text-2xl text-colorText1">
											Cunha Chombossi
										</span>
										<p className="text-buttonColor flex items-center justify-between w-36">
											<MapPin className="size-5 text-zinc-300" />
											Samba, Luanda
										</p>
									</div>
								</div>
							</figure>
							<figure className="flex flex-wrap gap-4">
								<div className="">
									<img
										className="w-32 h-32 rounded-full"
										src="/perfis-blog/perfil03.jpg"
										alt=""
									/>
								</div>
								<div className="">
									<p className="text-lg text-zinc-300 w-80">
										"O melhor sorvete que já provei! Sabores incríveis e textura
										perfeita. Já virei cliente fiel"
									</p>
									<div>
										<span className="text-2xl text-colorText1">
											Suélio Armando
										</span>
										<p className="text-buttonColor flex items-center justify-between w-36">
											<MapPin className="size-5 text-zinc-300" />
											Samba, Luanda
										</p>
									</div>
								</div>
							</figure>
							<figure className="flex flex-wrap gap-4">
								<div className="">
									<img
										className="w-32 h-32 rounded-full"
										src="/perfis-blog/perfil04.jpg"
										alt=""
									/>
								</div>
								<div className="">
									<p className="text-lg text-zinc-300 w-80">
										"O melhor sorvete que já provei! Sabores incríveis e textura
										perfeita. Já virei cliente fiel"
									</p>
									<div>
										<span className="text-2xl text-colorText1">Isabel Tatiana</span>
										<p className="text-buttonColor flex items-center justify-between w-36">
											<MapPin className="size-5 text-zinc-300" />
											Samba, Luanda
										</p>
									</div>
								</div>
							</figure>
						</div>
					</div>
				</div>
			</div>
			{/* Rodapé que aparece após rolagem */}*{" "}
			<footer
				className={`queryFooterBlog flex py-3 gap-3 items-center flex-wrap justify-around fixed bottom-0 left-0 w-full transition-transform duration-500 ease-in-out border-t-2 border-colorInput bg-searchColor ${
					isScrolled ? "translate-y-0" : "translate-y-full"
				}`}
			>
				<Profile />

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











