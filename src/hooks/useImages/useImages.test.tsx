import { renderHook, waitFor } from "@testing-library/react";
import { getImagesPage } from "../../utils/getImagesPage/getImagesPage";
import useImages from "./useImages";

jest.mock("../../utils/getImagesPage/getImagesPage");

const mockedGetImagesPage = getImagesPage as jest.MockedFunction<
  typeof getImagesPage
>;

describe("useImages", () => {
  beforeEach(() => {
    mockedGetImagesPage.mockClear();
    mockedGetImagesPage.mockResolvedValue([]);
  });
  afterEach(() => {
    jest.restoreAllMocks();
  });

  test("initial state is correct", async () => {
    const { result } = renderHook(() => useImages());

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(result.current.isError).toBe(false);
    expect(result.current.error).toEqual({ message: "" });
    expect(result.current.results).toEqual([]);
    expect(result.current.hasNextPage).toBe(false);
  });

  test("calls getImagesPage on mount and updates states accordingly", async () => {
    const mockData = [{ id: 1, src: "url1" }];
    mockedGetImagesPage.mockResolvedValue(mockData);

    const { result } = renderHook(() => useImages());
    expect(result.current.isLoading).toBe(true);

    await waitFor(() => {
      expect(result.current.isLoading).toBe(false);
    });
    expect(result.current.results).toEqual(mockData);
    expect(result.current.hasNextPage).toBe(true);
  });

  test("handles errors from the API", async () => {
    const mockError = { message: "An unknown error occurred" };
    mockedGetImagesPage.mockRejectedValue(mockError);
    const { result } = renderHook(() => useImages());

    await waitFor(() => expect(result.current.isLoading).toBe(false));

    expect(result.current.isError).toBe(true);
    expect(result.current.error.message).toBe("An unknown error occurred");
  });
  test("prevents duplicated image ids", async () => {
    const mockData = [
      { id: 1, src: "url1" },
      { id: 1, src: "url1" },
    ];
    mockedGetImagesPage.mockResolvedValue(mockData);
    const { result } = renderHook(() => useImages());

    await waitFor(() => {
      expect(result.current.results.length).toBe(1);
    });
  });

  test("aborts in-flight API requests on unmount", async () => {
    const abortFn = jest.fn();
    // @ts-ignore
    global.AbortController = jest.fn(() => ({
      abort: abortFn,
    }));
    const { unmount } = renderHook(() => useImages());

    unmount();

    expect(abortFn).toHaveBeenCalledTimes(1);
  });
});
