import "@testing-library/jest-dom";
import { cleanup, fireEvent, screen, waitFor } from "@testing-library/react";
import { Mark } from "../types/game";
import { HighlightColors } from "../types/player";
import { renderWithProviders, RouterTestHarness } from "../utils/test-utils";

import GameContainer from "./GameContainer";

jest.mock("react-i18next", () => ({
  useTranslation: () => {
    const gamePage = {
      winner: "Game Over, player has won.",
      draw: "Game Over, Draw.",
      restart: "Restart",
      quit: "Quit",
      undo: "Undo",
    };

    return {
      t: () => {
        return gamePage;
      },
    };
  },
}));

afterEach(() => {
  cleanup();
});

describe("GameContainer", () => {
  describe("the game has ended and the player has won", () => {
    const text = "Game Over, player has won.";

    const setupTest = async () => {
      renderWithProviders(
        <RouterTestHarness>
          <GameContainer />
        </RouterTestHarness>,
        {
          preloadedState: {
            board: {
              gridData: [0, Mark.o, Mark.o, 3, 4, 5, 6, 7, 8],
              highlighted: [],
              highlightColor: HighlightColors.red,
            },
          },
        },
      );

      const cell = screen.getByTestId("board-cell-0");
      fireEvent.click(cell);

      const text = "Game Over, player has won.";
      await screen.findByText(text);
    };

    it("should blur the game grid and controls area to the player", async () => {
      await setupTest();
      const container = screen.getByTestId("board-container-wrapper");
      expect(container.className).toBe(
        "BoardContainer__wrapper BoardContainer__wrapper--blurred",
      );
    });

    it("should display the game over banner to the player indicating they have won", async () => {
      await setupTest();
      const banner = screen.getByText(text);
      expect(banner).toBeInTheDocument();
    });
  });

  // TODO: draw and lose conditions
});
