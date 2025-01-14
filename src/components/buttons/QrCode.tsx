import { useState } from "react";
import { QrCode } from "lucide-react";
import QRCode from "qrcode.react";

// Define os tipos das propriedades
type QrCodeButtonProps = {
  productId: string; // ID do produto
  productUrl: string; // URL base do produto
};

export function QrCodeButton({ productId, productUrl }: QrCodeButtonProps) {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  // Gera o link completo do produto
  const productLink = `${productUrl}/${productId}`;

  // Função para copiar o link para a área de transferência
  const handleCopyLink = () => {
    navigator.clipboard.writeText(productLink);
    alert("Link copiado para a área de transferência!");
  };

  // Função para baixar o QR Code como imagem
  const handleDownloadQrCode = () => {
    const canvas = document.getElementById("product-qr-code") as HTMLCanvasElement;
    if (!canvas) {
      alert("Erro ao gerar o QR Code. Tente novamente.");
      return;
    }
    const link = document.createElement("a");
    link.download = `qrcode_${productId}.png`;
    link.href = canvas.toDataURL("image/png");
    link.click();
  };

  return (
    <>
      {/* Botão para abrir o modal */}
      {/* biome-ignore lint/a11y/useButtonType: <explanation> */}
<button
        onClick={() => setIsModalOpen(true)}
        className="hover:bg-colorHover bg-buttonColor transition duration-400 text-zinc-200 hover:text-zinc-200 rounded-2xl px-4 py-3.5"
      >
        <QrCode />
      </button>

      {/* Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-96 text-center">
            {/* QR Code gerado */}
            <QRCode id="product-qr-code" value={productLink} size={200} />

            {/* Botões para baixar o QR Code e copiar o link */}
            <div className="mt-4 space-x-4">
              {/* biome-ignore lint/a11y/useButtonType: <explanation> */}
<button
                onClick={handleDownloadQrCode}
                className="bg-green-500 text-white px-4 py-2 rounded-lg hover:bg-green-600 transition"
              >
                Baixar QR Code
              </button>
              {/* biome-ignore lint/a11y/useButtonType: <explanation> */}
<button
                onClick={handleCopyLink}
                className="bg-blue-500 text-white px-4 py-2 rounded-lg hover:bg-blue-600 transition"
              >
                Copiar Link
              </button>
            </div>

            {/* Botão para fechar o modal */}
            {/* biome-ignore lint/a11y/useButtonType: <explanation> */}
<button
              onClick={() => setIsModalOpen(false)}
              className="mt-4 text-red-500 hover:text-red-600 transition"
            >
              Fechar
            </button>
          </div>
        </div>
      )}
    </>
  );
}
