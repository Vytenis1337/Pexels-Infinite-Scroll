import userEvent from "@testing-library/user-event";
import { useEscapeKey } from "./useEscapeKey";
import { renderHook } from "@testing-library/react";

describe("useEscapeKey", () => {
  test("uses the same function for adding and removing the event listener", () => {
    const closeModal = jest.fn();
    let addedHandler;
    let removedHandler;

    const addSpy = jest
      .spyOn(document, "addEventListener")
      .mockImplementation((event, handler, options) => {
        if (event === "keyup") {
          addedHandler = handler;
        }
      });

    const removeSpy = jest
      .spyOn(document, "removeEventListener")
      .mockImplementation((event, handler, options) => {
        if (event === "keyup") {
          removedHandler = handler;
        }
      });

    const { unmount } = renderHook(() => useEscapeKey(closeModal));
    unmount();

    expect(addedHandler).toBe(removedHandler);

    addSpy.mockRestore();
    removeSpy.mockRestore();
  });
  test("calls closeModal when Escape key is pressed", async () => {
    const closeModal = jest.fn();
    renderHook(() => useEscapeKey(closeModal));

    const user = userEvent.setup();
    await user.keyboard("{Escape}");

    expect(closeModal).toHaveBeenCalled();
  });

  test("does not call closeModal when another key is pressed", async () => {
    const closeModal = jest.fn();
    renderHook(() => useEscapeKey(closeModal));

    const user = userEvent.setup();
    await user.keyboard("{Enter}");

    expect(closeModal).not.toHaveBeenCalled();
  });
});
