import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import { useFavoritesContext } from "../../context/FavoritesContext";
import FavSection from "./FavSection";

jest.mock("../../context/FavoritesContext", () => ({
  useFavoritesContext: jest.fn(),
}));

describe("FavSection", () => {
  test("renders without crashing and displays the favorites button when there are favorites", () => {
    (useFavoritesContext as jest.Mock).mockReturnValue({
      favorites: [{ id: 1, image: "test.jpg" }],
    });

    render(<FavSection />);
    expect(screen.getByTestId("fav-section")).toBeInTheDocument();
  });

  test("does not display the favorites button when there are no favorites", () => {
    (useFavoritesContext as jest.Mock).mockReturnValue({ favorites: [] });

    render(<FavSection />);
    expect(screen.queryByTestId("fav-section")).toBeNull();
  });
});
