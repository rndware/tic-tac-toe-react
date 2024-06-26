import React, { MouseEvent } from "react";
import classNames from "classnames";
import { GridIndex, GridItem } from "../../types/grid";
import { HighlightColors } from "../../types/player";
import MarkIcon from "../mark-icon";
import { createSlot } from "react-slotify";

import styles from "./BoardCell.module.scss";

interface BoardCellProps {
  id?: GridIndex;
  value: GridItem;
  onClick: (e: MouseEvent) => void;
  isHighlighted?: boolean;
  highlightColor?: HighlightColors | null;
}

export const CellSlot = createSlot<{
  value: GridItem;
  id: GridIndex | undefined;
}>();

const BoardCell = (props: React.PropsWithChildren<BoardCellProps>) => {
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
      {(props.children && (
        <CellSlot.Renderer
          childs={props.children}
          value={props.value}
          id={props.id}
        />
      )) ?? <MarkIcon value={props.value} />}
    </div>
  );
};

export default BoardCell;
