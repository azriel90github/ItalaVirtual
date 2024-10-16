import { UserRound } from "lucide-react";

export function Profile() {
	return (
		<div className="cursor-pointer flex items-center justify-between w-72 hover:bg-colorHover hover:text-zinc-100 shadow-shape bg-buttonColor transition duration-400 text-zinc-100 rounded-2xl px-7 py-3.5">
			<p>Opções de Perfil</p>
			<div>
				<UserRound />
			</div>
		</div>
	);
}