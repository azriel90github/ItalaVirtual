import { Rss, ShoppingCart, SquareChartGantt, UserRoundCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Language } from "../../components/language";
import { Profile } from "../../components/profile";

export function HomePage() {
	/*const [count, setCount] = useState(0)*/

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

	return (
		<div>
			<div className="flex justify-between m-5">

				<Profile />

				<div className="mr-1 mt-1">
					<Language />
				</div>
			</div>
			<div className="h-screen w-full flex items-center justify-center bg-fundoHome fundo bg-no-repeat bg-center">
				<div className="max-w-3xl w-full px-6 text-center space-y-10">
					<div className="flex flex-col items-center gap-4">
						<img className="w-64" src="/logo-geladaria.png" alt="logoItalala" />
						<p className="text-zinc-300 text-2xl font-light">
							Faça sua encomenda de qualquer lugar e a qualquer hora!
						</p>
					</div>
					<div className="">
						<div className="flex justify-center flex-wrap gap-4 w-full">
							
							{/* biome-ignore lint/a11y/useButtonType: <explanation> */}
							<button onClick={blogPage}
								className="border-2 border-colorInput flex items-center justify-between w-80 bg-searchColor px-8 py-4 rounded-full shadow-shape text-buttonColor hover:bg-colorHover hover:text-zinc-200 transition duration-400 font-medium text-xl"
							>
								<p className="text-1xl font-normal">Blogue</p>
								<Rss className="size-6" />
							</button>
							{/* biome-ignore lint/a11y/useButtonType: <explanation> */}
							<button
								className="border-2 border-colorInput flex items-center justify-between w-80 bg-searchColor px-8 py-4 rounded-full shadow-shape text-buttonColor hover:bg-colorHover hover:text-zinc-200 transition duration-400 font-medium text-xl"
							>
								<p className="text-1xl font-normal">Conta</p>
								{/*
									<div className="w-px h-6 bg-zinc-800">
									</div>
								*/}
								<UserRoundCheck className="size-6" />
							</button>


							{/* biome-ignore lint/a11y/useButtonType: <explanation> */}
							<button
								onClick={menuPage}
								className="border-2 border-colorInput flex items-center justify-between w-80 bg-searchColor px-8 py-4 rounded-full shadow-shape text-buttonColor hover:bg-colorHover hover:text-zinc-200 transition duration-400 font-medium text-xl"
							>
								<p className="text-1xl font-normal">Cárdapio</p>
								{/*
									<div className="w-px h-6 bg-zinc-800">
									</div>
								*/}
								<SquareChartGantt className="size-6" />
							</button>
							{/* biome-ignore lint/a11y/useButtonType: <explanation> */}
							<button
								onClick={orderPage}
								className="border-2 border-colorInput flex items-center justify-between w-80 bg-searchColor px-8 py-4 rounded-full shadow-shape text-buttonColor hover:bg-colorHover hover:text-zinc-200 transition duration-400 font-medium text-xl"
							>
								<p className="text-1xl font-normal">Carrinho</p>
								<ShoppingCart className="size-6" />
							</button>
			
						</div>
					</div>
					<p className="text-lg text-colorText1">
						Ao fazer suas encomendas pela itala virtual você automaticamente
						concorda <br /> com nossos{" "}
						{/* biome-ignore lint/a11y/useValidAnchor: <explanation> */}
						<a className="text-zinc-300" href="#">
							termos de uso
						</a>{" "}
						e {/* biome-ignore lint/a11y/useValidAnchor: <explanation> */}
						<a className="text-zinc-300" href="#">
							políticas de privacidade
						</a>
						.
					</p>
				</div>
			</div>
			<p className="m-5 text-lg text-colorText1 text-center">
				Desenvolvido por <a className="text-zinc-300" href="https://portofolio-perfil.vercel.app/">Suélio Armando</a> eXtreme Programming <span className="text-jsColor">JS</span> and <span className="text-goColor">Go</span>
			</p>
		</div>
	);
}

