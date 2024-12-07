import type React from 'react';
import { createContext, useContext, type ReactNode } from 'react'

interface ImageContextProps {
  images: { [key: number]: string }; // Mapeamento de ID para URL da imagem
  getImageById: (id: number) => string | undefined;
}

const ImageContext = createContext<ImageContextProps | undefined>(undefined);

export const ImageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const images = {
    gt1g1yrev4exfp78pevnvcua: '/menu/ice-cream 1.png', // Exemplo de mapeamento de imagem com ID
    gy44hi7w8ie5jkhufpysg4tq: '/menu/ice-cream 2.png', // Outro mapeamento de imagem
    mqkxrqikkksmwycytk8q1h7a: '/menu/ice-cream 3.png', // E assim por diante
    // Adicione mais IDs e URLs de imagens conforme necessário
  };

  const getImageById = (id: number) => images[id];

  return (
    <ImageContext.Provider value={{ images, getImageById }}>
      {children}
    </ImageContext.Provider>
  );
};

export const useImage = (): ImageContextProps => {
  const context = useContext(ImageContext);
  if (!context) {
    throw new Error('useImage must be used within an ImageProvider');
  }
  return context;
};
