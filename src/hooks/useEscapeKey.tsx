import { useCallback, useEffect } from "react";

const KEY_NAME_ESC = "Escape";
const KEY_EVENT_TYPE = "keyup";

export const useEscapeKey = (closeModal: () => void) => {
  const handleEscKey = useCallback(
    (event: { key: string }) => {
      if (event.key === KEY_NAME_ESC) {
        closeModal();
      }
    },
    [closeModal]
  );

  useEffect(() => {
    document.addEventListener(KEY_EVENT_TYPE, handleEscKey, false);

    return () => {
      document.removeEventListener(KEY_EVENT_TYPE, handleEscKey, false);
    };
  }, [handleEscKey]);
};
