import { render, screen } from "@testing-library/react";
import Game from "./Game";

jest.mock("../../containers/GameContainer", () => () => (
  <div>Game Container</div>
));

describe("Game page", () => {
  it("should render the game content to the player", () => {
    render(<Game />);
    expect(screen.getByText("Game Container")).toBeTruthy();
  });
});
