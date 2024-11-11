import { type SetStateAction, useState } from "react";
import { CreditCard, HandCoins, Landmark, X } from "lucide-react";
import {
  AlignJustify,
  RotateCcw,
  Send,
  ShoppingCart,
  Trash2,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { MenuButton } from "../../components/buttons/menu-button";
import { LanguageModal } from "../../components/modal/language-modal";
import { useResult } from "../../context/ResultContext.tsx";
//import { PaymentMethodModal } from "../../components/modal/payment-method-modal.tsx";

export function OrderPage() {

	const [selectedOption, setSelectedOption] = useState(""); // Estado para o valor selecionado
	// Função para fechar o modal e definir a opção selecionada
	const handleSelectOption = (option: SetStateAction<string>) => {
		setSelectedOption(option);
		setIsPaymentMethodModalOpen(false);
	};

	const [isPaymentMethodModalOpen, setIsPaymentMethodModalOpen] =
		useState(false);

	function openPaymentMethodModal() {
		setIsPaymentMethodModalOpen(true);
	}

	function closePaymentMethodModal() {
		setIsPaymentMethodModalOpen(false);
	}

  const { total } = useResult(); // Acessa o valor do total do contexto
  const navigate = useNavigate();

  const [formData, setFormData] = useState({
    name: "",
    number: "",
    paymentMethod: "",
    cityOrNeighborhood: "",
		landmark: "",
  });

  const [showSuccessModal, setShowSuccessModal] = useState(false);

  function menuPage() {
    navigate("/menu/123");
  }

  // Função para lidar com a mudança dos campos do formulário
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    const handleChange = (e: { target: { name: any; value: any; }; }) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  // Função para lidar com o envio do formulário
const handleSubmit = async (e: { preventDefault: () => void }) => {
  e.preventDefault();
  try {
    const response = await fetch("http://localhost:3334/order", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        ...formData,
        payment: total, // Incluindo o total no corpo da requisição
      }),
    });

    if (response.ok) {
      setShowSuccessModal(true); // Exibe o modal de sucesso
    } else {
      console.error("Erro ao enviar os dados.");
    }
      } catch (error) {
        console.error("Erro na requisição:", error);
      }
    };


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

      <main className="flex flex-wrap gap-16">
        <div className="w-80 h-full bg-searchColor py-3.5 px-3.5 rounded-3xl">
          <div className="flex flex-col gap-1.5">
            <div className="bg-buttonColor2 items-center text-zinc-100 py-3 px-5 w-full rounded-2xl flex justify-between">
              Detalhes Encomenda
              <AlignJustify />
            </div>
          </div>

          <p className="flex justify-between pt-5 px-3 text-xl">
            <h3 className="text-buttonColor font-medium">Sabores</h3>
            <span className="text-moneyColor1">0</span>
          </p>

          <p className="flex justify-between py-2 px-3 text-xl">
            <h3 className="text-buttonColor font-medium">Pagamento</h3>
            <span className="text-moneyColor1">{total}</span>
          </p>

          <div className="flex flex-col gap-3">
            <button type="button"
              onClick={menuPage}
              className="flex mt-6 transition duration-400 bg-buttonColor2 hover:bg-moneyColor text-zinc-100 py-3 px-5 w-full rounded-2xl justify-between"
            >
              Adicionar Sabores
              <ShoppingCart />
            </button>
            <button type="button"
              onClick={menuPage}
              className="flex transition duration-400 bg-buttonColor2 hover:bg-colorRemove text-zinc-100 py-3 px-5 w-full rounded-2xl justify-between"
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

          <div className="py-4">
            <form onSubmit={handleSubmit}>
              <div className="flex flex-col gap-4 w-full">
                <input
                  type="text"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Nome"
                  className="py-3 px-4 outline-none rounded-xl bg-searchColorInput text-colorText1 border-2 border-searchColor focus:border-2 focus:border-colorText1 placeholder:text-headerColor font-medium text-lx"
                />
                <input
                  type="number"
                  name="number"
                  value={formData.number}
                  onChange={handleChange}
                  placeholder="Número(+244)"
                  className="removeNumber py-3 px-4 outline-none rounded-xl bg-searchColorInput text-colorText1 border-2 border-searchColor focus:border-2 focus:border-colorText1 placeholder:text-headerColor font-medium text-lx"
                />
                <input
									readOnly
									value={selectedOption}
									onChange={handleChange}
									placeholder="Método de Pagamento"
									type="text"
									onClick={openPaymentMethodModal}
									className="flex items-center justify-between cursor-pointer m-0 py-3 px-4 outline-none rounded-xl bg-searchColorInput text-buttonColor border-2 border-searchColor focus:border-2 placeholder:text-headerColor font-medium text-lx"
								/>
								{isPaymentMethodModalOpen && (
									//biome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
									<div
										onClick={closePaymentMethodModal}
										className="fixed inset-0 bg-black/60 flex items-center justify-center"
									>
										{/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
										<div
											onClick={() => setIsPaymentMethodModalOpen(false)}
											className="w-[640px] rounded-xl py-5 px-6 bg-colorFundo"
										>
											{/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
											<div
												onClick={(e) => e.stopPropagation()}
												className="text-buttonColor font-medium"
											>
												<div className="flex items-center justify-between text-xl ml-1">
													Selecionar método de pagamento
													<X onClick={closePaymentMethodModal} className="cursor-pointer" />
													{/** <X className="size-6 cursor-pointer" /> */}
												</div>
												<div className="flex flex-col py-3 mt-2 gap-3">
													<button
														type="button"
														className="py-3 px-5 outline-none rounded-xl transition duration-400 hover:text-zinc-300 hover:bg-buttonColor bg-searchColorInput flex items-center justify-between"
														onClick={() => handleSelectOption("Dinheiro em mão")}
													>
														<p className="text-zinc-300">Dinheiro em mão</p>
														<HandCoins/>
													</button>
													<button
														type="button"
														className="py-3 px-5 outline-none rounded-xl transition duration-400 hover:text-zinc-300 hover:bg-buttonColor bg-searchColorInput flex items-center justify-between"
														onClick={() => handleSelectOption("Multicaixa Express")}
													>
														<p className="text-zinc-300">Multicaixa Express</p>
														<Landmark/>
													</button>
													<button
														type="button"
														className="py-3 px-5 outline-none rounded-xl transition duration-400 hover:text-zinc-300 hover:bg-buttonColor bg-searchColorInput flex items-center justify-between"
														onClick={() => handleSelectOption("TPA - Presencial")}
													>
														<p className="text-zinc-300">TPA - Presencial</p>
														<CreditCard/>
													</button>
												</div>
											</div>
										</div>
									</div>
								)}
                <input
                  type="text"
                  name="cityOrNeighborhood"
                  value={formData.cityOrNeighborhood}
                  onChange={handleChange}
                  placeholder="Cidade ou Bairro"
                  className="py-3 px-4 outline-none rounded-xl bg-searchColorInput text-colorText1 border-2 border-searchColor focus:border-2 focus:border-colorText1 placeholder:text-headerColor font-medium text-lx"
                />
                <input
                  type="text"
                  name="landmark"
                  value={formData.landmark}
                  onChange={handleChange}
                  placeholder="Ponto de Referência"
                  className="py-3 px-4 outline-none rounded-xl bg-searchColorInput text-colorText1 border-2 border-searchColor focus:border-2 focus:border-colorText1 placeholder:text-headerColor font-medium text-lx"
                />
              </div>

              <div className="flex flex-col gap-3 w-72 py-5">
							<button
								className="flex transition duration-400 bg-buttonColor hover:bg-moneyColor text-zinc-100 py-3 px-6 rounded-2xl justify-between"
								type="submit"
								onClick={handleSubmit} // Certifique-se de que o onClick está chamando handleSubmit
							>
								Enviar
								<Send />
							</button>

							<button
								className="flex transition duration-400 bg-buttonColor hover:bg-colorRemove text-zinc-100 py-3 px-6 rounded-2xl justify-between"
								type="button"
								onClick={() => {
									setFormData({ name: "", number: "", paymentMethod: "", cityOrNeighborhood: "", landmark: "" });
									setSelectedOption(""); // Reseta o método de pagamento selecionado
								}}
							>
								Limpar
								<RotateCcw />
							</button>

              </div>
            </form>
          </div>
        </div>
      </main>

      {showSuccessModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-50">
          <div className="bg-white p-6 rounded-xl text-center">
            <p className="text-lg font-semibold">Mensagem enviada com sucesso!</p>
            <button type="button"
              onClick={() => setShowSuccessModal(false)}
              className="mt-4 px-4 py-2 bg-buttonColor hover:bg-moneyColor text-white rounded-md"
            >
              Fechar
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

