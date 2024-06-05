import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import CircleOutlinedIcon from "@mui/icons-material/CircleOutlined";
import { Mark } from "../../types/game";
import { GridItem } from "../../types/grid";

import styles from "./MarkIcon.module.scss";

interface MarkProps {
  value: GridItem;
}

const renderMaterialIcon = (props: MarkProps) => {
  switch (props.value) {
    case Mark.o:
      return (
        <CircleOutlinedIcon
          aria-label="Nought symbol"
          data-testid="mark-icon-nought"
          className={styles.MarkIcon__nought}
        />
      );
    case Mark.x:
      return (
        <CloseIcon
          aria-label="Cross symbol"
          data-testid="mark-icon-cross"
          className={styles.MarkIcon__cross}
        />
      );
    default:
      return (
        <div data-testid="mark-icon-empty" className={styles.MarkIcon__empty} />
      );
  }
};

const MarkIcon = (props: MarkProps) => (
  <div className={styles.MarkIcon}>{renderMaterialIcon(props)}</div>
);

export default MarkIcon;
