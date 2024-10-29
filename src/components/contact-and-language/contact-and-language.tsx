import { Headset, Languages } from "lucide-react";

export function ContactAndLanguage() {
	return (
		<div className="flex h-14 justify-center cursor-pointer">
			{/** <img className="w-40" src="/logo-geladaria.png" alt="logoItalala" /> */}

			<div className="flex items-center bg-headerColor text-buttonColor px-6 py-3 rounded-full w-96 justify-between font-medium text-lg">
        <Headset />
        <Languages />
			</div>
		</div>
	);
}