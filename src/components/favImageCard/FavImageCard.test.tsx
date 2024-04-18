import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { useFavoritesContext } from "../../context/FavoritesContext";
import FavImageCard from "./FavImageCard";

jest.mock("../../context/FavoritesContext", () => ({
  useFavoritesContext: jest.fn(),
}));
const mockImage = {
  id: 1,
  alt: "Test Image",
  src: {
    small: "url-small",
    medium: "url-medium",
    large: "url-large",
    large2x: "url-large2x",
    landscape: "",
    original: "",
    portrait: "",
    tiny: "",
  },
  photographer: "John Doe",
  photographer_url: "https://example.com",
  avg_color: "",
  height: 600,
  width: 800,
  liked: false,
  photographer_id: 123,
  url: "https://example.com/image/1",
};
describe("FavImageCard", () => {
  test("renders the favorite image with correct properties", () => {
    const mockRemoveFavorite = jest.fn();
    (useFavoritesContext as jest.Mock).mockReturnValue({
      removeFavorite: mockRemoveFavorite,
    });
    render(<FavImageCard image={mockImage} />);

    const imageElement = screen.getByRole("img", { name: mockImage.alt });
    expect(imageElement).toHaveAttribute("src", mockImage.src.large);
    expect(imageElement).toHaveAttribute("alt", mockImage.alt);

    const unfavoriteButton = screen.getByRole("button", { name: "Unfavorite" });
    expect(unfavoriteButton).toBeInTheDocument();
  });

  test("calls removeFavorite when the unfavorite button is clicked", async () => {
    const mockRemoveFavorite = jest.fn();
    const user = userEvent.setup();
    (useFavoritesContext as jest.Mock).mockReturnValue({
      removeFavorite: mockRemoveFavorite,
    });

    render(<FavImageCard image={mockImage} />);

    const unfavoriteButton = screen.getByRole("button", { name: "Unfavorite" });
    await user.click(unfavoriteButton);

    expect(mockRemoveFavorite).toHaveBeenCalledWith(mockImage.id);
  });
});
