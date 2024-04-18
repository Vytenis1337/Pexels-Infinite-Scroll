import { useRef, useCallback } from "react";

const useInfiniteScroll = (
  isLoading: boolean,
  hasNextPage: boolean,
  setPageNum: (updateFn: (prevPageNum: number) => number) => void
): ((node: Element | null) => void) => {
  const intObserver = useRef<IntersectionObserver | null>(null);

  const lastPostRef = useCallback(
    (node: Element | null) => {
      if (isLoading) return;

      if (intObserver.current) intObserver.current.disconnect();

      intObserver.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && hasNextPage) {
          setPageNum((prev) => prev + 1);
        }
      });
      if (node) intObserver.current.observe(node);
    },
    [isLoading, hasNextPage, setPageNum]
  );

  return lastPostRef;
};

export default useInfiniteScroll;
