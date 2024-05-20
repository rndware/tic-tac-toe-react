import React from "react";
import CloseIcon from "@mui/icons-material/Close";
import CircleOutlinedIcon from "@mui/icons-material/CircleOutlined";
import { Mark } from "../../types/game";
import { GridItem } from "../../types/grid";

import styles from "./MarkIcon.module.scss";

interface MarkProps {
  value: GridItem;
}

const getMaterialIcon = (props: MarkProps) => {
  if (props.value === Mark.o) {
    return (
      <CircleOutlinedIcon
        aria-label="Nought symbol"
        aria-hidden={false}
        data-testid="mark-icon-nought"
        className="MarkIcon__nought"
      />
    );
  } else if (props.value === Mark.x) {
    return (
      <CloseIcon
        aria-label="Cross symbol"
        aria-hidden={false}
        data-testid="mark-icon-cross"
        className="MarkIcon__cross"
      />
    );
  } else {
    return <div data-testid="mark-icon-empty" className="MarkIcon__empty" />;
  }
};

const MarkIcon = (props: MarkProps) => (
  <div className={styles.MarkIcon}>{getMaterialIcon(props)}</div>
);

export default MarkIcon;
