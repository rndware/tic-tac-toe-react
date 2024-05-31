import React, { useEffect } from "react";
import classNames from "classnames";

import { Mode } from "../types/game";
import { useAppSelector, useAppDispatch } from "../app/hooks";
import { startGame } from "../reducers/GameSlice";
import { getGameMode } from "../reducers/GameSlice";
import BoardContainer from "./BoardContainer";
import GameControlsContainer from "./GameControlsContainer";
import ScoreboardContainer from "./ScoreboardContainer";

import styles from "./GameContainer.module.scss";
import GameOverContainer from "./GameOverContainer";

const GameContainer = () => {
  const dispatch = useAppDispatch();

  const gameMode = useAppSelector(getGameMode);
  const gameOver = gameMode === Mode.Ended;

  // monitor 'dispatch' to avoid empty array warning
  useEffect(() => {
    dispatch(startGame());
  }, [dispatch]);

  return (
    <div className={styles["GameContainer"]}>
      <div
        data-testid="board-container-wrapper"
        className={classNames({
          [styles.BoardContainer__wrapper]: true,
          [styles["BoardContainer__wrapper--blurred"]]: gameOver,
        })}
      >
        <div className={styles["PlayableGameWrapper"]}>
          <BoardContainer />
          <GameControlsContainer />
        </div>
        <div className={styles["GameInfoWrapper"]}>
          <ScoreboardContainer />
        </div>
      </div>
      <GameOverContainer />
    </div>
  );
};

export default GameContainer;
