import {
	RotateCcw,
	Send,
	ShoppingCart,
	SquareChartGantt,
	Trash2,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";

export function OrderPage() {
	const location = useLocation(); // Hook para pegar o estado da navegação
	const { result } = location.state || { result: 0 }; // Desestrutura os dados ou define valor padrão

	/*const [count, setCount] = useState(0)*/

	const navigate = useNavigate();

	function menuPage() {
		navigate("/menu/123");
	}
	return (
		<div className="max-w-6xl px-6 py-10 mx-auto space-y-8">
			<div className="px-3 h-20 rounded-3xl shadow-shape bg-headerColor text-buttonColor flex items-center justify-between font-medium text-xl">
				<div className="flex items-center px-3">
					<p className="pl-2 text-2xl font-normal">Carrinho de Compras</p>
				</div>

				<div>
					{/* biome-ignore lint/a11y/useButtonType: <explanation> */}
					<button
						onClick={menuPage}
						className="flex items-center justify-between w-72 hover:bg-colorHover shadow-shape bg-buttonColor2 transition duration-400 text-zinc-100 hover:text-zinc-100 rounded-2xl px-7 py-3.5"
					>
						Cardápio
						<SquareChartGantt />
					</button>
				</div>
			</div>

			<div className="flex items-center justify-around">
				{/** <img className="w-40" src="/logo-geladaria.png" alt="logoItalala" /> */}
			</div>

			<main className="flex gap-16">
				<div className="w-80 h-full bg-headerColor py-3.5 px-3.5 rounded-3xl">
					<h2 className="flex justify-between py-2 px-3 text-xl font-medium">
						Detalhes da Encomenda
					</h2>

					<p className="flex justify-between pt-2 px-3 text-xl">
						<h3 className="text-buttonColor font-medium">Sabores</h3>
						<span className="text-moneyColor">3</span>
					</p>

					<p className="flex justify-between py-2 px-3 text-xl">
						<h3 className="text-buttonColor font-medium">Pagamento</h3>
						<span className="text-moneyColor">{result}</span>
					</p>

					<div className="flex flex-col gap-3">
						{/* biome-ignore lint/a11y/useButtonType: <explanation> */}
						<button
							onClick={menuPage}
							className="flex mt-6 bg-buttonColor2 hover:bg-moneyColor text-zinc-100 py-3 px-5 w-full rounded-2xl justify-between"
						>
							Adicionar Sabores
							<ShoppingCart />
						</button>
						{/* biome-ignore lint/a11y/useButtonType: <explanation> */}
						<button
							onClick={menuPage}
							className="flex bg-buttonColor2 hover:bg-colorRemove text-zinc-100 py-3 px-5 w-full rounded-2xl justify-between"
						>
							Remover Sabores
							<Trash2 />
						</button>
					</div>
				</div>

				<div className="flex-1">
					<h1 className="pb-5 text-4xl flex items-center justify-between font-medium text-headerColor">
						Encomendar - Agora
					</h1>

					{/** **/}

					<div className="py-4">
						<form action="#">
							<div className="flex flex-col gap-4">
								<input
									type="text"
									placeholder="Seu nome"
									className="w-4/6 py-3 px-4 outline-none rounded-xl bg-colorInput text-colorText1 border-2 border-colorInput focus:border-2 focus:border-colorText1 placeholder:text-colorFundo font-medium text-lx"
								/>
								<input
									type="number"
									placeholder="Seu número"
									className="removeNumber w-4/6 py-3 px-4 outline-none rounded-xl bg-colorInput text-colorText1 border-2 border-colorInput focus:border-2 focus:border-colorText1 placeholder:text-colorFundo font-medium text-lx"
								/>
								<input
									type="text"
									placeholder="Localição exata"
									className="w-4/6 py-3 px-4 outline-none rounded-xl bg-colorInput text-colorText1 border-2 border-colorInput focus:border-2 focus:border-colorText1 placeholder:text-colorFundo font-medium text-lx"
								/>
							</div>

							<div className="flex flex-col gap-3 py-5">
								<button
									className="flex w-80 bg-buttonColor hover:bg-moneyColor text-zinc-100 py-3 px-6 rounded-2xl justify-between"
									type="submit"
								>
									Encomendar
									<Send />
								</button>

								<button
									className="flex w-80 bg-buttonColor hover:bg-colorRemove text-zinc-100 py-3 px-6 rounded-2xl justify-between"
									type="reset"
								>
									Limpar
									<RotateCcw />
								</button>
							</div>
						</form>
					</div>
				</div>
			</main>
		</div>
	);
}