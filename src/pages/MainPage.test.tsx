import { render, screen } from "@testing-library/react";
import MainPage from "./MainPage";
import { FavoritesProvider } from "../context/FavoritesContext";

jest.mock("../components/favSection/FavSection", () => {
  return {
    __esModule: true,
    default: () => <div data-testid="fav-section">Mock FavSection</div>,
  };
});

jest.mock("../components/fetchImages/FetchImages", () => {
  return {
    __esModule: true,
    default: () => <div data-testid="fetch-images">Mock FetchImages</div>,
  };
});

jest.mock("../components/scrollTopButton/ScrollTopButton", () => {
  return {
    __esModule: true,
    default: () => (
      <div data-testid="scroll-top-button">Mock ScrollTopButton</div>
    ),
  };
});

describe("MainPage", () => {
  test("renders FavSection, FetchImages and ScrollTopButton component", () => {
    render(<MainPage />);
    expect(screen.getByTestId("fav-section")).toBeInTheDocument();
    expect(screen.getByTestId("fetch-images")).toBeInTheDocument();
    expect(screen.getByTestId("scroll-top-button")).toBeInTheDocument();
  });
  test("MainPage container has the correct class", () => {
    render(<MainPage />);
    const container = screen.getByTestId("main-page-container"); 
    expect(container).toHaveClass("container");
  });
  test("renders FetchImages Component", () => {
    render(
      <FavoritesProvider>
        <MainPage />
      </FavoritesProvider>
    );
    const fetchImagesComponent = screen.getByTestId("fetch-images");
    expect(fetchImagesComponent).toBeInTheDocument();
  });
});
