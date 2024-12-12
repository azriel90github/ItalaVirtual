import React, { createContext, useContext } from "react";
import {
  Document,
  Page,
  Text,
  View,
  StyleSheet,
  Font,
  Image,
  pdf,
} from "@react-pdf/renderer";

// Registrar fonte personalizada (opcional)
Font.register({
  family: "Roboto",
  fonts: [
    { src: "https://fonts.googleapis.com/css2?family=Roboto:wght@400;700&display=swap" },
  ],
});

// Definir uma interface para os dados da encomenda
interface FormData {
  name: string;
  number: string;
  cityOrNeighborhood: string;
  landmark: string;
  flavors: number;
  payment: string;
  paymentMethod: string;
}

// Definir a interface para o contexto
interface InvoiceContextProps {
  generateInvoice: (formData: FormData) => JSX.Element;
  downloadInvoice: (formData: FormData) => Promise<void>;
}

// Criar o contexto para o provedor de faturas
const InvoiceContext = createContext<InvoiceContextProps | undefined>(undefined);

// Estilos para o PDF
const styles = StyleSheet.create({
  page: {
    flexDirection: "column",
    backgroundColor: "#64395C",
    padding: 20,
  },
  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: 20,
  },
  logo: {
    width: 60,
    height: 32,
  },
  address: {
    textAlign: "right",
    color: "white",
    fontSize: 10,
    lineHeight: 1.5,
  },
  sectionTitle: {
    color: "white",
    fontSize: 18,
    marginBottom: 10,
  },
  text: {
    color: "white",
    fontSize: 12,
    marginBottom: 5,
  },
  summaryBox: {
    backgroundColor: "#7C4A73",
    borderRadius: 3,
    padding: 10,
    marginTop: 20,
  },
  summaryText: {
    color: "white",
    fontSize: 12,
  },
  footer: {
    position: "absolute",
    bottom: 10,
    right: 10,
    color: "white",
    fontSize: 10,
    fontStyle: "italic",
  },
});

// Provedor de faturas
export const InvoiceProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  // Função para gerar a fatura como PDF
  const generateInvoice = (formData: FormData): JSX.Element => {
    return (
      <Document>
        <Page size="A4" style={styles.page}>
          {/* Cabeçalho */}
          <View style={styles.header}>
            {/* Logo */}
            <View>
              <Image style={styles.logo} src="/logo-geladaria.png" />
            </View>
            {/* Endereço */}
            <View>
              <Text style={styles.address}>Endereço da empresa:</Text>
              <Text style={styles.address}>Rua Exemplo, 123, Bairro, Cidade</Text>
            </View>
          </View>

          {/* Dados do Cliente */}
          <View>
            <Text style={styles.sectionTitle}>Dados do Cliente</Text>
            <Text style={styles.text}>Nome: {formData.name}</Text>
            <Text style={styles.text}>Número: {formData.number}</Text>
            <Text style={styles.text}>
              Cidade ou bairro: {formData.cityOrNeighborhood}
            </Text>
            <Text style={styles.text}>
              Ponto de referência: {formData.landmark}
            </Text>
          </View>

          {/* Resumo da Encomenda */}
          <View style={styles.summaryBox}>
            <Text style={styles.sectionTitle}>Resumo da Encomenda</Text>
            <Text style={styles.summaryText}>
              Total de Sabores: {formData.flavors}
            </Text>
            <Text style={styles.summaryText}>
              Total de Pagamento: {formData.payment}
            </Text>
            <Text style={styles.summaryText}>
              Método de Pagamento: {formData.paymentMethod}
            </Text>
          </View>

          {/* Rodapé */}
          <Text style={styles.footer}>Obrigado pela sua compra!</Text>
        </Page>
      </Document>
    );
  };

  // Função para gerar e baixar o PDF
  const downloadInvoice = async (formData: FormData): Promise<void> => {
    const invoiceComponent = generateInvoice(formData); // Gera a fatura como componente
    const blob = await pdf(invoiceComponent).toBlob(); // Converte para Blob
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = `Fatura_${formData.name}.pdf`;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
  };

  return (
    <InvoiceContext.Provider value={{ generateInvoice, downloadInvoice }}>
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


