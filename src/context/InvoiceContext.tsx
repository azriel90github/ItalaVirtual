import type React from "react";
import { createContext, useContext } from "react";
import jsPDF from "jspdf";

// Define a interface para o contexto de geração de faturas
interface InvoiceContextProps {
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  generateInvoice: (orderData: any) => Promise<Blob | null>; // Função para gerar a fatura
}

// Cria o contexto para o provedor de faturas
const InvoiceContext = createContext<InvoiceContextProps | undefined>(undefined);

// Provedor do contexto de faturas
export const InvoiceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Função para gerar a fatura em PDF
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
    const generateInvoice = async (orderData: any): Promise<Blob | null> => {
    try {
      const doc = new jsPDF(); // Cria uma nova instância do jsPDF

      // Configurações de página
      const pageWidth = doc.internal.pageSize.getWidth(); // Largura da página
      const pageHeight = doc.internal.pageSize.getHeight(); // Altura da página
      const margin = 10; // Margem uniforme

      // Define a cor de fundo da página
      doc.setFillColor(100, 57, 92); // Cor #64395C
      doc.rect(0, 0, pageWidth, pageHeight, "F"); // Preenche a página inteira

      // Função para carregar imagens
      const loadImage = (src: string): Promise<string> => {
        return new Promise((resolve, reject) => {
          const img = new Image();
          img.src = src;
          img.onload = () => {
            const canvas = document.createElement("canvas");
            canvas.width = img.width;
            canvas.height = img.height;
            const ctx = canvas.getContext("2d");
            if (ctx) {
              ctx.drawImage(img, 0, 0, img.width, img.height);
              resolve(canvas.toDataURL("image/png")); // Retorna a imagem em formato base64
            } else {
              reject(new Error("Não foi possível processar a imagem."));
            }
          };
          img.onerror = (err) => reject(err);
        });
      };

      // Caminho da imagem do logo
      const imageSrc1 = "/logo-geladaria.png";

      // Carrega a imagem do logo
      const imageDataUrl1 = await loadImage(imageSrc1);

      // Adiciona o logo no canto superior esquerdo
      const img1Width = 60;
      const img1Height = 32;
      doc.addImage(imageDataUrl1, "PNG", margin, margin, img1Width, img1Height);

      // Adiciona texto de localização no canto superior direito
      doc.setFont("Helvetica", "normal");
      doc.setFontSize(10);
      doc.setTextColor(255, 255, 255); // Cor branca para contraste

      const locationLines = [
        "Endereço da empresa:",
        "Rua Exemplo, 123, Bairro, Cidade",
        "Rua Exemplo, 123, Bairro, Cidade"
      ];

      const lineHeight = 7; // Altura entre linhas
      const xPosition = pageWidth - margin; // Alinhamento à direita

      // Escreve cada linha do endereço alinhada à direita
      locationLines.forEach((line, index) => {
        const textWidth = doc.getTextWidth(line);
        doc.text(line, xPosition - textWidth, margin + index * lineHeight);
      });

      // Adiciona título para os dados do cliente
      doc.setFont("Helvetica", "bold");
      doc.setFontSize(18);
      doc.setTextColor(255, 255, 255);
      doc.text("Dados do Cliente", margin, img1Height + margin + 10);

      // Adiciona os dados do cliente
      doc.setFont("Helvetica", "normal");
      doc.setFontSize(12);
      doc.text(`Nome: ${orderData.name}`, margin, img1Height + margin + 30);
      doc.text(`Número: ${orderData.number}`, margin, img1Height + margin + 40);
      doc.text(`Cidade: ${orderData.city}`, margin, img1Height + margin + 50);
      doc.text(`Bairro: ${orderData.neighborhood}`, margin, img1Height + margin + 60);

      // Configurações para a seção de resumo da encomenda
      const summaryBoxHeight = 60; // Altura da seção
      const borderRadius = 3; // Arredondamento dos cantos
      const summaryBoxY = pageHeight - margin - summaryBoxHeight - 13; // Posição Y antes do rodapé
      const summaryBoxX = margin;
      const summaryBoxWidth = pageWidth - 2 * margin;

      // Adiciona a seção com fundo
      doc.setFillColor(124, 74, 115); // Cor #7C4A73
      doc.roundedRect(summaryBoxX, summaryBoxY, summaryBoxWidth, summaryBoxHeight, borderRadius, borderRadius, "F");

      // Adiciona o texto dentro da seção
      doc.setFont("Helvetica", "bold");
      doc.setFontSize(16);
      doc.setTextColor(255, 255, 255); // Cor branca
      doc.text("Resumo da Encomenda", summaryBoxX + 5, summaryBoxY + 10);

      doc.setFont("Helvetica", "normal");
      doc.setFontSize(12);
      doc.text(`Total de Sabores: ${orderData.flavors}`, summaryBoxX + 5, summaryBoxY + 25);
      doc.text(`Total de Pagamento: ${orderData.payment}`, summaryBoxX + 5, summaryBoxY + 35);
      doc.text(`Método de Pagamento: ${orderData.paymentMethod}`, summaryBoxX + 5, summaryBoxY + 45);

      // Adiciona o rodapé alinhado à direita
      const footerText = "Obrigado pela sua compra!";
      doc.setFontSize(10);
      doc.setFont("Helvetica", "italic");
      doc.setTextColor(255, 255, 255); // Cor branca
      const footerTextWidth = doc.getTextWidth(footerText);
      doc.text(footerText, pageWidth - margin - footerTextWidth, pageHeight - margin);

      // Retorna o PDF gerado como blob
      return doc.output("blob");
    } catch (error) {
      console.error("Erro ao gerar fatura:", error);
      return null; // Retorna null em caso de erro
    }
  };

  return (
    <InvoiceContext.Provider value={{ generateInvoice }}>
      {children}
    </InvoiceContext.Provider>
  );
};

// Hook para usar o contexto de faturas
export const useInvoice = (): InvoiceContextProps => {
  const context = useContext(InvoiceContext);
  if (!context) {
    throw new Error("useInvoice deve ser usado dentro de um InvoiceProvider");
  }
  return context;
};








