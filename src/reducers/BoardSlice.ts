import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { range } from "lodash";
import { Mark } from "../types/game";
import { HighlightedIndexs, GridIndex, GridData } from "../types/grid";
import { HighlightColors } from "../types/player";
import { RootState } from "../app/store";
import { gridSize } from "../const/gridData";

// https://www.npmjs.com/package/tictactoe-minimax-ai

export interface Board {
  gridData: GridData;
  highlighted: HighlightedIndexs;
  highlightColor: HighlightColors;
}

const initialState: Board = {
  gridData: range(gridSize * gridSize),
  highlighted: [],
  highlightColor: HighlightColors.blue,
};

export const boardSlice = createSlice({
  name: "board",
  initialState: initialState,
  reducers: {
    markSquare: (
      state,
      action: PayloadAction<{
        index: GridIndex;
        mark: Mark;
      }>
    ) => {
      state.gridData[action.payload.index] = action.payload.mark;
    },
    setGridData(state, action: PayloadAction<GridData>) {
      state.gridData = action.payload;
    },
    setHighlight(state, action: PayloadAction<HighlightedIndexs>) {
      state.highlighted = action.payload;
    },
    setHighlightColor(state, action: PayloadAction<HighlightColors>) {
      state.highlightColor = action.payload;
    },
  },
});

export const { markSquare, setGridData, setHighlight, setHighlightColor } =
  boardSlice.actions;

export const getGridData = (state: RootState): GridData => state.board.gridData;
export const getHighlighted = (state: RootState): HighlightedIndexs =>
  state.board.highlighted;
export const getBoardHighlightColor = (state: RootState): HighlightColors =>
  state.board.highlightColor;

export default boardSlice.reducer;
