import { range } from "lodash";
import boardReducer, {
  Board,
  markSquare,
  setHighlight,
  setHighlightColor,
} from "./BoardSlice";
import { gridSize } from "../const/gridData";
import { HighlightColors } from "../types/player";
import { Mark } from "../types/game";

describe("player reducer", () => {
  const initialState: Board = {
    gridData: range(gridSize * gridSize),
    highlighted: [],
    highlightColor: HighlightColors.blue,
  };

  it("should handle initial state", () => {
    expect(boardReducer(undefined, { type: "unknown" })).toEqual(initialState);
  });

  it("should mark square on grid", () => {
    expect(
      boardReducer(initialState, markSquare({ index: 1, mark: Mark.x }))
        .gridData
    ).toEqual([0, Mark.x, 2, 3, 4, 5, 6, 7, 8]);
  });

  it("should set highlight indexes", () => {
    expect(
      boardReducer(initialState, setHighlight([1, 2, 3])).highlighted
    ).toEqual([1, 2, 3]);
  });

  it("should set highlight color", () => {
    expect(
      boardReducer(initialState, setHighlightColor(HighlightColors.red))
        .highlightColor
    ).toEqual(HighlightColors.red);
  });
});
