import React, { MouseEvent, useMemo } from "react";
import classNames from "classnames";
import { createSlot } from "react-slotify";

import { HighlightColors } from "../../types/player";
import { GridIndex, GridData, GridItem } from "../../types/grid";
import { chunkArray } from "../../utils";
import { gridSize } from "../../const/gridData";
import { BoardRow, BoardRowCellSlot } from "./BoardRow";

import styles from "./Board.module.scss";

interface BoardProps {
  layout?: "grid" | "lined";
  gridSize?: number;
  disabled?: boolean;
  gridData: GridData;
  highlighted?: GridIndex[];
  highlightColor?: HighlightColors;
  onClick: (e: MouseEvent, index: GridIndex) => void;
}

export const BoardCellSlot = createSlot<{
  value: GridItem;
  index: GridIndex;
}>();

const Board = (props: React.PropsWithChildren<BoardProps>) => {
  const size = props.gridSize || gridSize;

  const chunkedArray = useMemo(
    () => chunkArray(props.gridData, size),
    [props.gridData, size],
  );

  return (
    <div className="Board">
      <table
        data-testid="board-table"
        className={classNames({
          [styles.Board__table]: true,
          [styles["Board__table--disabled"]]: props.disabled,
          [styles["Board__table--grid"]]: props.layout === "grid",
          [styles["Board__table--lined"]]: !(props.layout === "grid"),
        })}
      >
        <tbody>
          {chunkedArray.map((gridItems: GridItem[], indexRow: GridIndex) => (
            <BoardRow
              key={`row-item-${indexRow}`}
              gridSize={size}
              gridItems={gridItems}
              indexRow={indexRow}
              highlighted={props.highlighted}
              highlightColor={props.highlightColor}
              onClick={(e: MouseEvent, index: GridIndex) =>
                !props.disabled && props.onClick(e, index)
              }
            >
              {props.children && (
                <BoardRowCellSlot>
                  {(args) => (
                    <BoardCellSlot.Renderer
                      index={args.index}
                      childs={props.children}
                      value={args.value}
                    />
                  )}
                </BoardRowCellSlot>
              )}
            </BoardRow>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Board;
