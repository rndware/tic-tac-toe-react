import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../app/store";
import { Mark } from "../types/game";
import { HighlightColors, Player, PlayerType } from "../types/player";

// https://www.npmjs.com/package/tictactoe-minimax-ai

export interface Players {
  human: Player | null;
  computer: Player | null;
}

const initialState: Players = {
  human: {
    name: "Mr. Human",
    age: 20,
    mark: Mark.o,
    color: HighlightColors.blue,
    playerType: PlayerType.human,
  },
  computer: {
    name: "Mr. Computer",
    mark: Mark.x,
    color: HighlightColors.red,
    playerType: PlayerType.computer,
  },
};

function getOtherMark(mark?: Mark): Mark {
  if (!mark) {
    return Mark.x;
  } else if (mark === Mark.o) {
    return Mark.x;
  } else {
    return Mark.o;
  }
}

export const playersSlice = createSlice({
  name: "players",
  initialState,
  reducers: {
    createHumanPlayer: (
      state,
      action: PayloadAction<{
        player: Player;
      }>
    ) => {
      state.human = {
        ...action.payload.player,
        playerType: PlayerType.human,
      };
    },
    generateComputerPlayer: (state) => {
      state.computer = {
        name: "Mr. Computer",
        mark: getOtherMark(state.human?.mark),
        color: HighlightColors.red,
        playerType: PlayerType.computer,
      };
    },
  },
});

export const { createHumanPlayer, generateComputerPlayer } =
  playersSlice.actions;

export const getHumanPlayerMark = (state: RootState): Mark =>
  state.players.human?.mark!;

export const getHumanPlayer = (state: RootState): Player =>
  state.players.human!;

export const getComputerPlayer = (state: RootState): Player =>
  state.players.computer!;

export default playersSlice.reducer;
