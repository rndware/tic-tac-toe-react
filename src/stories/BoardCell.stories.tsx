import React from "react";
import BoardCell from "../components/board-cell";
import { Mark } from "../types/game";
import { HighlightColors } from "../types/player";

import "./assets/story.css";

export default {
  title: "Core/BoardCell",
  component: BoardCell,
};

export const Default = {
  args: {
    id: 1,
  },
};

export const Cross = {
  args: {
    id: 1,
    value: Mark.x,
  },
};

export const Nought = {
  args: {
    id: 1,
    value: Mark.o,
  },
};

export const Highlighted = {
  args: {
    id: 1,
    value: Mark.o,
    isHighlighted: true,
    highlightColor: HighlightColors.blue,
  },
};
