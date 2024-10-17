import { createContext, useState, useContext } from 'react';

// Criando um contexto
const ResultContext = createContext();

// Função para usar o contexto facilmente
export function useResult() {
  return useContext(ResultContext);
}

// Provider para compartilhar o estado do cálculo
export function ResultProvider({ children }) {
  const [result, setResult] = useState(0); // Armazenando o resultado

  return (
    <ResultContext.Provider value={{ result, setResult }}>
      {children}
    </ResultContext.Provider>
  );
}
