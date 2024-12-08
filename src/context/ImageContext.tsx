import type React from 'react';
import { createContext, useContext, type ReactNode } from 'react';

// Definição da interface ImageContextProps
interface ImageContextProps {
  images: { [key: string]: string }; // Mapeamento de ID para URL da imagem
  getImageById: (id: string) => string; // Função para obter URL da imagem por ID
}

// Criação do contexto com um valor inicial indefinido
const ImageContext = createContext<ImageContextProps | undefined>(undefined);

// Componente Provider para o contexto de imagens
export const ImageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const images: { [key: string]: string } = {
    gt1g1yrev4exfp78pevnvcua: '/menu/ice-cream1.png',
    gy44hi7w8ie5jkhufpysg4tq: '/menu/default.png',
    mqkxrqikkksmwycytk8q1h7a: '/menu/default.png',
  };

  const getImageById = (id: string): string => {
    return images[id] || '/menu/default.png';
  };

  return (
    <ImageContext.Provider value={{ images, getImageById }}>
      {children}
    </ImageContext.Provider>
  );
};

// Hook personalizado para consumir o contexto
export const useImage = (): ImageContextProps => {
  const context = useContext(ImageContext);
  if (!context) {
    throw new Error('useImage must be used within an ImageProvider');
  }
  return context;
};
