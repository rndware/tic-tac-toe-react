import { render, screen } from "@testing-library/react";
import Scoreboard from "./Scoreboard";
describe("Scoreboard", () => {
  const playerDetails = [
    { title: "Player", scores: { wins: 1, losses: 2, draws: 1 } },
    { title: "Computer", scores: { wins: 2, losses: 1, draws: 1 } },
  ];
  const copy = {
    player: "Player",
    computer: "Computer",
    wins: "Wins",
    losses: "Losses",
    draws: "Draws",
  };
  it("should render the Player title", () => {
    render(<Scoreboard copy={copy} playerDetails={playerDetails} />);
    expect(screen.getByText(/Player/).textContent).toBe("Player");
  });

  it("should render the Computer title", () => {
    render(<Scoreboard copy={copy} playerDetails={playerDetails} />);
    expect(screen.getByText(/Computer/).textContent).toBe("Computer");
  });

  describe("scores", () => {
    it("should render wins", () => {
      render(<Scoreboard copy={copy} playerDetails={playerDetails} />);
      expect(screen.getAllByText(/Wins/).length).toBe(2);
    });

    it("should render losses", () => {
      render(<Scoreboard copy={copy} playerDetails={playerDetails} />);
      expect(screen.getAllByText(/Losses/).length).toBe(2);
    });

    it("should render draws", () => {
      render(<Scoreboard copy={copy} playerDetails={playerDetails} />);
      expect(screen.getAllByText(/Draws/).length).toBe(2);
    });
  });
});
