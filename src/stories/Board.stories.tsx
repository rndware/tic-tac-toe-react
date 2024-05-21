import React from "react";
import { range } from "lodash";
import Board from "../components/board";
import { gridSize } from "../const/gridData";
import { Mark } from "../types/game";
import { GridItem } from "../types/grid";
import { diagnalIndexes } from "../const/gridData";
import { HighlightColors } from "../types/player";

import "./assets/story.css";

export default {
  title: "Core/Board",
  component: Board,
};

export const Blank = {
  args: {
    gridData: range(gridSize * gridSize),
  },
};

const largeGridSize = 4;

export const BlankGridLarge = {
  args: {
    layout: "grid",
    gridSize: largeGridSize,
    gridData: range(largeGridSize * largeGridSize),
  },
};

let played: GridItem[] = range(gridSize * gridSize);
played[0] = Mark.x;
played[1] = Mark.o;
played[2] = Mark.x;

export const Played = {
  args: {
    gridData: played,
  },
};

let winningLine: GridItem[] = range(gridSize * gridSize);
const line = diagnalIndexes[0];
for (let i = 0; i < line.length; i++) {
  winningLine[line[i]] = Mark.x;
}

export const WinningLine = {
  args: {
    gridData: winningLine,
    highlightColor: HighlightColors.red,
    highlighted: line,
  },
};
