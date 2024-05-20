import React, { useEffect } from "react";
import { SelectChangeEvent } from "@mui/material/Select";
import { useTranslation } from "react-i18next";

import { Difficulty, Lang, isDifficultyEnum, isLangEnum } from "../types/game";
import { I18nCopy } from "../types/app";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import {
  setDifficulty,
  getDifficulty,
  getLanguage,
  setLanguage,
} from "../reducers/SettingsSlice";
import SettingsForm, { FormControlData } from "../components/settings-form";

const SettingsContainer = () => {
  const dispatch = useAppDispatch();
  const { t, i18n } = useTranslation();
  const language = useAppSelector(getLanguage);

  const handleLangChange = (e: SelectChangeEvent<string>) => {
    const lang = e.target.value;
    isLangEnum(lang) && dispatch(setLanguage(lang));
    i18n.changeLanguage(lang);
  };

  useEffect(() => {
    document.getElementsByTagName("html")[0].setAttribute("lang", language);
  }, [language]);

  const settingsCopy: I18nCopy = t("settingsPage", { returnObjects: true });

  const formControls: FormControlData[] = [
    {
      key: "difficulty",
      copy: settingsCopy.difficulty,
      value: useAppSelector(getDifficulty),
      enum: Difficulty,
      onChange: (e: SelectChangeEvent<string>) => {
        const difficulty = e.target.value;
        isDifficultyEnum(difficulty) && dispatch(setDifficulty(difficulty));
      },
      options: settingsCopy.difficulty.options,
    },
    {
      key: "lang",
      copy: settingsCopy.lang,
      value: language,
      enum: Lang,
      onChange: handleLangChange,
      options: settingsCopy.lang.options,
    },
  ];

  return <SettingsForm formControls={formControls} copy={settingsCopy} />;
};

export default SettingsContainer;
