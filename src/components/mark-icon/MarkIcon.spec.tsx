import { render, screen, cleanup } from "@testing-library/react";
import "@testing-library/jest-dom";
import { Mark } from "../../types/game";
import MarkIcon from "./MarkIcon";

afterEach(() => {
  cleanup();
});

describe("MarkIcon", () => {
  it("should render a cross to player", () => {
    render(<MarkIcon value={Mark.x} />);
    const button = screen.getByTestId("mark-icon-cross");
    expect(button).toHaveClass("MarkIcon__cross");
  });

  it("should render a nought to player", () => {
    render(<MarkIcon value={Mark.o} />);
    const button = screen.getByTestId("mark-icon-nought");
    expect(button).toHaveClass("MarkIcon__nought");
  });

  it("should render an empty cell to player", () => {
    render(<MarkIcon value={1} />);
    const button = screen.getByTestId("mark-icon-empty");
    expect(button).toHaveClass("MarkIcon__empty");
  });
});
