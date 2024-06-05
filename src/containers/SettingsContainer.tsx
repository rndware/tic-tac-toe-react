import React, { useMemo, MouseEvent } from "react";
import { SelectChangeEvent } from "@mui/material/Select";
import { useTranslation } from "react-i18next";

import { sleep } from "../utils";
import { Difficulty, Lang, isDifficultyEnum } from "../types/game";
import { I18nCopy } from "../types/app";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import { setDifficulty, getDifficulty } from "../reducers/SettingsSlice";
import { resetScores } from "../reducers/ScoreHistorySlice";
import { useLanguageSettings } from "../hooks/useLanguageSettings";
import SettingsForm from "../components/settings-form";
import { interactionDelay } from "../const/config";

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

  const actionButtons = useMemo(
    () => [
      {
        key: "resetScores",
        copy: settingsCopy.resetScores,
        onClick: async (_: MouseEvent) => {
          dispatch(resetScores());
          return sleep(interactionDelay);
        },
      },
    ],
    [settingsCopy.resetScores, dispatch],
  );

  return (
    <SettingsForm
      selectFormControls={selectFormControls}
      actionButtons={actionButtons}
      copy={settingsCopy}
    />
  );
};

export default SettingsContainer;
