import { useTranslation } from "react-i18next";
import { useNavigate } from "react-router-dom";
import { startGame, getWinningPlayer } from "../reducers/GameSlice";
import { useAppSelector, useAppDispatch } from "../app/hooks";
import GameOverBanner from "../components/game-over-banner/GameOverBanner";
import { getGameMode } from "../reducers/GameSlice";

import { Mode } from "../types/game";

const GameOverContainer = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const winningPlayer = useAppSelector(getWinningPlayer);
  const gameMode = useAppSelector(getGameMode);
  const gameOver = gameMode === Mode.Ended;

  return (
    <>
      {gameOver && (
        <GameOverBanner
          copy={t("gamePage", {
            name: winningPlayer?.name,
            returnObjects: true,
          })}
          gameMode={gameMode}
          winningPlayer={winningPlayer}
          onRestart={() => dispatch(startGame())}
          onQuit={() => navigate("/")}
        />
      )}
    </>
  );
};

export default GameOverContainer;
