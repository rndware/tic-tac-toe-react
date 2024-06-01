import { useEffect } from "react";
import { useTranslation } from "react-i18next";
import { SelectChangeEvent } from "@mui/material/Select";

import { isLangEnum } from "../types/game";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { getLanguage, setLanguage } from "../reducers/SettingsSlice";

// Custom hook for language management
export const useLanguageSettings = () => {
  const dispatch = useAppDispatch();
  const { i18n } = useTranslation();
  const language = useAppSelector(getLanguage);

  useEffect(() => {
    document.getElementsByTagName("html")[0].setAttribute("lang", language);
  }, [language]);

  const handleLangChange = (e: SelectChangeEvent<string>) => {
    const lang = e.target.value;
    if (isLangEnum(lang)) {
      dispatch(setLanguage(lang));
      i18n.changeLanguage(lang);
    }
  };

  return {
    language,
    handleLangChange,
  };
};
