import { useEffect } from "react";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import { useTranslation } from "react-i18next";
import { getLanguage } from "../reducers/SettingsSlice";
import type { RootState, AppDispatch } from "./store";

// grab the default language in the store (which is preserved via redux-persist)
export const useStoredLanguage = () => {
  const language = useAppSelector(getLanguage);
  const { i18n } = useTranslation();

  useEffect(() => {
    i18n.changeLanguage(language);
  }, [language, i18n]);
};

// Use throughout your app instead of plain `useDispatch` and `useSelector`
export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;
