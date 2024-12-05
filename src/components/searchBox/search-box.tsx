import { useTranslation } from 'react-i18next';
import { Logs, X } from "lucide-react";
import { useState } from "react";
import { useCart } from "../../context/CartContext.tsx";

interface SearchboxProps {
  onTitleSelect: (title: string) => void;
}

export function Searchbox({ onTitleSelect }: SearchboxProps) {
  const { products } = useCart(); // Acesso aos produtos do contexto
  const { t } = useTranslation();
  const [isSearchBoxModalOpen, setIsSearchBoxModalOpen] = useState(false);
  const [, setSelectedTitle] = useState<string>(""); // Estado para armazenar o título selecionado


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
  const handleSelectTitle = (option: string) => {
    setSelectedTitle(option); // Atualiza o título selecionado
    onTitleSelect(option); // Chama a função passada como prop para passar o título para o pai
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
                {/* Gerando botões dinamicamente com base nos títulos dos produtos */}
                {products.map((product) => (
                  <button
                    key={product.id} // Usando o id do produto para a chave única
                    type="button"
                    className="py-3 px-5 outline-none rounded-xl transition duration-400 hover:text-zinc-300 hover:bg-buttonColor bg-searchColorInput flex items-center justify-between"
                    onClick={() => handleSelectTitle(product.title)} // Seleciona o título do produto
                  >
                    <p className="text-zinc-300">{product.title}</p>
                    <Logs />
                  </button>
                ))}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
