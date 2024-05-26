import { render, screen, cleanup, fireEvent } from "@testing-library/react";
import { range } from "lodash";
import "@testing-library/jest-dom";
import Board, { BoardCellSlot } from "./Board";

afterEach(() => {
  cleanup();
});

describe("Board", () => {
  const gridData = range(6);
  const bardTestId = "board-table";
  const cellTestId = "board-cell-1";

  describe("game is active and enabled for the player", () => {
    it("should render an enabled lined board to the player", () => {
      render(<Board gridData={gridData} onClick={() => {}} />);

      expect(screen.getByTestId(bardTestId).className).toBe(
        "Board__table Board__table--lined",
      );
    });

    it("should not supppress click events made by the player", () => {
      const handleClick = jest.fn();
      render(<Board gridData={gridData} onClick={handleClick} />);

      fireEvent.click(screen.getByTestId(cellTestId));

      expect(handleClick).toHaveBeenCalledTimes(1);
    });
  });

  describe("game is over and disabled for the player", () => {
    it("should render a disabled lined board to the player", () => {
      render(<Board disabled={true} gridData={gridData} onClick={() => {}} />);

      expect(screen.getByTestId(bardTestId).className).toBe(
        "Board__table Board__table--disabled Board__table--lined",
      );
    });

    it("should supppress click events made by the player", () => {
      const handleClick = jest.fn();
      render(
        <Board disabled={true} gridData={gridData} onClick={handleClick} />,
      );

      fireEvent.click(screen.getByTestId(cellTestId));

      expect(handleClick).toHaveBeenCalledTimes(0);
    });

    it("should allow cell slot to be specified", () => {
      render(
        <Board gridData={gridData} onClick={() => {}}>
          <BoardCellSlot>
            {(args) => (
              <div
                className="ReplacedSlot"
                data-testid={"replaced-cell-" + args.index}
              >
                {"ReplacedCell" + args.value}
              </div>
            )}
          </BoardCellSlot>
        </Board>,
      );

      expect(screen.getByTestId("replaced-cell-1").innerHTML).toBe(
        "ReplacedCell1",
      );
      expect(screen.getByTestId("replaced-cell-2").innerHTML).toBe(
        "ReplacedCell2",
      );
    });
  });
});
