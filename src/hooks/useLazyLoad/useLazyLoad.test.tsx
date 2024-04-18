import { act, renderHook } from "@testing-library/react";
import { RefObject } from "react";
import useLazyLoad from "./useLazyLoad";

interface MockIntersectionObserver {
  storedCallback: any;
  observe: jest.Mock;
  unobserve: jest.Mock;
  disconnect: jest.Mock;
  root: Element | null;
  rootMargin: string;
  thresholds: number[];
  takeRecords: () => any[];
}

describe("useLazyLoad", () => {
  let imgRef: RefObject<HTMLImageElement>;

  beforeEach(() => {
    window.IntersectionObserver = jest
      .fn()
      .mockImplementation(function (
        this: MockIntersectionObserver,
        callback,
        options
      ) {
        this.observe = jest.fn((target) => {
          this.storedCallback = callback;
          callback([{ isIntersecting: true, target: target }], this);
        });
        this.unobserve = jest.fn();
        this.disconnect = jest.fn();
        this.root = options?.root || null;
        this.rootMargin = options?.rootMargin || "0px";
        this.thresholds = options?.thresholds || [0.5];
        this.takeRecords = jest.fn(() => []);
        return this;
      });
    imgRef = { current: document.createElement("img") };
  });

  afterEach(() => {
    jest.restoreAllMocks();
    jest.resetAllMocks();
  });
  test("should set the image source when the image becomes visible", async () => {
    const { result } = renderHook(() =>
      useLazyLoad(imgRef, "http://example.com/image.jpg")
    );
    const observer = (window.IntersectionObserver as jest.Mock).mock
      .instances[0];

    act(() => {
      observer.storedCallback([
        { isIntersecting: true, target: imgRef.current },
      ]);
    });

    expect(result.current).toBe("http://example.com/image.jpg");
  });

  test("cleans up the observer on unmount", () => {
    const { unmount } = renderHook(() =>
      useLazyLoad(imgRef, "http://example.com/image.jpg")
    );

    const observer = (window.IntersectionObserver as jest.Mock).mock
      .instances[0];

    unmount();

    expect(observer.disconnect).toHaveBeenCalled();
  });
});
