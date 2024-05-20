import { Mark } from "./game";

export type GridIndex = number;

export type GridItem = Mark | GridIndex;

export type GridData = GridItem[];

export type HighlightedIndexs = GridIndex[];

export function isGridIndex(gridItem: GridItem): gridItem is GridIndex {
  return typeof gridItem === "number";
}
