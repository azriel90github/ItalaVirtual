import { Headset, Languages } from "lucide-react";

export function ContactAndLanguage() {
	return (
		<div className="flex justify-center cursor-pointer">
			{/** <img className="w-40" src="/logo-geladaria.png" alt="logoItalala" /> */}

			<div className="flex gap-3 items-center bg-searchColorInput text-buttonColor p-2.5 rounded-full w-96 justify-between font-medium text-lg">
        <div className="bg-colorFundo w-full flex justify-between rounded-full py-2.5 px-5">
					Ligar
					<Headset  />
				</div>
        <div className="bg-colorFundo w-full flex justify-between rounded-full py-2.5 px-5">
					Idioma
					<Languages  />
				</div>
			</div>
		</div>
	);
}