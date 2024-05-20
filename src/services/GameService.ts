import { Difficulty, Winner } from "../types/game";
import { GridData, GridIndex } from "../types/grid";
import { sleep } from "../utils";
import MinimaxComputerPlayerService from "./MinimaxComputerPlayerService";
import { rowIndexes, columnIndexes, diagnalIndexes } from "../const/gridData";
import { Player } from "../types/player";

export default class GameService {
  private computerAI: MinimaxComputerPlayerService;
  private humanPlayer: Player;
  private computerPlayer: Player;
  private thinkDelay: number;

  constructor(
    difficulty: Difficulty,
    humanPlayer: Player,
    computerPlayer: Player,
    thinkDelay: number = 300
  ) {
    this.computerAI = new MinimaxComputerPlayerService(
      difficulty,
      humanPlayer.mark,
      computerPlayer.mark
    );
    this.humanPlayer = humanPlayer;
    this.computerPlayer = computerPlayer;
    this.thinkDelay = thinkDelay;
  }

  async doComputerMove(gridData: GridData): Promise<GridData> {
    // simulate computer thinking
    await sleep(this.thinkDelay);

    return this.computerAI.makeNextMove([...gridData]);
  }

  getWinner(): Winner | null {
    return this.computerAI.getWinner();
  }

  getWinningPlayer(): Player | null {
    const winner = this.getWinner();
    if (winner !== Winner.draw) {
      return winner === Winner.huPlayer
        ? this.humanPlayer
        : this.computerPlayer;
    } else {
      return null;
    }
  }

  getWinningLine(markedGrid: GridData): GridIndex[] {
    const allIndexes = [rowIndexes, columnIndexes, diagnalIndexes].flat();

    let winningLine: GridIndex[] = [];

    for (let lineIndexes of allIndexes) {
      if (
        lineIndexes.every(
          (index: GridIndex) =>
            markedGrid[index] === this.getWinningPlayer()?.mark
        )
      ) {
        winningLine = lineIndexes;

        // avoid extra looping when wining line found
        break;
      }
    }

    return winningLine;
  }
}
