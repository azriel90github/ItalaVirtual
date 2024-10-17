import {
	RotateCcw,
	Send,
	ShoppingCart,
	Trash2,
} from "lucide-react";
import { useNavigate, useLocation } from "react-router-dom";
import { MenuButton } from "../../components/buttons/menu-button";
import { LanguageModal } from "../../components/modal/language-modal";
import { OrderDetailsModal } from "../../components/modal/order-detail-modal";


export function OrderPage() {
	
	const location = useLocation(); // Hook para pegar o estado da navegação
  const { result } = location.state || { result: 0 }; // Desestrutura os dados ou define valor padrão

	const navigate = useNavigate();

	function menuPage() {
		navigate("/menu/123");
	}
	
	return (
		<div className="max-w-6xl px-6 py-10 mx-auto space-y-8 bg-fundoHome bg-no-repeat bg-right">
			<div className="border-2 border-colorInput p-3 h-full rounded-3xl shadow-shape bg-searchColor text-buttonColor flex flex-wrap gap-3 items-center justify-between font-medium text-xl">
				<div className="flex items-center">
					<p className="pl-3 text-2xl font-normal">Carrinho de Compras</p>
				</div>

				<div className="flex items-center gap-4">

					<MenuButton />

					<div className="w-px h-12 bg-buttonColor2">
							
					</div>
						<LanguageModal />
				</div>
			</div>

			<div className="flex items-center justify-around">
				{/** <img className="w-40" src="/logo-geladaria.png" alt="logoItalala" /> */}
			</div>

			<main className="flex flex-wrap gap-16">
				<div className="w-80 h-full bg-searchColor py-3.5 px-3.5 rounded-3xl">
					<OrderDetailsModal />

					<p className="flex justify-between pt-5 px-3 text-xl">
						<h3 className="text-buttonColor font-medium">Sabores</h3>
						<span className="text-moneyColor">0</span>{/**adicionar novos valores */}
					</p>

					<p className="flex justify-between py-2 px-3 text-xl">
						<h3 className="text-buttonColor font-medium">Pagamento</h3>
						<span className="text-moneyColor"></span>{/**adicionar novos valores */}
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
					<h1 className="pb-5 text-4xl flex items-center font-light text-zinc-300">
						Encomendar - Agora
					</h1>

					{/** **/}

					<div className="py-4">
						<form action="#">
							<div className="flex flex-col gap-4 w-full">
								<input
									type="text"
									placeholder="Seu nome"
									className="py-3 px-4 outline-none rounded-xl bg-searchColorInput text-colorText1 border-2 border-searchColor focus:border-2 focus:border-colorText1 placeholder:text-headerColor font-medium text-lx"
								/>
								<input
									type="number"
									placeholder="Seu número"
									className="removeNumber py-3 px-4 outline-none rounded-xl bg-searchColorInput text-colorText1 border-2 border-searchColor focus:border-2 focus:border-colorText1 placeholder:text-headerColor font-medium text-lx"
								/>
								<input
									type="text"
									placeholder="Localição exata"
									className="py-3 px-4 outline-none rounded-xl bg-searchColorInput text-colorText1 border-2 border-searchColor focus:border-2 focus:border-colorText1 placeholder:text-headerColor font-medium text-lx"
								/>
							</div>

							<div className="flex flex-col gap-3 w-72 py-5">
								<button
									className="flex bg-buttonColor hover:bg-moneyColor text-zinc-100 py-3 px-6 rounded-2xl justify-between"
									type="submit"
								>
									Enviar
									<Send />
								</button>

								<button
									className="flex bg-buttonColor hover:bg-colorRemove text-zinc-100 py-3 px-6 rounded-2xl justify-between"
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