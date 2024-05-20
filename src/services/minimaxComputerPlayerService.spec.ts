import Minimax from "tic-tac-toe-minimax";
import { range } from "lodash";
import MinimaxComputerPlayerService from "./MinimaxComputerPlayerService";
import { Difficulty, Mark } from "../types/game";

describe("MinimaxComputerPlayerService", () => {
  const AIMark = Mark.x;
  const service = new MinimaxComputerPlayerService(
    Difficulty.Easy,
    Mark.o,
    AIMark
  );

  describe("player gives board to AI player to start the game", () => {
    it("should return a makred board with an AI player move", () => {
      const board = range(9);
      expect(service.makeNextMove(board)).toEqual(
        expect.arrayContaining([AIMark])
      );
    });

    // TODO: test AI player response to multiple moves
  });

  describe("when the game is finished", () => {
    it("should return the winner based upon response from GameStep", () => {
      jest.spyOn(Minimax, "GameStep").mockImplementation(() => ({
        winner: "huPlayer",
        board: [],
      }));

      const board = range(9);
      service.makeNextMove(board);
      expect(service.getWinner()).toEqual("huPlayer");
    });
  });
});
