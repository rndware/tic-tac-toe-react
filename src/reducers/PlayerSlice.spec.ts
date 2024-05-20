import playerReducer, {
  Players,
  createHumanPlayer,
  generateComputerPlayer,
} from "./PlayersSlice";
import { Mark } from "../types/game";
import { Player, HighlightColors, PlayerType } from "../types/player";

describe("player reducer", () => {
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

  it("should handle initial state", () => {
    expect(playerReducer(undefined, { type: "unknown" })).toEqual(initialState);
  });

  it("should handle creating a human player", () => {
    const player: Player = {
      name: "bar",
      age: 30,
      mark: Mark.x,
      color: HighlightColors.red,
    };

    expect(
      playerReducer(initialState, createHumanPlayer({ player })).human
    ).toEqual({
      ...player,
      playerType: PlayerType.human,
    });
  });

  it("should generate a computer player", () => {
    expect(
      playerReducer(initialState, generateComputerPlayer()).computer
    ).toEqual({
      name: "Mr. Computer",
      mark: Mark.x,
      color: HighlightColors.red,
      playerType: PlayerType.computer,
    });
  });
});
