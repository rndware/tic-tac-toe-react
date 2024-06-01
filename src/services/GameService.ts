import { Difficulty, Winner } from "../types/game";
import { GridData, GridIndex } from "../types/grid";
import { sleep } from "../utils";
import MinimaxComputerPlayerService from "./MinimaxComputerPlayerService";
import { rowIndexes, columnIndexes, diagnalIndexes } from "../const/gridData";
import { Player } from "../types/player";

// generic interface for any type of AI
interface ComputerAI {
  makeNextMove(gridData: GridData): GridData;
  getWinner(): Winner | null;
}

/**
 * Service class managing the game logic and interactions between a human player and a computer AI.
 */
export default class GameService {
  private computerAI: ComputerAI;
  private humanPlayer: Player;
  private computerPlayer: Player;
  private thinkDelay: number;

  /**
   * Constructs a new GameService instance.
   *
   * @param difficulty - The difficulty level for the computer AI.
   * @param humanPlayer - The human player.
   * @param computerPlayer - The computer player.
   * @param options - Optional parameters including a custom computer AI and a think delay.
   */
  constructor(
    difficulty: Difficulty,
    humanPlayer: Player,
    computerPlayer: Player,
    options: {
      computerAI?: ComputerAI;
      thinkDelay?: number;
    } = {},
  ) {
    this.computerAI =
      options.computerAI ||
      new MinimaxComputerPlayerService(
        difficulty,
        humanPlayer.mark,
        computerPlayer.mark,
      );
    this.humanPlayer = humanPlayer;
    this.computerPlayer = computerPlayer;
    this.thinkDelay = options.thinkDelay || 300;
  }

  /**
   * Executes the computer's move with an optional delay to simulate thinking time.
   *
   * @param gridData - The current state of the game grid.
   * @returns A promise that resolves to the updated game grid after the computer's move.
   */
  async doComputerMove(gridData: GridData): Promise<GridData> {
    // simulate computer thinking
    await sleep(this.thinkDelay);

    return this.computerAI.makeNextMove([...gridData]);
  }

  /**
   * Retrieves the winner of the game.
   *
   * @returns The winner of the game, or null if there is no winner yet.
   */
  getWinner(): Winner | null {
    return this.computerAI.getWinner();
  }

  /**
   * Determines the player who has won the game.
   *
   * @returns The winning player, or null if there is no winner or if the game is a draw.
   */
  getWinningPlayer(): Player | null {
    const winner = this.getWinner();
    if (winner === Winner.huPlayer) {
      return this.humanPlayer;
    } else if (winner === Winner.aiPlayer) {
      return this.computerPlayer;
    } else {
      return null;
    }
  }

  /**
   * Identifies the winning line in the current game grid.
   *
   * @param markedGrid - The current state of the game grid, with each cell marked by a player's mark.
   * @returns An array of grid indices representing the winning line, or an empty array if no winning line is found.
   */
  getWinningLine(markedGrid: GridData): GridIndex[] {
    const allIndexes = [rowIndexes, columnIndexes, diagnalIndexes].flat();

    for (const lineIndexes of allIndexes) {
      if (
        lineIndexes.every(
          (index) => markedGrid[index] === this.getWinningPlayer()?.mark,
        )
      ) {
        return lineIndexes;
      }
    }

    return [];
  }
}
