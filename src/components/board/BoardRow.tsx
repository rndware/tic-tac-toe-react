import { MouseEvent } from "react";
import { createSlot } from "react-slotify";

import { GridIndex, GridData, GridItem } from "../../types/grid";
import BoardCell, { CellSlot } from "../board-cell/BoardCell";
import { HighlightColors } from "../../types/player";

interface BoardRowProps {
  gridSize: number;
  gridItems: GridData;
  indexRow: GridIndex;
  highlighted?: GridIndex[];
  highlightColor?: HighlightColors;
  onClick: (e: MouseEvent, index: GridIndex) => void;
}

export const BoardRowCellSlot = createSlot<{
  value: GridItem;
  index: GridIndex;
}>();

export const BoardRow = (props: React.PropsWithChildren<BoardRowProps>) => (
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
          >
            {props.children && (
              <CellSlot>
                {(args) => (
                  <BoardRowCellSlot.Renderer
                    index={flatIndex}
                    childs={props.children}
                    value={args.value}
                  />
                )}
              </CellSlot>
            )}
          </BoardCell>
        </td>
      );
    })}
  </tr>
);
