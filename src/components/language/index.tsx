	import { Languages, X } from "lucide-react";
	import { useState } from "react";

	export function Language() {

		const [isLanguageModalOpen, setIsLanguageModalOpen] = useState(false);

		function openLanguageModal() {
			setIsLanguageModalOpen(true);
		}

		function closeLanguageModal() {
			setIsLanguageModalOpen(false);
		}

		return (
			<>
				<button
					onClick={openLanguageModal}
					type="button"
					className="text-buttonColor mr-2"
				>
					<Languages className="size-7" />
				</button>
				<div>
					{isLanguageModalOpen && (
						<div className="fixed inset-0 bg-black/60 flex items-center justify-center">
							<div className="w-[640px] rounded-xl py-5 px-6 bg-colorFundo">
								<div className="flex items-center justify-between text-buttonColor font-medium text-xl">
									<h2>Selecionar idioma</h2>
									<button type="button" onClick={closeLanguageModal}>
										<X className="size-6" />
									</button>
								</div>
							</div>
						</div>
					)}
				</div>
			</>
		);
	}