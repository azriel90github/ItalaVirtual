import type React from 'react';
import { createContext, useContext, type ReactNode } from 'react';

interface ImageContextProps {
  images: { [key: string]: string }; // As chaves do objeto `images` são strings
  getImageById: (id: string) => string | undefined; // O argumento da função deve ser uma string
}

const ImageContext = createContext<ImageContextProps | undefined>(undefined);

export const ImageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const images: { [key: string]: string } = {
    gt1g1yrev4exfp78pevnvcua: '/menu/image1.png',
    gy44hi7w8ie5jkhufpysg4tq: '/menu/image2.png',
    mqkxrqikkksmwycytk8q1h7a: '/menu/image3.png',
  };

  const getImageById = (id: string) => images[id]; // Agora usamos `id` como string

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

