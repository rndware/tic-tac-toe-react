import "@testing-library/jest-dom";
import { range } from "lodash";
import { gridSize } from "../const/gridData";
import { HighlightColors } from "../types/player";
import { cleanup, screen } from "@testing-library/react";
import { renderWithProviders } from "../utils/test-utils";

import BoardContainer from "./BoardContainer";

afterEach(() => {
  cleanup();
});

describe("BoardContainer", () => {
  describe("display tic tac toe table grid component to player", () => {
    // let query: any;
    const options = {
      preloadedState: {
        board: {
          gridData: range(gridSize * gridSize),
          highlighted: [],
          highlightColor: HighlightColors.red,
        },
      },
    };

    beforeEach(() => {});

    it("should render with correct number of rows", () => {
      renderWithProviders(<BoardContainer />, options);
      const table = screen.getByTestId("board-table");
      // eslint-disable-next-line testing-library/no-node-access
      expect(table.getElementsByClassName("BoardRow").length).toBe(gridSize);
    });

    it("should render with correct number of cells", () => {
      renderWithProviders(<BoardContainer />, options);
      const table = screen.getByTestId("board-table");
      // eslint-disable-next-line testing-library/no-node-access
      expect(table.getElementsByClassName("BoardCell").length).toBe(
        gridSize * gridSize,
      );
    });
  });
});
