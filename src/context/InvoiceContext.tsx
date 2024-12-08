import type React from "react";
import { createContext, useContext } from "react";
import jsPDF from "jspdf";

interface InvoiceContextProps {
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  generateInvoice: (orderData: any) => Promise<Blob | null>;
}

const InvoiceContext = createContext<InvoiceContextProps | undefined>(
  undefined
);

export const InvoiceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // biome-ignore lint/suspicious/noExplicitAny: <explanation>
  const generateInvoice = async (orderData: any): Promise<Blob | null> => {
    try {
      const doc = new jsPDF();
      doc.text("Fatura da Encomenda", 10, 10);
      doc.text(`Nome: ${orderData.name}`, 10, 20);
      doc.text(`Número: ${orderData.number}`, 10, 30);
      doc.text(`Total de Sabores: ${orderData.flavors}`, 10, 40);
      doc.text(`Total de Pagamento: ${orderData.payment}`, 10, 50);
      doc.text(`Método de Pagamento: ${orderData.paymentMethod}`, 10, 60);
      doc.text(`Endereço: ${orderData.cityOrNeighborhood}`, 10, 70);
      doc.text(`Ponto de Referência: ${orderData.landmark}`, 10, 80);

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
