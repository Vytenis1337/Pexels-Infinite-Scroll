import { RefObject, useCallback, useEffect } from "react";

export const MOUSE_UP = "mouseup";

function assertIsNode(e: EventTarget | null): asserts e is Node {
  if (!e || !("nodeType" in e)) {
    console.error(`Node expected, received ${e}`);
    return;
  }
}

export const useOutsideClick = (
  closeModal: () => void,
  ref: RefObject<HTMLElement>
) => {
  const handleClick = useCallback(
    ({ target }: MouseEvent): void => {
      try {
        assertIsNode(target);

        if (ref.current && !ref.current.contains(target)) {
          closeModal();
        }
      } catch (error) {
        console.error("Error in handleClick:", error);
      }
    },
    [closeModal, ref]
  );

  useEffect(() => {
    document.addEventListener(MOUSE_UP, handleClick);

    return () => {
      document.removeEventListener(MOUSE_UP, handleClick);
    };
  }, [handleClick]);
};
