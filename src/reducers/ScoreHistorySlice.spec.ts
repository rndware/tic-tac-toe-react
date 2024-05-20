import { Mark, Winner } from "../types/game";
import scoreHistoryReducer, {
  History,
  getComputerScores,
  getPlayerScores,
  recordScoreHistory,
} from "./ScoreHistorySlice";

describe("score history reducer", () => {
  const moveOneSnapshot = [0, 1, 2, Mark.x, 4, 5, 6, 7];

  const initialState: History = {
    scoreRecord: [],
  };

  it("should handle initial state", () => {
    expect(scoreHistoryReducer(undefined, { type: "unknown" })).toEqual(
      initialState,
    );
  });

  it("should score of game along with player who won", () => {
    expect(
      scoreHistoryReducer(
        initialState,
        recordScoreHistory({
          winner: Winner.aiPlayer,
          boardSnapshot: moveOneSnapshot,
        }),
      ).scoreRecord,
    ).toEqual([
      {
        winner: Winner.aiPlayer,
        boardSnapshot: moveOneSnapshot,
      },
    ]);
  });

  describe("wins draws and losses", () => {
    const newState = {
      scoreRecord: [
        {
          winner: Winner.aiPlayer,
          boardSnapshot: moveOneSnapshot,
        },
        {
          winner: Winner.huPlayer,
          boardSnapshot: moveOneSnapshot,
        },
        {
          winner: Winner.huPlayer,
          boardSnapshot: moveOneSnapshot,
        },
        {
          winner: Winner.draw,
          boardSnapshot: moveOneSnapshot,
        },
      ],
    };

    it("should return how many a player has had", () => {
      expect(getPlayerScores({ scoreHistory: newState })).toEqual({
        wins: 2,
        losses: 1,
        draws: 1,
      });
    });

    it("should return how many a computer has had", () => {
      expect(getComputerScores({ scoreHistory: newState })).toEqual({
        wins: 1,
        losses: 2,
        draws: 1,
      });
    });
  });
});
