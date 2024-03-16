import { useCallback, useEffect } from "react";

// Defined constants for the Escape key and the keyup event type to improve code readability.
const KEY_NAME_ESC = "Escape";
const KEY_EVENT_TYPE = "keyup";

export const useEscapeKey = (closeModal: () => void) => {
  // Create a memoized callback that will be executed on the keyup event.
  // This callback checks if the pressed key is the Escape key and, if so, calls the closeModal function.
  const handleEscKey = useCallback(
    (event: { key: string }) => {
      // Check if the pressed key is the Escape key.
      if (event.key === KEY_NAME_ESC) {
        // Call the closeModal callback function.
        closeModal();
      }
    },
    [closeModal]
  );
  // Use the useEffect hook to add and remove the event listener for the keyup event.
  useEffect(() => {
    // Add the event listener to the document to listen for keyup events.
    document.addEventListener(KEY_EVENT_TYPE, handleEscKey, false);

    return () => {
      // Cleanup function to remove the event listener when the component unmounts or the dependencies change.
      document.removeEventListener(KEY_EVENT_TYPE, handleEscKey, false);
    };
  }, [handleEscKey]);
};
