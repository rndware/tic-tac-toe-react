import { Mark } from "./game";

export enum HighlightColors {
  red = "red",
  blue = "blue",
}

export enum PlayerType {
  human,
  computer,
}

export interface Player {
  name: string;
  age?: number;
  color: HighlightColors;
  mark: Mark;
  playerType?: PlayerType;
}
