import { RefObject, useCallback, useEffect } from "react";

// Constant for the 'mouseup' event to detect clicks outside the referenced element.
const MOUSE_UP = "mouseup";

/**
 * Type guard to assert that a given event target is an instance of Node.
 * Throws an error if the assertion fails, providing runtime type safety.
 */
function assertIsNode(e: EventTarget | null): asserts e is Node {
  if (!e || !("nodeType" in e)) {
    throw new Error(`Node expected`);
  }
}

/**
 * Custom React hook to detect and respond to clicks outside a specified element.
 * @param closeModal A callback function that closes the modal.
 * @param ref A React ref object pointing to the element to detect outside clicks for.
 */
export const useOutsideClick = (
  closeModal: () => void,
  ref: RefObject<HTMLInputElement>
) => {
  // The callback function to be executed when a click event is detected.
  const handleClick = useCallback(
    ({ target }: MouseEvent): void => {
      // Ensure the target is a valid Node before proceeding.
      assertIsNode(target);
      // If the click is outside the referenced element, execute the closeModal callback.
      if (ref?.current?.contains && !ref.current.contains(target)) {
        closeModal();
      }
    },
    [closeModal, ref]
  );

  useEffect(() => {
    // Attach the click event listener to the document on component mount.
    document.addEventListener(MOUSE_UP, handleClick);

    return () => {
      // Clean up by removing the event listener on component unmount.
      document.removeEventListener(MOUSE_UP, handleClick);
    };
  }, [handleClick]);
};
