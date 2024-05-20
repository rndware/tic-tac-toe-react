import React, { MouseEvent } from "react";
import classNames from "classnames";
import { HighlightColors } from "../../types/player";
import { GridIndex, GridData, GridItem } from "../../types/grid";
import { chunkArray } from "../../utils";
import { gridSize } from "../../const/gridData";
import BoardCell from "../board-cell";

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

interface BoardRowProps {
  gridSize: number;
  gridItems: GridData;
  indexRow: GridIndex;
  highlighted?: GridIndex[];
  highlightColor?: HighlightColors;
  onClick: (e: MouseEvent, index: GridIndex) => void;
}

const BoardRow = (props: BoardRowProps) => (
  <tr className="BoardRow">
    {props.gridItems.map((gridItem: GridItem, indexColumn: GridIndex) => {
      const flatIndex = props.indexRow * props.gridSize + indexColumn;
      return (
        <td key={`board-row-cell-${flatIndex}`} className="BoardRow__cell">
          <BoardCell
            id={flatIndex}
            value={gridItem}
            isHighlighted={props.highlighted?.includes(flatIndex)}
            highlightColor={props.highlightColor}
            onClick={(e: MouseEvent) => props.onClick(e, flatIndex)}
          />
        </td>
      );
    })}
  </tr>
);

const Board = (props: BoardProps) => {
  const size = props.gridSize || gridSize;

  const chunckedArray: GridData[] = chunkArray(props.gridData, size);
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
          {chunckedArray.map((gridItems: GridItem[], indexRow: GridIndex) => (
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
            />
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default Board;
