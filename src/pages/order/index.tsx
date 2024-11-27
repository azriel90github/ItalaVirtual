import { useEffect, useState } from "react";
import { ChartNoAxesCombined, CircleAlert, CreditCard, Download, HandCoins, Landmark, Package, X } from "lucide-react";
import {
  RotateCcw,
  Send,
  ShoppingCart,
  Trash2,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import { MenuButton } from "../../components/buttons/menu-button";
import { LanguageModal } from "../../components/modal/language-modal";
//import { useResult } from "../../context/ResultContext.tsx";
import { useLocation } from "react-router-dom";

import { useTranslation } from 'react-i18next';
//import { PaymentMethodModal } from "../../components/modal/payment-method-modal.tsx";

export function OrderPage() {
  /**
  const location = useLocation();
  const { flavors, total } = location.state || { flavors: 0, total: 0 };

  useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      flavors: flavors.toString(),
      payment: total.toString(),
    }));
  }, [flavors, total]);
   */

  const { t } = useTranslation();

  const [selectedOption, setSelectedOption] = useState(""); // Estado para o valor selecionado
  const [isPaymentMethodModalOpen, setIsPaymentMethodModalOpen] = useState(false);
  //const { total } = useResult(); // Acessa o valor do total do contexto

  const location = useLocation();
  // Recebe os dados passados pela navegação
  const { flavors = 0, total = 0 } = location.state || {};


  const [formData, setFormData] = useState({
    name: "",
    number: "",
    flavors: total.toString(), // Converte para string
    payment: total.toString(), // Converte para string
    paymentMethod: "",
    cityOrNeighborhood: "",
    landmark: "",
  });
  
  // biome-ignore lint/correctness/useExhaustiveDependencies: <explanation>
    useEffect(() => {
    setFormData((prev) => ({
      ...prev,
      flavors: total.toString(), // Atualiza como string
      payment: total.toString(), // Atualiza como string
    }));
  }, [flavors, total]);
  

	// Função para fechar o modal e definir a opção selecionada
  const [showSuccessModal, setShowSuccessModal] = useState(false);
  const navigate = useNavigate();

  const handleSelectOption = (option: string) => {
    console.log("Método selecionado:", option);
    setSelectedOption(option);
    setFormData((prev) => ({
      ...prev,
      paymentMethod: option, // Atualiza o método de pagamento no estado
    }));
    setIsPaymentMethodModalOpen(false);
    enableScroll();
  };
  
	function openPaymentMethodModal() {

    function disableScroll() {
      document.body.style.overflow = "hidden";
    }
    
		setIsPaymentMethodModalOpen(true);
    disableScroll(); // Bloqueia rolagem ao abrir
	}

  function enableScroll() {
    document.body.style.overflow = "";
  }

	function closePaymentMethodModal() {
		setIsPaymentMethodModalOpen(false);
    enableScroll(); // Desbloqueia rolagem ao fechar
	}

  const menuPage = () => navigate("/menu/123");

  // Função para lidar com a mudança dos campos do formulário
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value, // Atualiza o campo correto no estado
    }));
  };
  

  const [showValidationModal, setShowValidationModal] = useState(false); // Novo estado para validação
  const [validationMessage, setValidationMessage] = useState("");


  const validateForm = () => {
    const {
      name,
      number,
      flavors,
      payment,
      paymentMethod,
      cityOrNeighborhood,
      landmark,
    } = formData;

    // Verifica se todos os campos estão vazios
    const allFieldsEmpty = 
    !name.trim() &&
    !number.trim() &&
    (!flavors || Number.parseFloat(flavors) === 0) &&
    (!payment || Number.parseFloat(payment) === 0) &&
    !paymentMethod.trim() &&
    !cityOrNeighborhood.trim() &&
    !landmark.trim();

    if (allFieldsEmpty) {
      setValidationMessage(t('orderpage.validationAllFields')); // Mensagem genérica
      setShowValidationModal(true);
      setTimeout(() => setShowValidationModal(false), 2000); // Fecha modal após 2 segundos
      return false;
    }
  
    if (!name.trim()) {
      setValidationMessage(t('orderpage.validationName')); // Mensagem para o campo de nome
      setShowValidationModal(true);
      setTimeout(() => setShowValidationModal(false), 2000); // Fecha modal após 2 segundos
      return false;
    }
  
    if (!number.trim()) {
      setValidationMessage(t('orderpage.validationNumber')); // Mensagem para o campo de número
      setShowValidationModal(true);
      setTimeout(() => setShowValidationModal(false), 2000); // Fecha modal após 2 segundos
      return false;
    }
  
    if (!flavors || Number.parseFloat(flavors) === 0) {
      setValidationMessage(t('orderpage.validationFlavors')); // Mensagem para o campo de sabores
      setShowValidationModal(true);
      setTimeout(() => setShowValidationModal(false), 2000); // Fecha modal após 2 segundos
      return false;
    }
  
    if (!payment || Number.parseFloat(payment) === 0) {
      setValidationMessage(t('orderpage.validationPayment')); // Mensagem para o campo de pagamento
      setShowValidationModal(true);
      setTimeout(() => setShowValidationModal(false), 2000); // Fecha modal após 2 segundos
      return false;
    }
  
    if (!paymentMethod.trim()) {
      setValidationMessage(t('orderpage.validationPaymentMethod')); // Mensagem para o método de pagamento
      setShowValidationModal(true);
      setTimeout(() => setShowValidationModal(false), 2000); // Fecha modal após 2 segundos
      return false;
    }
  
    if (!cityOrNeighborhood.trim()) {
      setValidationMessage(t('orderpage.validationCity')); // Mensagem para o campo de bairro/cidade
      setShowValidationModal(true);
      setTimeout(() => setShowValidationModal(false), 2000); // Fecha modal após 2 segundos
      return false;
    }
  
    if (!landmark.trim()) {
      setValidationMessage(t('orderpage.validationLandmark')); // Mensagem para o campo de referência
      setShowValidationModal(true);
      setTimeout(() => setShowValidationModal(false), 2000); // Fecha modal após 2 segundos
      return false;
    }
  
    return true; // Se tudo estiver preenchido, retorna true
  };
  
  
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault(); // Previne o comportamento padrão do formulário
  
    if (!validateForm()) return; // Bloqueia envio se a validação falhar
  
    console.log("Formulário válido, enviando...");
  
    try {
      const response = await fetch("http://localhost:3334/order", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          ...formData,
          number: Number.parseInt(formData.number), 
          flavors: Number.parseInt(formData.flavors), 
          payment: Number.parseInt(formData.payment), 
          paymentMethod: selectedOption, 
        }),
      });
  
      if (response.ok) {
        const data = await response.json();
        console.log('Ordem criada:', data);
        setShowSuccessModal(true);
      } else {
        console.error("Erro ao enviar os dados.");
      }
    } catch (error) {
      console.error("Erro na requisição:", error);
    }
  };
  
  
  
  return (
    <div className="max-w-6xl px-6 py-10 mx-auto bg-fundoHome bg-no-repeat bg-right">
      <div className="border-2 mb-10 border-colorInput p-3 h-full rounded-3xl shadow-shape bg-searchColor text-buttonColor flex flex-wrap gap-3 items-center justify-between font-medium text-xl">
        <div className="flex items-center">
          <p className="pl-3 text-2xl font-normal">{t('orderpage.h3menu')}</p>
        </div>

        <div className="flex items-center gap-4">
          <MenuButton />
          <div className="w-px h-12 bg-buttonColor2">
						
					</div>
          <LanguageModal />
        </div>
      </div>

      <form onSubmit={handleSubmit}>
        <main className="flex flex-wrap gap-16">
          <div className="w-80 h-full bg-searchColor py-3.5 px-3.5 rounded-3xl">
            <div className="flex flex-col gap-1.5">
              <div className="bg-buttonColor2 text-lx items-center text-zinc-100 py-3 px-5 w-full rounded-2xl flex justify-between">
                {t('orderpage.h2order')}
                <ChartNoAxesCombined />
              </div>
            </div>

            <p className="flex justify-between pt-5 px-3 text-xl">
              <h3 className="text-buttonColor font-medium">{t('orderpage.sabores')}</h3>
              <input
                  type="text"
                  name="flavors"
                  onChange={handleChange}
                  value={formData.flavors.toString()} // Certifique-se de que está sincronizado com o estado                 
                  readOnly
                  className="text-moneyColor1 bg-transparent text-right outline-none focus:ring-0"
                />
            </p>

            <p className="flex justify-between py-2 px-3 text-xl">
              <h3 className="text-buttonColor font-medium">{t('orderpage.pagamento')}</h3>
              <input
                type="text"
                name="payment"
                onChange={handleChange} // Atualiza o estado
                value={formData.payment.toString()} // Garante que seja string
                readOnly
                className="text-moneyColor1 bg-transparent text-right outline-none focus:ring-0"
              />
            </p>

            <div className="flex flex-col gap-3">
              <button type="button"
                onClick={menuPage}
                className="flex mt-6 transition duration-400 bg-buttonColor2 hover:bg-moneyColor text-zinc-100 py-3 px-5 w-full rounded-2xl justify-between"
              >
                {t('orderpage.adicionar')}
                <ShoppingCart />
              </button>
              <button type="button"
                onClick={menuPage}
                className="flex transition duration-400 bg-buttonColor2 hover:bg-colorRemove text-zinc-100 py-3 px-5 w-full rounded-2xl justify-between"
              >
                {t('orderpage.remover')}
                <Trash2 />
              </button>
            </div>
          </div>

          <div className="flex-1">
            <h1 className="pb-5 text-4xl flex items-center font-light text-zinc-300">
              {t('orderpage.h2encomendar')}
            </h1>

            <div className="py-4">
              
                <div className="flex flex-col gap-3 w-full">
                  <input
                    type="text"
                    name="name"
                    value={formData.name}
                    onChange={handleChange}
                    placeholder={t('orderpage.placeholderName')}
                    className="py-3 px-4 outline-none rounded-xl bg-searchColorInput text-colorText1 border-2 border-searchColor focus:border-2 focus:border-colorText1 placeholder:text-headerColor font-medium text-lx"
                  />
                  {/** <span className='error'>Preencha o seu e-mail corretamente.</span> */}
                  <input
                    type="number"
                    name="number"
                    value={formData.number}
                    onChange={handleChange}
                    placeholder={t('orderpage.placeholderNumber')}
                    className="removeNumber py-3 px-4 outline-none rounded-xl bg-searchColorInput text-colorText1 border-2 border-searchColor focus:border-2 focus:border-colorText1 placeholder:text-headerColor font-medium text-lx"
                  />
                  <input
                    readOnly
                    value={formData.paymentMethod} // Use o valor do estado
                    onChange={handleChange} // Atualiza o estado
                    placeholder={t('orderpage.placeholderPaymentMethod')}
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
                            {t('orderpage.h2selectMethod')}
                            <X onClick={closePaymentMethodModal} className="cursor-pointer" />
                            {/** <X className="size-6 cursor-pointer" /> */}
                          </div>
                          <div className="flex flex-col py-3 mt-2 gap-3">
                            <button
                              type="button"
                              className="py-3 px-5 outline-none rounded-xl transition duration-400 hover:text-zinc-300 hover:bg-buttonColor bg-searchColorInput flex items-center justify-between"
                              onClick={() => handleSelectOption("Dinheiro em mão")}
                            >
                              <p className="text-zinc-300">{t('orderpage.money')}</p>
                              <HandCoins/>
                            </button>
                            <button
                              type="button"
                              className="py-3 px-5 outline-none rounded-xl transition duration-400 hover:text-zinc-300 hover:bg-buttonColor bg-searchColorInput flex items-center justify-between"
                              onClick={() => handleSelectOption("Multicaixa Express")}
                            >
                              <p className="text-zinc-300">{t('orderpage.express')}</p>
                              <Landmark/>
                            </button>
                            <button
                              type="button"
                              className="py-3 px-5 outline-none rounded-xl transition duration-400 hover:text-zinc-300 hover:bg-buttonColor bg-searchColorInput flex items-center justify-between"
                              onClick={() => handleSelectOption("Transfência Bancária")}
                            >
                              <p className="text-zinc-300">{t('orderpage.tpa')}</p>
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
                    placeholder={t('orderpage.placeholderCityOrNeighborhood')}
                    className="py-3 px-4 outline-none rounded-xl bg-searchColorInput text-colorText1 border-2 border-searchColor focus:border-2 focus:border-colorText1 placeholder:text-headerColor font-medium text-lx"
                  />
                  <input
                    type="text"
                    name="landmark"
                    value={formData.landmark}
                    onChange={handleChange}
                    placeholder={t('orderpage.placeholderLandmark')}
                    className="py-3 px-4 outline-none rounded-xl bg-searchColorInput text-colorText1 border-2 border-searchColor focus:border-2 focus:border-colorText1 placeholder:text-headerColor font-medium text-lx"
                  />
                </div>

                <div className="flex flex-col gap-3 w-72 py-5">
                <button
                  className="flex transition duration-400 bg-buttonColor hover:bg-moneyColor text-zinc-100 py-3 px-6 rounded-2xl justify-between"
                  type="submit"
                  onSubmit={handleSubmit} // Certifique-se de que o onClick está chamando handleSubmit
                >
                  {t('orderpage.send')}
                  <Send />
                </button>

                <button
                  className="flex transition duration-400 bg-buttonColor hover:bg-colorRemove text-zinc-100 py-3 px-6 rounded-2xl justify-between"
                  type="button"
                  onClick={() => {
                    setFormData({
                      name: "",
                      number: "",
                      flavors: total.toString(), // Reinicia com valor de total
                      payment: total.toString(), // Reinicia com valor de total
                      paymentMethod: "",
                      cityOrNeighborhood: "",
                      landmark: "",
                    });
                    setSelectedOption(""); // Reseta método de pagamento
                  }}
                >
                  {t('orderpage.reset')}
                  <RotateCcw />
                </button>

                </div>
              
            </div>
          </div>
        </main>
      </form>

      {showSuccessModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60 bg-opacity-50">
          <div className="w-[640px] rounded-xl py-6 px-6 bg-colorFundo">
            <div className="items-center flex justify-between">
              <p className="text-moneyColor1 text-xl font-normal">{t('orderpage.modalSend')}</p>
              <div className="flex">
                <Package className="size-7 text-moneyColor1" />
              </div>
            </div>
            <div className="py-3">
              <h3 className="text-buttonColor font-semibold text-[19px] pb-1.5">{t('orderpage.modalSendh3')}</h3>
              <p className="text-zinc-300 pb-2 flex-1">{t('orderpage.modalSendP')}</p>
            </div>
            <div className="items-center gap-3 flex flex-wrap">
              <button onClick={() => setShowSuccessModal(false)} className="w-full flex transition duration-400 bg-searchColor hover:bg-moneyColor text-zinc-100 py-3 px-5 rounded-xl justify-between" type="button">
                {t('orderpage.modalSendButton')}
                <Download />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Validation Modal */}
      {showValidationModal && (
        <div className="fixed inset-0 flex items-center justify-center bg-black/60 bg-opacity-50">
          <div className="w-[540px] rounded-xl py-6 px-6 flex items-center justify-between bg-colorHover">
            <p className="text-red-500 text-lg font-normal">{validationMessage}</p>
            <CircleAlert className="text-red-500" />
          </div>
        </div>
      )}
    </div>
  );
}


