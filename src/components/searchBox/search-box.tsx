import { useTranslation } from 'react-i18next';
import { Logs, X } from "lucide-react";
import { type SetStateAction, useState } from "react";

export function Searchbox() {
  const { t } = useTranslation();
  const [isSearchBoxModalOpen, setIsSearchBoxModalOpen] = useState(false);
  const [, setSelectedOption] = useState(""); // Estado para o valor selecionado

  // Função para abrir o modal
  function openSearchBoxModal() {
    setIsSearchBoxModalOpen(true);
    // Opcional: Bloquear rolagem ao abrir o modal
    // document.body.style.overflow = "hidden";
  }

  // Função para fechar o modal
  function closeSearchBoxModal() {
    setIsSearchBoxModalOpen(false);
    // Opcional: Reativar rolagem ao fechar o modal
    // document.body.style.overflow = "";
  }

  // Função para selecionar uma opção e fechar o modal
  const handleSelectOption = (option: SetStateAction<string>) => {
    setSelectedOption(option);
    closeSearchBoxModal();
  };

  return (
    <div className="flex justify-center cursor-pointer">
      <div className="flex gap-2 items-center bg-searchColor text-buttonColor p-2.5 rounded-full w-96 justify-between font-medium text-lg">
        {/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
				<div
          className="bg-colorFundo w-full flex items-center justify-between rounded-full"
          onClick={openSearchBoxModal}
        >
          <div className="w-full py-2.5 px-5 flex items-center justify-between">
            <p>{t('modal.Searchbox')}</p>
						<Logs />
          </div>
          
        </div>
      </div>

      {isSearchBoxModalOpen && (
        // biome-ignore lint/a11y/useKeyWithClickEvents: <explanation>
				<div
          onClick={closeSearchBoxModal}
          className="fixed inset-0 bg-black/60 flex items-center justify-center"
        >
          {/* biome-ignore lint/a11y/useKeyWithClickEvents: <explanation> */}
					<div
            onClick={(e) => e.stopPropagation()}
            className="w-[640px] rounded-xl py-5 px-6 bg-colorFundo"
          >
            <div className="text-buttonColor font-medium">
              <div className="flex items-center justify-between text-xl ml-1">
                {t('modal.modalSearchBox.title')}
                <X onClick={closeSearchBoxModal} className="cursor-pointer" />
              </div>
              <div className="flex flex-col py-3 mt-2 gap-3">
                <button
                  type="button"
                  className="py-3 px-5 outline-none rounded-xl transition duration-400 hover:text-zinc-300 hover:bg-buttonColor bg-searchColorInput flex items-center justify-between"
                  onClick={() => handleSelectOption("category1")}
                >
                  <p className="text-zinc-300">{t('modal.modalSearchBox.category1')}</p>
                  <Logs />
                </button>
                <button
                  type="button"
                  className="py-3 px-5 outline-none rounded-xl transition duration-400 hover:text-zinc-300 hover:bg-buttonColor bg-searchColorInput flex items-center justify-between"
                  onClick={() => handleSelectOption("category2")}
                >
                  <p className="text-zinc-300">{t('modal.modalSearchBox.category2')}</p>
                  <Logs />
                </button>
                <button
                  type="button"
                  className="py-3 px-5 outline-none rounded-xl transition duration-400 hover:text-zinc-300 hover:bg-buttonColor bg-searchColorInput flex items-center justify-between"
                  onClick={() => handleSelectOption("category3")}
                >
                  <p className="text-zinc-300">{t('modal.modalSearchBox.category3')}</p>
                  <Logs />
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
