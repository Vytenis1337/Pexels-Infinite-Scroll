import { RefObject, useCallback, useEffect } from "react";

const MOUSE_UP = "mouseup";

function assertIsNode(e: EventTarget | null): asserts e is Node {
  if (!e || !("nodeType" in e)) {
    throw new Error(`Node expected`);
  }
}

export const useOutsideClick = (
  closeModal: () => void,
  ref: RefObject<HTMLInputElement>
) => {
  const handleClick = useCallback(
    ({ target }: MouseEvent): void => {
      assertIsNode(target);
      if (ref?.current?.contains && !ref.current.contains(target)) {
        closeModal();
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
