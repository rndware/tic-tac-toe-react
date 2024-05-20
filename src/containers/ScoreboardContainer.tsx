import React from "react";
import { useTranslation } from "react-i18next";
import Scoreboard from "../components/scoreboard";
import { useAppSelector } from "../app/hooks";
import {
  getComputerScores,
  getPlayerScores,
} from "../reducers/ScoreHistorySlice";

const ScoreboardContainer = () => {
  const playerScores = useAppSelector(getPlayerScores);
  const playerWins = useAppSelector(getComputerScores);
  const { t } = useTranslation();

  return (
    <Scoreboard
      copy={t("gamePage", { returnObjects: true })}
      human={playerScores}
      computer={playerWins}
    />
  );
};

export default ScoreboardContainer;
