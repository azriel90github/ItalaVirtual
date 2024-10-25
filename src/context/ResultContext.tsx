import type React from 'react';
import { createContext, useState, useContext } from 'react';

// Define a interface para o contexto
interface ResultContextType {
  count: number;
  total: number;
  isAlternateIcon: boolean;
  buttonColor: string; // Novo estado para controlar a cor do botão
  incrementCount: () => void;
  decrementCount: () => void;
  calculateTotal: () => void;
  resetCart: () => void;
  toggleIcon: () => void; // Nova função para alternar o ícone
}

// Cria o contexto com valores padrão
const ResultContext = createContext<ResultContextType | undefined>(undefined);

// Hook para acessar o contexto
export const useResult = () => {
  const context = useContext(ResultContext);
  if (!context) {
    throw new Error('useResult must be used within a ResultProvider');
  }
  return context;
};

// Provider para envolver a aplicação
export const ResultProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [count, setCount] = useState(0);
  const [total, setTotal] = useState(0);
  const [isAlternateIcon, setIsAlternateIcon] = useState(false); // Novo estado para controlar o ícone
  const [buttonColor, setButtonColor] = useState<string>(''); // Define o estado inicial como vazio

  // Incrementa o número de colheres
  const incrementCount = () => setCount((prev) => prev + 1);

  // Decrementa o número de colheres com limite 0
  const decrementCount = () => setCount((prev) => Math.max(prev - 1, 0));

  // Calcula o total multiplicando por 320
  const calculateTotal = () => setTotal(count * 320);

  // Reseta o número de colheres, total e ícone
  const resetCart = () => {
    setCount(0);
    setTotal(0);
    setIsAlternateIcon(false); // Volta o ícone ao original
    setButtonColor(''); // Reseta a cor ao remover do carrinho
  };

  // Alterna o ícone
  const toggleIcon = () => {
    setButtonColor('green'); // Define a cor verde ao adicionar ao carrinho
    setIsAlternateIcon(true); // Alterna para o ícone de check
  } 

  return (
    <ResultContext.Provider
      value={{
        count,
        total,
        isAlternateIcon,
        buttonColor,
        incrementCount,
        decrementCount,
        calculateTotal,
        resetCart,
        toggleIcon,
        setButtonColor, // Adiciona a função ao contexto
      }}
    >
      {children}
    </ResultContext.Provider>
  );
};


