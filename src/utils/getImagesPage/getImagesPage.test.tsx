import { getImagesPage } from "./getImagesPage";
import fetchMock from "jest-fetch-mock";

beforeEach(() => {
  fetchMock.resetMocks();
});

describe("getImagesPage", () => {
  test("fetches images successfully", async () => {
    fetchMock.mockResponseOnce(
      JSON.stringify({
        photos: [{ id: 1, url: "https://example.com/photo1.jpg" }],
      })
    );

    const photos = await getImagesPage();
    expect(photos).toEqual([{ id: 1, url: "https://example.com/photo1.jpg" }]);
    expect(fetch).toHaveBeenCalledTimes(1);
  });

  test("throws an error when fetching fails", async () => {
    fetchMock.mockResponseOnce("", { status: 404 });

    await expect(getImagesPage()).rejects.toThrow("Failed to fetch posts");
  });
});
