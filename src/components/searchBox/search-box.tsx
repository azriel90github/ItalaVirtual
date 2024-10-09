import { Search } from "lucide-react";

export function Searchbox() {
  return (
    <div className="flex h-14 justify-center">
				{/** <img className="w-40" src="/logo-geladaria.png" alt="logoItalala" /> */}

				<div className="border-2 border-colorInput flex items-center bg-searchColor text-buttonColor px-5 py-3 rounded-full w-96 justify-between font-medium text-lg">
					<p className="px-3">Pesquisar</p>
					<Search />
				</div>
			</div>

  )
}