import { range } from "lodash";
import { Difficulty, Mark, Winner } from "../types/game";
import { GridData } from "../types/grid";
import { HighlightColors, Player } from "../types/player";
import MinimaxComputerPlayerService from "./MinimaxComputerPlayerService";
import GameService from "./GameService";

describe("GameService", () => {
  const huPlayer: Player = {
    name: "foo",
    color: HighlightColors.red,
    mark: Mark.x,
  };

  const aiPlayer: Player = {
    name: "bar",
    color: HighlightColors.blue,
    mark: Mark.o,
  };

  const service = new GameService(Difficulty.Easy, huPlayer, aiPlayer, {
    thinkDelay: 0,
  });

  describe("AI player makes a move", () => {
    it("should call MinimaxComputerPlayerService to get the result", async () => {
      const spy = jest.spyOn(
        MinimaxComputerPlayerService.prototype,
        "makeNextMove",
      );
      const gridData = range(9);
      await service.doComputerMove(gridData);
      expect(spy).toHaveBeenCalledWith(gridData);
      spy.mockClear();
    });
  });

  describe("game is finished and there is a winner", () => {
    let spy: any;

    beforeEach(() => {
      spy = jest
        .spyOn(MinimaxComputerPlayerService.prototype, "getWinner")
        .mockImplementation(() => {
          return Winner.aiPlayer;
        });
    });

    afterEach(() => {
      spy.mockReset();
    });

    it("should return winner based upon response from GameStep", () => {
      expect(service.getWinner()).toEqual(Winner.aiPlayer);
    });

    it("should get winning player", () => {
      expect(service.getWinningPlayer()).toEqual(aiPlayer);
    });

    it("should get winning line if there is one", () => {
      let gridData: GridData = range(9);
      gridData[0] = Mark.o;
      gridData[1] = Mark.o;
      gridData[2] = Mark.o;

      expect(service.getWinningLine(gridData)).toEqual([0, 1, 2]);
    });
  });
});
