import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

import en from './i18n/en.json';
import pt from './i18n/pt.json';
import fr from './i18n/fr.json';
import zh from './i18n/zh.json';
import ru from './i18n/ru.json';
import kmb from './i18n/kmb.json'; // Import Kimbundu translations
import umb from './i18n/umb.json'; // Import Umbundu translations

i18n
  .use(initReactI18next)
  .init({
    resources: {
      en: { translation: en },
      pt: { translation: pt },
      fr: { translation: fr },
      zh: { translation: zh },
      ru: { translation: ru },
      kmb: { translation: kmb }, // Add Kimbundu
      umb: { translation: umb }, // Add Umbundu
    },
    lng: 'pt', // Idioma inicial
    fallbackLng: 'pt',
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
