import React, { useMemo } from "react";
import { SelectChangeEvent } from "@mui/material/Select";
import { useTranslation } from "react-i18next";

import { Difficulty, Lang, isDifficultyEnum } from "../types/game";
import { I18nCopy } from "../types/app";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { setDifficulty, getDifficulty } from "../reducers/SettingsSlice";
import { useLanguageSettings } from "../hooks/useLanguageSettings";
import SettingsForm from "../components/settings-form";

const SettingsContainer = () => {
  const { language, handleLangChange } = useLanguageSettings();
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const difficulty = useAppSelector(getDifficulty);

  const settingsCopy: I18nCopy = t("settingsPage", { returnObjects: true });

  const selectFormControls = useMemo(
    () => [
      {
        key: "difficulty",
        copy: settingsCopy.difficulty,
        value: difficulty,
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
    ],
    [difficulty, language, handleLangChange, settingsCopy, dispatch],
  );

  return (
    <SettingsForm selectFormControls={selectFormControls} copy={settingsCopy} />
  );
};

export default SettingsContainer;
