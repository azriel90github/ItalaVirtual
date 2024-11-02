import { ShoppingBasket } from "lucide-react";
import { SearchBoxModal } from "../modal/search-box-modal";

export function Searchbox() {
	return (
		<div className="flex justify-center cursor-pointer">
			{/** <img className="w-40" src="/logo-geladaria.png" alt="logoItalala" /> */}

			<div className="flex gap-2 items-center bg-searchColor text-buttonColor p-2.5 rounded-full w-96 justify-between font-medium text-lg">
				<div className="bg-colorFundo w-full flex justify-between rounded-full">
					<SearchBoxModal />
				</div>
				<div className="bg-colorFundo w-full flex items-center justify-between rounded-full py-2.5 px-4">
					<p>Todos</p>
					<ShoppingBasket />
				</div>
			</div>
		</div>
	);
}