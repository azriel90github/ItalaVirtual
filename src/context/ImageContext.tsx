import type React from 'react';
import { createContext, useContext, type ReactNode } from 'react';

// Definição da interface ImageContextProps
interface ImageContextProps {
  images: { [key: string]: string }; // Mapeamento de ID para URL da imagem
  getImageByTitle: (title: string) => string; // Função para obter URL da imagem por título
}

// Criação do contexto com um valor inicial indefinido
const ImageContext = createContext<ImageContextProps | undefined>(undefined);

// Componente Provider para o contexto de imagens
export const ImageProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  const images: { [key: string]: string } = {
    "Luxenburgo": '/menu/ice-cream 1.png',
    "Canada": '/menu/ice-cream 1.png',
    "Miami": '/menu/ice-cream 1.png',
    "Dubai": '/menu/ice-cream 1.png',
    "Havai": '/menu/ice-cream 1.png',
    "Rio de Janeiro": '/menu/ice-cream 1.png',
    "Morro": '/menu/ice-cream 1.png',
    "Angola": '/menu/ice-cream 1.png',
    "Florianopólis": '/menu/ice-cream 1.png',
    "Malanje": '/menu/ice-cream 1.png',
    

    // Adicione outras associações título -> imagem conforme necessário
  };

  const getImageByTitle = (title: string): string => {
    return images[title] || '/menu/default.png';
  };

  return (
    <ImageContext.Provider value={{ images, getImageByTitle }}>
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
