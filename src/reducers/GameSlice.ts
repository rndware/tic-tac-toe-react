import { createSlice, PayloadAction, createAsyncThunk } from "@reduxjs/toolkit";
import { Mode, Winner } from "../types/game";
import { isGridIndex, GridIndex, GridData } from "../types/grid";
import GameService from "../services/GameService";
import { AppThunk, RootState } from "../app/store";
import { appReset } from "../actions";
import {
  getGridData,
  markSquare,
  setGridData,
  setHighlight,
  setHighlightColor,
} from "./BoardSlice";
import { Player } from "../types/player";
import {
  getLastBoardSnapshot,
  getMarksRecordCount,
  recordMarkHistory,
  revertToPreviousInteraction,
} from "./MarkHistorySlice";
import { recordScoreHistory } from "./ScoreHistorySlice";
import { getHumanPlayer, getComputerPlayer } from "./PlayersSlice";
import { getDifficulty } from "./SettingsSlice";

export interface Game {
  mode: Mode;
  winner: Winner | null;
  winningPlayer: Player | null;
  playingMove: boolean;
}

const initialState: Game = {
  mode: Mode.Idle,
  winner: null,
  winningPlayer: null,
  playingMove: false,
};

export const gameSlice = createSlice({
  name: "game",
  initialState,
  reducers: {
    start: (state) => {
      state.mode = Mode.Playing;
    },
    end: (state) => {
      state.mode = Mode.Ended;
    },
    setIsPlayingMove(state, action: PayloadAction<boolean>) {
      state.playingMove = action.payload;
    },
    setWinner: (state, action: PayloadAction<Winner>) => {
      state.winner = action.payload;
    },
    setWinningPlayer: (state, action: PayloadAction<Player>) => {
      state.winningPlayer = action.payload;
    },
  },
});

export const { start, end, setWinner, setWinningPlayer, setIsPlayingMove } =
  gameSlice.actions;

// TODO: make not global
let gameService: GameService;

export const startGame = (): AppThunk => (dispatch, getState) => {
  dispatch(
    appReset({ excludeReducers: ["players", "settings", "scoreHistory"] })
  );
  dispatch(start());

  const state = getState();
  const humanPlayer = getHumanPlayer(state);
  const computerPlayer = getComputerPlayer(state);
  const difficulty = getDifficulty(state);

  // record the blank board that we can revert to later
  dispatch(
    recordMarkHistory({
      boardSnapshot: getGridData(state),
    })
  );

  gameService = new GameService(difficulty, humanPlayer, computerPlayer);
};

export const undoInteraction = (): AppThunk => (dispatch, getState) => {
  // keep blank board entry in move history
  if (getMarksRecordCount(getState()) > 1) {
    dispatch(revertToPreviousInteraction());
    dispatch(setGridData(getLastBoardSnapshot(getState())));
  }
};

function freeToMarkAtIndex(markedGrid: GridData, index: GridIndex): boolean {
  return isGridIndex(markedGrid[index]);
}

/**
 * Checks if game has been won, logs the winner and finishes the game
 * @param markedGrid
 * @returns
 */
const handleIfGameWon =
  (markedGrid: GridData): AppThunk =>
  (dispatch) => {
    const winner = gameService.getWinner();

    if (winner) {
      dispatch(setWinner(winner));
      if (winner !== Winner.draw) {
        const winningPlayer = gameService.getWinningPlayer();

        dispatch(setWinningPlayer(winningPlayer!));
        dispatch(setHighlightColor(winningPlayer?.color!));
        dispatch(setHighlight(gameService.getWinningLine(markedGrid)));
      }

      dispatch(
        recordScoreHistory({
          winner,
          boardSnapshot: markedGrid,
        })
      );

      dispatch(end());
    }
  };

/**
 * Records player's mark on grid and logs the move
 * @param index
 * @param humanPlayer
 * @returns
 */
const handlePlayerMove =
  (index: GridIndex, humanPlayer: Player): AppThunk =>
  (dispatch, getState) => {
    dispatch(markSquare({ index, mark: humanPlayer.mark }));

    const updatedMarkedGrid = getGridData(getState());

    dispatch(
      recordMarkHistory({
        player: humanPlayer,
        boardSnapshot: updatedMarkedGrid,
      })
    );
  };

/**
 * Records computer's mark on grid and logs the move
 * @param index
 * @param computerPlayer
 * @returns
 */
const handleComputerMove =
  (markedGrid: GridData, computerPlayer: Player): AppThunk =>
  async (dispatch) => {
    const updatedMarkedGrid = await gameService.doComputerMove(markedGrid);

    dispatch(setGridData(updatedMarkedGrid));

    dispatch(
      recordMarkHistory({
        player: computerPlayer,
        boardSnapshot: updatedMarkedGrid,
      })
    );
  };

export const playMove = createAsyncThunk<void, GridIndex, { state: RootState }>(
  "game/playMove",
  async (index: GridIndex, { dispatch, getState }) => {
    const firstState = getState();

    if (
      !freeToMarkAtIndex(getGridData(firstState), index) ||
      getGameMode(firstState) !== Mode.Playing ||
      getPlayingMove(firstState)
    ) {
      return;
    }

    dispatch(setIsPlayingMove(true));
    dispatch(handlePlayerMove(index, getHumanPlayer(firstState)));

    const updatedMarkedGrid = getGridData(getState());

    await dispatch(
      handleComputerMove(updatedMarkedGrid, getComputerPlayer(firstState))
    );

    const finalMarkedGrid = getGridData(getState());
    dispatch(handleIfGameWon(finalMarkedGrid));
    dispatch(setIsPlayingMove(false));
  }
);

export const getGameMode = (state: RootState): Mode => state.game.mode;
export const getPlayingMove = (state: RootState): Mode =>
  state.game.playingMove;
export const getWinningPlayer = (state: RootState): Player =>
  state.game.winningPlayer;

export default gameSlice.reducer;
