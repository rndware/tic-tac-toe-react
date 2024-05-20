import React, { MouseEvent } from "react";
import Button from "@mui/material/Button";
import { I18nCopy } from "../../types/app";

import styles from "./GameControls.module.scss";

interface GameControlProps {
  copy: I18nCopy;
  onUndo: (e: MouseEvent) => void;
  disabled: boolean;
}

const GameControls = (props: GameControlProps) => (
  <div className={styles.GameControls}>
    <Button
      onClick={props.onUndo}
      variant="contained"
      disabled={props.disabled}
    >
      {props.copy.undo}
    </Button>
  </div>
);

export default GameControls;
