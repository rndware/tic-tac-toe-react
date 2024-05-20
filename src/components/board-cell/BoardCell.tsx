import React, { MouseEvent } from "react";
import classNames from "classnames";
import { GridIndex, GridItem } from "../../types/grid";
import { HighlightColors } from "../../types/player";
import MarkIcon from "../mark-icon";

import styles from "./BoardCell.module.scss";

interface BoardCellProps {
  id?: GridIndex;
  value: GridItem;
  onClick: (e: MouseEvent) => void;
  isHighlighted?: boolean;
  highlightColor?: HighlightColors | null;
}

const BoardCell = (props: BoardCellProps) => {
  const fullId = props.id !== undefined ? `board-cell-${props.id}` : undefined;
  return (
    <div
      id={fullId}
      className={classNames({
        [styles.BoardCell]: true,
        [styles[`BoardCell--highlighted-${props.highlightColor}`]]:
          props.isHighlighted,
      })}
      data-testid={fullId}
      onClick={props.onClick}
    >
      <MarkIcon value={props.value} />
    </div>
  );
};

export default BoardCell;
