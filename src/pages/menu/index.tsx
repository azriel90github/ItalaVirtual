import {
	ArrowLeft,
	CircleCheck,
	Heart,
	House,
	Minus,
	Plus,
	ShoppingCart,
	Star,
	Trash2,
} from "lucide-react"; //Importando icones do lucide-react
import { useState, useEffect } from "react"; //Usar useState e useEffect do react
import { useNavigate } from "react-router-dom"; // Para navegação manual
import { CartButton } from "../../components/buttons/cart-button";
import { Searchbox } from "../../components/searchBox/search-box";
//import { LanguageModal } from "../../components/modal/language-modal";
//import { NotificationModal } from "../../components/modal/notification-modal";

//Função para retornar a MenuPage 
export function MenuPage() {

	//Iniciando lógica para a página MenuPage------------------------------------------------------------
	//Lógica para adicionar e remover colheres
















	// Estado para o sroller
	const [isScrolled, setIsScrolled] = useState(false);
  useEffect(() => {
		const handleScroll = () => {
			// Verifica se o usuário rolou mais de 50px da página
			if (window.scrollY > 50) {
				setIsScrolled(true);
			} else {
				setIsScrolled(false);
			}
		};
		window.addEventListener('scroll', handleScroll);
		// Limpar o event listener quando o componente for desmontado
		return () => {
			window.removeEventListener('scroll', handleScroll);
		};
	}, []);


	// Clicar na seta da página menu e levar para o inicio 
	const navigate = useNavigate()
	function HomePage() {
		navigate("/");
	}

	return (
		<div className="mx-auto space-y-9 bg-fundoHome bg-no-repeat bg-top bg-fixed">
			<div className={`border-b-2 border-colorInput h-20 shadow-shape bg-searchColor text-buttonColor flex flex-wrap items-center justify-around font-medium text-xl ${
					isScrolled ? '-translate-y-10' : 'translate-y-0'
				}`}>
				<div className="flex items-center px-3">
					{/** <img className="w-28" src="/logo-geladaria.png" alt="logoItalala" />*/}
					{/* biome-ignore lint/a11y/useButtonType: <explanation> */}
					<button onClick={HomePage} className="flex gap-3"> {/* Clicar na seta da página menu e levar para o inicio*/}
						<ArrowLeft className="size-6" />
						<House />
					</button>
				</div>

				 {/* Menu de navegação */}

				<div className="flex items-center gap-4" >

					<div className="w-px h-12 bg-buttonColor2">

					</div>
						<CartButton />
						{/** <NotificationModal />*/}
				</div>
			</div>

				<div className="flex items-center justify-center gap-4">
					<Searchbox />
					<div>
						{/** <LanguageModal /> */}
					</div>
				</div>

			<div className="flex flex-wrap gap-5 justify-center">

				<div className="bg-searchColor rounded-3xl py-4 px-4 w-80">
					<div className="flex items-center justify-between py-2 px-3 text-xl font-medium">
						<p className="text-buttonColor text-xl">Chocolate</p>
						<Heart />
					</div>
					<div className="py-3">
						<img className="mx-auto w-20" src="/ice-cream 6.png" alt="gelado" />
					</div>
					<span className="flex justify-center text-zinc-100 font-normal text-2xl gap-2 py-3">
						<small>kz</small> <p className="text-5xl text-moneyColor">320</p> <small>00</small>
					</span>

					<div className="flex items-center justify-center gap-2 py-3">
						<Star />
						<Star />
						<Star />
						<Star />
					</div>

					<p className="text-center py-4 mb-2 text-buttonColor font-normal text-xl">
						Mistura de morango com chocolate, bolachas e uma cereginha
					</p>

					<div className="flex flex-col gap-3">
						{/* biome-ignore lint/a11y/useButtonType: <explanation> */}
						<button className="flex bg-buttonColor2 hover:bg-colorHover text-zinc-100 py-3 px-5 w-full rounded-2xl justify-between">
							<div>
								Colheres <span className="ml-2">

								</span>
							</div>
							<div className="flex gap-5">
								<Plus />{" "}
								{/* Adicionar Valores de 1 pra cima* */}
								<Minus

								/>{" "}
								{/* Subtrair Valores tendo como limite 0 * */}
							</div>
						</button>
						{/* biome-ignore lint/a11y/useButtonType: <explanation> */}
						<button
							
							className="flex bg-buttonColor2 hover:bg-moneyColor text-zinc-100 py-3 px-5 w-full rounded-2xl justify-between"
						>
							Adicionar no Carrinho
							 <CircleCheck /> : <ShoppingCart />{" "}
							{/* Alternar Icon */}
						</button>
						{/** Remover Quantidade Adicionada*/}
						{/* biome-ignore lint/a11y/useButtonType: <explanation> */}
						<button
							
							className="flex bg-buttonColor2 hover:bg-colorRemove text-zinc-100 py-3 px-5 w-full rounded-2xl justify-between"
						>
							Remover do Carrinho
							<Trash2 />
						</button>
					</div>
				</div>

				<div className="bg-searchColor rounded-3xl py-4 px-4 w-80">
					<div className="flex items-center justify-between py-2 px-3 text-xl font-medium">
						<p className="text-buttonColor text-xl">Chocolate</p>
						<Heart />
					</div>
					<div className="py-3">
						<img className="mx-auto w-20" src="/ice-cream 6.png" alt="gelado" />
					</div>
					<span className="flex justify-center text-zinc-100 font-normal text-2xl gap-2 py-3">
						<small>kz</small> <p className="text-5xl text-moneyColor">320</p><small>00</small>
					</span>

					<div className="flex items-center justify-center gap-2 py-3">
						<Star />
						<Star />
						<Star />
						<Star />
					</div>

					<p className="text-center py-4 mb-2 text-buttonColor font-normal text-xl">
						Mistura de morango com chocolate, bolachas e uma cereginha
					</p>

					<div className="flex flex-col gap-3">
						{/* biome-ignore lint/a11y/useButtonType: <explanation> */}
						<button className="flex bg-buttonColor2 hover:bg-colorHover text-zinc-100 py-3 px-5 w-full rounded-2xl justify-between">
							<div>
								Colheres <span className="ml-2">{count}</span>
							</div>
							<div className="flex gap-5">
								<Plus onClick={incrementCount} />{" "}
								{/* Adicionar Valores de 1 pra cima* */}
								<Minus
									onClick={() =>
										setCount((count: number) => Math.max(count - 1, 0))
									}
								/>{""}
								{/* Subtrair Valores tendo como limite 0 * */}
							</div>
						</button>
						{/* biome-ignore lint/a11y/useButtonType: <explanation> */}
						<button
							onClick={handleClick}
							className="flex bg-buttonColor2 hover:bg-moneyColor text-zinc-100 py-3 px-5 w-full rounded-2xl justify-between"
						>
							Adicionar no Carrinho
							{isAlternateIcon ? <CircleCheck /> : <ShoppingCart />}{""}
							{/* Alternar Icon */}
						</button>
						{/** Remover Quantidade Adicionada*/}
						{/* biome-ignore lint/a11y/useButtonType: <explanation> */}
						<button
							onClick={removeSpoonsAndCart}
							className="flex bg-buttonColor2 hover:bg-colorRemove text-zinc-100 py-3 px-5 w-full rounded-2xl justify-between"
						>
							Remover do Carrinho
							<Trash2 />
						</button>
					</div>
				</div>

				<div className="bg-searchColor rounded-3xl py-4 px-4 w-80">
					<div className="flex items-center justify-between py-2 px-3 text-xl font-medium">
						<p className="text-buttonColor text-xl">Chocolate</p>
						<Heart />
					</div>
					<div className="py-3">
						<img className="mx-auto w-20" src="/ice-cream 6.png" alt="gelado" />
					</div>
					<span className="flex justify-center text-zinc-100 font-normal text-2xl gap-2 py-3">
						<small>kz</small> <p className="text-5xl text-moneyColor">320</p> <small>00</small>
					</span>

					<div className="flex items-center justify-center gap-2 py-3">
						<Star />
						<Star />
						<Star />
						<Star />
					</div>

					<p className="text-center py-4 mb-2 text-buttonColor font-normal text-xl">
						Mistura de morango com chocolate, bolachas e uma cereginha
					</p>

					<div className="flex flex-col gap-3">
						{/* biome-ignore lint/a11y/useButtonType: <explanation> */}
						<button className="flex bg-buttonColor2 hover:bg-colorHover text-zinc-100 py-3 px-5 w-full rounded-2xl justify-between">
							<div>
								Colheres <span className="ml-2">{count}</span>
							</div>
							<div className="flex gap-5">
								<Plus onClick={incrementCount} />{" "}
								{/* Adicionar Valores de 1 pra cima* */}
								<Minus
									onClick={() =>
										setCount((count: number) => Math.max(count - 1, 0))
									}
								/>{" "}
								{/* Subtrair Valores tendo como limite 0 * */}
							</div>
						</button>
						{/* biome-ignore lint/a11y/useButtonType: <explanation> */}
						<button
							onClick={handleClick}
							className="flex bg-buttonColor2 hover:bg-moneyColor text-zinc-100 py-3 px-5 w-full rounded-2xl justify-between"
						>
							Adicionar no Carrinho
							{isAlternateIcon ? <CircleCheck /> : <ShoppingCart />}{" "}
							{/* Alternar Icon */}
						</button>
						{/** Remover Quantidade Adicionada*/}
						{/* biome-ignore lint/a11y/useButtonType: <explanation> */}
						<button
							onClick={removeSpoonsAndCart}
							className="flex bg-buttonColor2 hover:bg-colorRemove text-zinc-100 py-3 px-5 w-full rounded-2xl justify-between"
						>
							Remover do Carrinho
							<Trash2 />
						</button>
					</div>
				</div>					

			</div>


			 {/* Rodapé que aparece após rolagem */}
			 {/**
				* <footer
					className={`flex flex-wrap h-20 items-center justify-around fixed bottom-0 left-0 w-full transition-transform duration-500 ease-in-out border-t-2 border-colorInput bg-searchColor ${
						isScrolled ? 'translate-y-0' : 'translate-y-full'
					}`}
				> 
				<Searchbox />
				<div className="flex gap-4 items-center">
				<div className="w-px h-12 bg-buttonColor2">
				</div>
					<CartButton />

				</div>
				</footer>
			  */}
			 
		</div>
	);
}



