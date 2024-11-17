//import { ShoppingBasket } from "lucide-react";
import { SearchBoxModal } from "../modal/search-box-modal";
import { useTranslation } from "react-i18next";

export function Searchbox() {
	const { t } = useTranslation()
	return (
		<div className="flex justify-center cursor-pointer">
			{/** <img className="w-40" src="/logo-geladaria.png" alt="logoItalala" /> */}

			<div className="flex gap-2 items-center bg-searchColor text-buttonColor p-2.5 rounded-full w-96 justify-between font-medium text-lg">
				<div className="bg-colorFundo w-full flex justify-between rounded-full">
					<SearchBoxModal />
				</div>
				<div className="bg-colorFundo w-full text-center rounded-full py-2.5 px-4">
					<p>{t('modal.Searchbox')}</p>
					{/** <ShoppingBasket /> */}
				</div>
			</div>
		</div>
	);
}