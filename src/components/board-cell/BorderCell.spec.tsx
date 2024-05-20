import { render, screen, cleanup, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import BoardCell from "./BoardCell";
import { HighlightColors } from "../../types/player";

afterEach(() => {
  cleanup();
});

describe("BorderCell", () => {
  const id = 0;
  const value = 1;
  const cellTestId = `board-cell-${id}`;

  it("should highlight contents to player when highlighted", () => {
    render(
      <BoardCell
        id={id}
        value={value}
        isHighlighted={true}
        highlightColor={HighlightColors.red}
        onClick={() => {}}
      />,
    );

    expect(screen.getByTestId(cellTestId).className).toBe(
      "BoardCell BoardCell--highlighted-red",
    );
  });

  it("should call onClick prop when selected by the player", () => {
    const handleClick = jest.fn();

    render(
      <BoardCell
        id={id}
        value={value}
        isHighlighted={false}
        highlightColor={null}
        onClick={handleClick}
      />,
    );

    fireEvent.click(screen.getByTestId(cellTestId));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });
});
