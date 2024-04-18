import { render, screen, fireEvent } from "@testing-library/react";
import ScrollTopButton from "./ScrollTopButton";

describe("scrollTopButton", () => {
  test("should not display the button without scrolling", () => {
    render(<ScrollTopButton />);
    expect(screen.queryByTestId("scroll-top-button")).toBeNull();
  });
  test("should display the button only after scrolling down 300 pixels", () => {
    render(<ScrollTopButton />);
    expect(screen.queryByTestId("scroll-top-button")).toBeNull();

    fireEvent.scroll(window, { target: { scrollY: 301 } });
    expect(screen.getByTestId("scroll-top-button")).toBeInTheDocument();
  });

  test("should scroll to the top when the button is clicked", () => {
    render(<ScrollTopButton />);
    fireEvent.scroll(window, { target: { scrollY: 500 } });
    expect(screen.getByTestId("scroll-top-button")).toBeInTheDocument();

    window.scrollTo = jest.fn();
    fireEvent.click(screen.getByTestId("scroll-top-button"));
    expect(window.scrollTo).toHaveBeenCalledWith({
      top: 0,
      behavior: "smooth",
    });
  });

  test("should remove the scroll event listener on unmount", () => {
    const { unmount } = render(<ScrollTopButton />);
    const removeEventListenerSpy = jest.spyOn(window, "removeEventListener");

    fireEvent.scroll(window, { target: { scrollY: 500 } });
    unmount();

    expect(removeEventListenerSpy).toHaveBeenCalledWith(
      "scroll",
      expect.any(Function)
    );
  });
});
