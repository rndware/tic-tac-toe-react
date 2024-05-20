import { render } from "@testing-library/react";
import { BrowserRouter } from "react-router-dom";
import NotFound from "./NotFound";

jest.mock("react-i18next", () => ({
  useTranslation: () => ({
    t: (str: string): string => str,
  }),
}));

describe("Not found page", () => {
  // TODO: get type
  let query: any;

  beforeEach(() => {
    query = render(
      <BrowserRouter>
        <NotFound />
      </BrowserRouter>
    );
  });

  it("should render the description text to the player when the page is not found", () => {
    expect(query.getByText("notFoundPage.description")).toBeTruthy();
  });
});
