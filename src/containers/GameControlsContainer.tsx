import React from "react";
import { useAppDispatch, useAppSelector } from "../app/hooks";
import GameControls from "../components/game-controls";
import { getGameMode } from "../reducers/GameSlice";
import { undoInteraction } from "../reducers/GameSlice";
import { useTranslation } from "react-i18next";
import { Mode } from "../types/game";

const GameControlsContainer = () => {
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  return (
    <GameControls
      copy={t("gamePage", { returnObjects: true })}
      onUndo={(_) => dispatch(undoInteraction())}
      disabled={useAppSelector(getGameMode) === Mode.Ended}
    />
  );
};

export default GameControlsContainer;
