import { Headset, X } from "lucide-react";
import { useState } from "react";

export function OrderDetailsModal() {
	const [isOrderDetailsModalOpen, setIsOrderDetailsModalOpen] = useState(false);

	function openOrderDetailsModal() {
		setIsOrderDetailsModalOpen(true);
	}

	function closeOrderDetailsModal() {
		setIsOrderDetailsModalOpen(false);
	}

	return (
		<>
			<button
				type="button"
				onClick={openOrderDetailsModal}
				className="flex text-lg hover:bg-colorHover bg-buttonColor2 text-zinc-100 py-3 px-5 w-full rounded-2xl justify-between transition duration-400"
			>
				Ver encomenda
				<Headset />
			</button>
			<div>
				{isOrderDetailsModalOpen && (
					// biome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
					<div
						onClick={closeOrderDetailsModal}
						className="fixed inset-0 bg-black/60 flex items-center justify-center"
					>
						<div className="w-[640px] rounded-2xl py-5 px-6 bg-colorFundo">
							<div className="flex items-center justify-between text-buttonColor font-medium text-xl">
								Detalhes da Encomenda
								<X className="size-6 cursor-pointer" />
							</div>
							<button
									className="flex bg-buttonColor w-60 hover:bg-colorRemove text-zinc-100 mt-9 py-3 px-6 rounded-2xl justify-between"
									type="reset"
								>
									Ligar
									<Headset />
							</button>
						</div>
					</div>
				)}
			</div>
		</>
	);
}