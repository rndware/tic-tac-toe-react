import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import cloneDeep from "lodash/cloneDeep";
import { RootState } from "../app/store";
import { GridData } from "../types/grid";
import { Winner, GameScores } from "../types/game";

interface ScoreRecord {
  winner: Winner;
  boardSnapshot: GridData;
}

export interface History {
  scoreRecord: ScoreRecord[];
}

const initialState: History = {
  scoreRecord: [],
};

export const scoreHistorySlice = createSlice({
  name: "scoreHistory",
  initialState,
  reducers: {
    recordScoreHistory: (
      state,
      action: PayloadAction<{
        winner: Winner;
        boardSnapshot: GridData;
      }>
    ) => {
      const record: ScoreRecord = {
        boardSnapshot: cloneDeep(action.payload.boardSnapshot),
        winner: action.payload.winner,
      };

      state.scoreRecord.push(record);
    },
    revertToPreviousScore(state) {
      state.scoreRecord.splice(-2);
    },
  },
});

export const { revertToPreviousScore, recordScoreHistory } =
  scoreHistorySlice.actions;

export const getPlayerScores = (state: RootState): GameScores => {
  const wins = state.scoreHistory.scoreRecord.filter(
    (record: ScoreRecord) => record.winner === Winner.huPlayer
  ).length;
  const losses = state.scoreHistory.scoreRecord.filter(
    (record: ScoreRecord) => record.winner === Winner.aiPlayer
  ).length;
  const draws = state.scoreHistory.scoreRecord.filter(
    (record: ScoreRecord) => record.winner === Winner.draw
  ).length;

  return {
    wins,
    losses,
    draws,
  };
};

export const getComputerScores = (state: RootState): GameScores => {
  const wins = state.scoreHistory.scoreRecord.filter(
    (record: ScoreRecord) => record.winner === Winner.aiPlayer
  ).length;
  const losses = state.scoreHistory.scoreRecord.filter(
    (record: ScoreRecord) => record.winner === Winner.huPlayer
  ).length;
  const draws = state.scoreHistory.scoreRecord.filter(
    (record: ScoreRecord) => record.winner === Winner.draw
  ).length;

  return {
    wins,
    losses,
    draws,
  };
};

export default scoreHistorySlice.reducer;
