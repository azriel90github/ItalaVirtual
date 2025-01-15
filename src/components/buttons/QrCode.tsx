import { useState } from "react";
import { QrCode } from "lucide-react";
import QRCode from "react-qr-code"; // Certifique-se de instalar esta biblioteca

type QrCodeButtonProps = {
  productId: string; // ID do produto
  productUrl: string; // URL base do produto
};

export function QrCodeButton({ productId, productUrl }: QrCodeButtonProps) {
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);

  const productLink = `${productUrl}/${productId}`;

  const handleCopyLink = () => {
    navigator.clipboard.writeText(productLink);
    alert("Link copiado para a área de transferência!");
  };

  const handleDownloadQrCode = () => {
    const svgElement = document.getElementById("product-qr-code") as unknown as SVGElement;
    if (!svgElement) {
      alert("Erro ao gerar o QR Code. Tente novamente.");
      return;
    }
  
    const svgData = new XMLSerializer().serializeToString(svgElement);
    const canvas = document.createElement("canvas");
    const ctx = canvas.getContext("2d");
  
    const img = new Image();
    img.src = `data:image/svg+xml;base64,${btoa(svgData)}`;
  
    img.onload = () => {
      const margin = 20; // Tamanho da margem em pixels
      const size = img.width + margin * 2; // Tamanho do QR Code + margens
  
      // Configura o tamanho do canvas para incluir as margens
      canvas.width = size;
      canvas.height = size;
  
      if (ctx) {
        // Adiciona uma cor de fundo (opcional)
        ctx.fillStyle = "#ffffff"; // Branco
        ctx.fillRect(0, 0, size, size);
  
        // Desenha o QR Code com as margens
        ctx.drawImage(img, margin, margin, img.width, img.height);
  
        // Converte o canvas para uma imagem PNG
        const pngFile = canvas.toDataURL("image/png");
        const downloadLink = document.createElement("a");
        downloadLink.href = pngFile;
        downloadLink.download = `qrcode_${productId}.png`;
        downloadLink.click();
      }
    };
  };
  

  return (
    <>
      {/* biome-ignore lint/a11y/useButtonType: <explanation> */}
      <button
        onClick={() => setIsModalOpen(true)}
        className="hover:bg-colorHover bg-buttonColor3 transition duration-400 text-zinc-200 hover:text-zinc-200 rounded-2xl px-4 py-3.5"
      >
        <QrCode />
      </button>

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-colorFundo rounded-lg shadow-lg m-6 w-96 text-center">
            {/* QR Code gerado */}
            <div id="qr-code-container" className="p-4">
              <QRCode id="product-qr-code" value={productLink} size={200} />
            </div>

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
