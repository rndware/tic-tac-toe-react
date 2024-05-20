import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import { defaultLang } from "../const/i18n";

import en from "../locales/en.json";
import de from "../locales/de.json";

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources: {
      en: {
        translation: en,
      },
      de: {
        translation: de,
      },
    },
    lng: defaultLang,
    fallbackLng: defaultLang,

    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
