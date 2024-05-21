import React from "react";
import { HighlightColors, Player } from "../types/player";
import GameOverBanner from "../components/game-over-banner";
import { Mode, Mark } from "../types/game";

import "./assets/story.css";

export default {
  title: "Core/Game Over Banner",
  component: GameOverBanner,
};

const copy = {
  draw: "Game Over, Draw.",
  restart: "Restart",
  quit: "Quit",
};

export const Draw = {
  args: {
    gameMode: Mode.Ended,
    copy,
  },
};

const humanPlayer: Player = {
  name: "Mr. Human",
  age: 30,
  mark: Mark.x,
  color: HighlightColors.red,
};

const computerPlayer: Player = {
  name: "Mr. Computer",
  age: 30,
  mark: Mark.o,
  color: HighlightColors.red,
};

export const PlayerWins = {
  args: {
    copy: {
      ...copy,
      winner: `Game Over, "${humanPlayer.name}" has won.`,
    },
    gameMode: Mode.Ended,
    winningPlayer: humanPlayer,
  },
};

export const ComputerWins = {
  args: {
    copy: {
      ...copy,
      winner: `Game Over, "${computerPlayer.name}" has won.`,
    },
    gameMode: Mode.Ended,
    winningPlayer: computerPlayer,
  },
};
