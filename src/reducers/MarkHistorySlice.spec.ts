import { HighlightColors, PlayerType } from "../types/player";
import { Mark } from "../types/game";
import markHistoryReducer, {
  History,
  recordMarkHistory,
  revertToPreviousInteraction,
} from "./MarkHistorySlice";

describe("mark history reducer", () => {
  const computerPlayer = {
    name: "Mr. Computer",
    mark: Mark.x,
    color: HighlightColors.red,
    playerType: PlayerType.computer,
  };

  const humanPlayer = {
    name: "Mr. Human",
    mark: Mark.o,
    color: HighlightColors.blue,
    playerType: PlayerType.human,
  };

  const moveOneSnapshot = [0, 1, 2, Mark.x, 4, 5, 6, 7];
  const moveTwoSnapshot = [0, 1, Mark.o, Mark.x, 4, 5, 6, 7];

  const initialState: History = {
    marksRecord: [],
  };

  it("should handle initial state", () => {
    expect(markHistoryReducer(undefined, { type: "unknown" })).toEqual(
      initialState,
    );
  });

  describe("record mark history", () => {
    it("should record mark along with player who made it", () => {
      expect(
        markHistoryReducer(
          initialState,
          recordMarkHistory({
            player: computerPlayer,
            boardSnapshot: moveOneSnapshot,
          }),
        ).marksRecord,
      ).toEqual([
        {
          madeBy: computerPlayer,
          boardSnapshot: moveOneSnapshot,
        },
      ]);
    });

    it("should record mark without player info", () => {
      expect(
        markHistoryReducer(
          initialState,
          recordMarkHistory({
            player: undefined,
            boardSnapshot: moveOneSnapshot,
          }),
        ).marksRecord,
      ).toEqual([
        {
          boardSnapshot: moveOneSnapshot,
        },
      ]);
    });
  });

  it("should revert last interaction consisting of a humand and computer's last made marks", () => {
    const computerPlayer = {
      name: "Mr. Computer",
      mark: Mark.x,
      color: HighlightColors.red,
      playerType: PlayerType.computer,
    };

    const newState = {
      marksRecord: [
        {
          madeBy: computerPlayer,
          boardSnapshot: moveOneSnapshot,
        },
        {
          madeBy: humanPlayer,
          boardSnapshot: moveTwoSnapshot,
        },
      ],
    };

    expect(markHistoryReducer(newState, revertToPreviousInteraction())).toEqual(
      {
        marksRecord: [],
      },
    );
  });
});
