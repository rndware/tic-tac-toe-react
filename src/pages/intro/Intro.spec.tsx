import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import Intro from "./Intro";

jest.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (str: string): string => str,
  }),
}));

describe("Intro page", () => {
  it("should render the title of the game text to the player", () => {
    render(
      <BrowserRouter>
        <Intro />
      </BrowserRouter>,
    );
    expect(screen.getByText("introPage.title")).toBeTruthy();
  });

  it("should render the description of the game text to the player", () => {
    render(
      <BrowserRouter>
        <Intro />
      </BrowserRouter>,
    );
    expect(screen.getByText("introPage.description")).toBeTruthy();
  });

  it("should render the start game button to the player", () => {
    render(
      <BrowserRouter>
        <Intro />
      </BrowserRouter>,
    );
    expect(screen.getByText("introPage.startGame")).toBeTruthy();
  });

  it("should render the options button to the player", () => {
    render(
      <BrowserRouter>
        <Intro />
      </BrowserRouter>,
    );
    expect(screen.getByText("introPage.options")).toBeTruthy();
  });
});
