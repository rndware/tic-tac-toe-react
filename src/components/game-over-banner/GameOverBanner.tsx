import React from "react";
import classNames from "classnames";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import { Mode } from "../../types/game";
import { I18nCopy } from "../../types/app";
import { Player } from "../../types/player";

import styles from "./GameOverBanner.module.scss";

interface PlayerFormProps {
  copy: I18nCopy;
  gameMode: Mode;
  winningPlayer: Player | null;
  onRestart: () => void;
  onQuit: () => void;
}

const GameOverBanner = (props: PlayerFormProps) => (
  <div
    data-testid="game-over"
    className={classNames({
      [styles.GameOverBanner]: true,
      [styles["GameOverBanner--fadeIn"]]: props.gameMode === Mode.Ended,
    })}
  >
    <Typography variant="h3" component="h1">
      {props.winningPlayer ? props.copy.winner : props.copy.draw}
    </Typography>
    <div className={styles.GameOverBanner__buttonContainer}>
      <Button onClick={props.onRestart} variant="contained">
        {props.copy.restart}
      </Button>
      <Button onClick={props.onQuit} color="secondary">
        {props.copy.quit}
      </Button>
    </div>
  </div>
);

export default GameOverBanner;
