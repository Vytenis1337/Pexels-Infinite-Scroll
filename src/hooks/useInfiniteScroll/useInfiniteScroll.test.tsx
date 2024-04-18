import { act, renderHook } from "@testing-library/react";
import useInfiniteScroll from "./useInfiniteScroll";

describe("useInfiniteScroll", () => {
  test("calls setPageNum when the sentinel node is intersecting and hasNextPage is true", () => {
    const setPageNum = jest.fn();
    const { result } = renderHook(() =>
      useInfiniteScroll(false, true, setPageNum)
    );

    act(() => {
      result.current(document.createElement("div"));
    });

    expect(setPageNum).toHaveBeenCalled();
  });

  test("does not call setPageNum when isLoading is true", () => {
    const setPageNum = jest.fn();
    const { result } = renderHook(() =>
      useInfiniteScroll(true, true, setPageNum)
    );

    act(() => {
      const sentinelNode = document.createElement("div");
      result.current(sentinelNode);
    });

    expect(setPageNum).not.toHaveBeenCalled();
  });
});
