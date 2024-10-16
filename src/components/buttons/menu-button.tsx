import { SquareChartGantt } from "lucide-react";
import { useNavigate } from "react-router-dom";

export function MenuButton() {
	const navigate = useNavigate(); // Esportar useNavigate do react-router-dom

	function menuPage() {
		navigate("/menu/123");
	}

	return (
		// biome-ignore lint/a11y/useButtonType: <explanation>
		<button
			onClick={menuPage}
			className="flex items-center justify-between w-72 hover:bg-colorHover shadow-shape bg-buttonColor2 transition duration-400 text-zinc-100 hover:text-zinc-100 rounded-2xl px-7 py-3.5"
		>
			Cardápio
			<SquareChartGantt />
		</button>
	);
}