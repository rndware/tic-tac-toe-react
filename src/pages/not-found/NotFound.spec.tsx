import { render, screen } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import NotFound from "./NotFound";

jest.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (str: string): string => str,
  }),
}));

describe("Not found page", () => {
  it("should render the description text to the player when the page is not found", () => {
    render(
      <BrowserRouter>
        <NotFound />
      </BrowserRouter>,
    );
    expect(screen.getByText("notFoundPage.description")).toBeTruthy();
  });
});
