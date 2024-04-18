import {
  act,
  fireEvent,
  render,
  renderHook,
  screen,
} from "@testing-library/react";
import { RefObject, useRef } from "react";
import { MOUSE_UP, useOutsideClick } from "./useOutsideClick";

describe("useOutsideClick", () => {
  let closeModal: jest.Mock<any, any>;
  let ref: RefObject<HTMLElement>;
  beforeEach(() => {
    closeModal = jest.fn();
  });

  test("adds and removes event listener", () => {
    const addSpy = jest.spyOn(document, "addEventListener");
    const removeSpy = jest.spyOn(document, "removeEventListener");

    const { unmount } = renderHook(() => useOutsideClick(closeModal, ref));

    expect(addSpy).toHaveBeenCalledWith(MOUSE_UP, expect.any(Function));
    unmount();
    expect(removeSpy).toHaveBeenCalledWith(MOUSE_UP, expect.any(Function));
  });

  test("throws an error for invalid event targets", () => {
    const { result } = renderHook(() => useOutsideClick(closeModal, ref));
    act(() => {
      const event = new Event(MOUSE_UP, { bubbles: true });
      Object.defineProperty(event, "target", { value: null, writable: false });
      document.dispatchEvent(event);
    });
    expect(closeModal).not.toHaveBeenCalled();
    expect(() => result.current).not.toThrow();
  });
  test("does not call closeModal when clicking inside the referenced element", () => {
    const TestComponent = () => {
      const ref = useRef<HTMLDivElement>(null);
      useOutsideClick(closeModal, ref);

      return (
        <div>
          <div ref={ref} data-testid="inside-element">
            Inside Element
          </div>
          <div data-testid="outside-element">Outside Element</div>
        </div>
      );
    };

    render(<TestComponent />);
    const insideElement = screen.getByTestId("inside-element");

    fireEvent.mouseUp(insideElement);

    expect(closeModal).not.toHaveBeenCalled();
  });
});
