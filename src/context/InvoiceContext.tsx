import type React from "react";
import { createContext, useContext } from "react";
import jsPDF from "jspdf";

interface InvoiceContextProps {
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  generateInvoice: (orderData: any) => Promise<Blob | null>;
}

const InvoiceContext = createContext<InvoiceContextProps | undefined>(undefined);

export const InvoiceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  const generateInvoice = async (orderData: any): Promise<Blob | null> => {
    try {
      const doc = new jsPDF();

      // Dimensões da página
      const pageWidth = doc.internal.pageSize.getWidth();
      const pageHeight = doc.internal.pageSize.getHeight();
      const margin = 10; // Margem uniforme em todos os lados

      // Definir a cor de fundo da página
      doc.setFillColor(100, 57, 92); // Cor #64395C
      doc.rect(0, 0, pageWidth, pageHeight, "F"); // Preenche a página inteira

      // Função para carregar imagem
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
              resolve(canvas.toDataURL("image/png"));
            } else {
              reject(new Error("Não foi possível processar a imagem."));
            }
          };
          img.onerror = (err) => reject(err);
        });
      };

      // Caminho relativo da imagem na pasta public
      const imageSrc1 = "/logo-geladaria.png"; // Substitua pelo caminho da sua imagem

      // Carregar a imagem do logo
      const imageDataUrl1 = await loadImage(imageSrc1);

      // Adicionar a imagem do logo no canto superior esquerdo
      const img1Width = 60;
      const img1Height = 32;
      doc.addImage(imageDataUrl1, "PNG", margin, margin, img1Width, img1Height);

      // Adicionar texto fictício de localização no canto superior direito com quebras de linha
      doc.setFont("Helvetica", "normal");
      doc.setFontSize(10);
      doc.setTextColor(255, 255, 255); // Texto branco para contraste

      const locationLines = [
        "Endereço da empresa:",
        "Rua Exemplo, 123, Bairro, Cidade"
      ];

      const lineHeight = 7; // Altura entre as linhas
      const xPosition = pageWidth - margin; // Posição X para o alinhamento à direita

      // Adicionar cada linha do endereço, alinhada à direita
      locationLines.forEach((line, index) => {
        const textWidth = doc.getTextWidth(line);
        doc.text(line, xPosition - textWidth, margin + index * lineHeight);
      });

      // Estilos de texto
      doc.setFont("Helvetica", "bold");
      doc.setFontSize(18);
      doc.setTextColor(255, 255, 255); // Texto branco para contraste
      doc.text("Dados do Cliente", margin, img1Height + margin + 10);

      doc.setFontSize(12);
      doc.setFont("Helvetica", "normal");

      // Exibir os detalhes do cliente
      doc.text(`Nome: ${orderData.name}`, margin, img1Height + margin + 30);
      doc.text(`Número: ${orderData.number}`, margin, img1Height + margin + 40);

      // Seção resumo da encomenda com fundo, padding e border-radius
      const summaryBoxX = margin;
      const summaryBoxY = img1Height + margin + 50; // Posição Y para a seção resumo
      const summaryBoxWidth = pageWidth - 2 * margin;
      const summaryBoxHeight = 60; // Altura da seção resumo
      const borderRadius = 3; // Border-radius

      // Cor de fundo da seção resumo
      doc.setFillColor(124, 74, 115); // Cor #7C4A73
      doc.roundedRect(summaryBoxX, summaryBoxY, summaryBoxWidth, summaryBoxHeight, borderRadius, borderRadius, "F");

      // Adicionar texto da seção resumo com padding interno
      doc.setFont("Helvetica", "bold");
      doc.setFontSize(16);
      doc.setTextColor(255, 255, 255); // Texto branco para contraste
      doc.text("Resumo da Encomenda", summaryBoxX + 5, summaryBoxY + 10); // Padding superior

      doc.setFont("Helvetica", "normal");
      doc.setFontSize(12);
      doc.text(`Total de Sabores: ${orderData.flavors}`, summaryBoxX + 5, summaryBoxY + 25); // Padding superior
      doc.text(`Total de Pagamento: ${orderData.payment}`, summaryBoxX + 5, summaryBoxY + 35); // Padding superior
      doc.text(`Método de Pagamento: ${orderData.paymentMethod}`, summaryBoxX + 5, summaryBoxY + 45); // Padding superior

      // Rodapé
      doc.setFontSize(10);
      doc.setFont("Helvetica", "italic");
      doc.setTextColor(255, 255, 255); // Texto branco para contraste
      doc.text("Obrigado pela sua compra!", margin, pageHeight - margin);

      // Gerar o blob do PDF
      return doc.output("blob");
    } catch (error) {
      console.error("Erro ao gerar fatura:", error);
      return null;
    }
  };

  return (
    <InvoiceContext.Provider value={{ generateInvoice }}>
      {children}
    </InvoiceContext.Provider>
  );
};

export const useInvoice = (): InvoiceContextProps => {
  const context = useContext(InvoiceContext);
  if (!context) {
    throw new Error("useInvoice deve ser usado dentro de um InvoiceProvider");
  }
  return context;
};






