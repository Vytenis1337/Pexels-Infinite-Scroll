import { useRef, useCallback } from "react";

/**
 * A custom React hook that implements infinite scrolling functionality.
 * It uses the IntersectionObserver API to detect when the user has scrolled to the end of the page,
 * and then triggers loading more content.
 */
const useInfiniteScroll = (
  isLoading: boolean, // indicating whether data is currently being loaded.
  hasNextPage: boolean, //  indicating if there are more pages of data to load.
  setPageNum: (updateFn: (prevPageNum: number) => number) => void
): ((node: Element | null) => void) => {
  // Ref to hold the IntersectionObserver instance.
  const intObserver = useRef<IntersectionObserver | null>(null);

  // The callback ref that React will call with the sentinel element whenever it renders.
  // This function sets up or disconnects the IntersectionObserver
  const lastPostRef = useCallback(
    (node: Element | null) => {
      if (isLoading) return;

      // If an observer exists, disconnect it to reset for the new sentinel element.
      if (intObserver.current) intObserver.current.disconnect();

      // Initialize a new IntersectionObserver.
      intObserver.current = new IntersectionObserver((entries) => {
        // Trigger setPageNum to load more data when the sentinel element is intersecting (visible) and there are more pages to load.
        if (entries[0].isIntersecting && hasNextPage) {
          setPageNum((prev) => prev + 1);
        }
      });
      // If a sentinel node is provided, start observing it.
      if (node) intObserver.current.observe(node);
    },
    [isLoading, hasNextPage, setPageNum]
  );

  return lastPostRef;
};

export default useInfiniteScroll;
