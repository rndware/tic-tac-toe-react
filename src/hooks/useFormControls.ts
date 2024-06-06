import { SelectChangeEvent } from "@mui/material";
import { useTranslation } from "react-i18next";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { getDifficulty, setDifficulty } from "../reducers/SettingsSlice";
import { Difficulty, Lang, isDifficultyEnum } from "../types/game";
import { I18nCopy } from "../types/app";
import { interactionDelay } from "../const/config";
import { resetScores } from "../reducers/ScoreHistorySlice";
import { sleep } from "../utils";
import { useLanguageSettings } from "./useLanguageSettings";

export const useFormControls = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();
  const difficulty = useAppSelector(getDifficulty);
  const { language, handleLangChange } = useLanguageSettings();

  const settingsCopy: I18nCopy = t("settingsPage", { returnObjects: true });

  const selectFormControls = [
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
  ];

  const actionButtons = [
    {
      key: "resetScores",
      copy: settingsCopy.resetScores,
      onClick: async () => {
        dispatch(resetScores());
        return sleep(interactionDelay);
      },
    },
  ];

  return { selectFormControls, actionButtons, settingsCopy };
};
