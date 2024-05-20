import Minimax from "tic-tac-toe-minimax";
import { Difficulty, Mark, Winner } from "../types/game";
import { GridData } from "../types/grid";

interface NextGameState {
  winner: Winner | null;
  board: GridData;
}

/**
 * A thin wrapper around "tic-tac-toe-minimax":
 * https://github.com/marianoheller/tic-tac-toe-minimax
 */
export default class MinimaxComputerPlayerService {
  difficulty: Difficulty;
  symbols: { huPlayer: Mark; aiPlayer: Mark };
  winner: Winner | null;

  constructor(difficulty: Difficulty, huPlayer: Mark, aiPlayer: Mark) {
    this.difficulty = difficulty;

    this.symbols = {
      huPlayer,
      aiPlayer,
    };

    this.winner = null;
  }

  makeNextMove(board: GridData): GridData {
    const nextStep: NextGameState = Minimax.GameStep(
      board,
      this.symbols,
      this.difficulty
    );

    this.winner = nextStep.winner;

    return nextStep.board;
  }

  getWinner(): Winner | null {
    return this.winner;
  }
}
