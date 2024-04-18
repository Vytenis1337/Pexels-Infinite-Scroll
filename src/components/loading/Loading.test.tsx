import { render, screen } from "@testing-library/react";
import { Loading } from "./Loading";

describe("Loading Component", () => {
  test("renders without crashing", () => {
    render(<Loading />);
    const loadingElement = screen.getByTestId("loading-screen");
    expect(loadingElement).toBeInTheDocument();
  });

  test("has correct spinner classes", () => {
    render(<Loading />);
    const spinnerElement = screen.getByTestId("lds-spinner");
    expect(spinnerElement).toHaveClass("lds-spinner");
  });
});
