import fetchMock from "jest-fetch-mock";
import "@testing-library/jest-dom";

fetchMock.enableMocks();

export class IntersectionObserverMock implements IntersectionObserver {
  static mock = {
    instances: [] as IntersectionObserverMock[],
    calls: [] as any[],
  };

  root: Element | Document | null = null;
  rootMargin: string = "0px";
  thresholds: ReadonlyArray<number> = [0.5];

  callback: IntersectionObserverCallback;
  options?: IntersectionObserverInit;

  constructor(
    callback: IntersectionObserverCallback,
    options?: IntersectionObserverInit
  ) {
    this.callback = callback;
    this.options = options;
    if (options) {
      if (options.root) this.root = options.root;
      if (options.rootMargin) this.rootMargin = options.rootMargin;
      this.thresholds = Array.isArray(options.threshold)
        ? options.threshold
        : [options.threshold ?? 0.5];
    }
    IntersectionObserverMock.mock.instances.push(this);
  }
  mock!: { instances: IntersectionObserverMock[]; calls: any[] };

  observe(target: Element): void {
    this.callback(
      [
        {
          isIntersecting: true,
          target,
          time: Date.now(),
          intersectionRatio: 1,
          rootBounds: target.getBoundingClientRect(),
          boundingClientRect: target.getBoundingClientRect(),
          intersectionRect: target.getBoundingClientRect(),
        },
      ] as IntersectionObserverEntry[],
      this
    );
    IntersectionObserverMock.mock.calls.push(["observe", target]);
  }

  unobserve(target: Element): void {
    IntersectionObserverMock.mock.calls.push(["unobserve", target]);
  }

  disconnect(): void {
    IntersectionObserverMock.mock.calls.push(["disconnect"]);
  }

  takeRecords(): IntersectionObserverEntry[] {
    return [];
  }
}

window.IntersectionObserver = IntersectionObserverMock as any;
global.IntersectionObserver = IntersectionObserverMock as any;
Object.defineProperty(window, "IntersectionObserver", {
  writable: true,
  configurable: true,
  value: IntersectionObserverMock,
});

Object.defineProperty(global, "IntersectionObserver", {
  writable: true,
  configurable: true,
  value: IntersectionObserverMock,
});
class DOMRectReadOnlyPolyfill {
  x: number;
  y: number;
  width: number;
  height: number;
  top: number;
  left: number;
  right: number;
  bottom: number;

  constructor(x = 0, y = 0, width = 0, height = 0) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.top = y;
    this.left = x;
    this.right = x + width;
    this.bottom = y + height;
  }

  toJSON() {
    return {
      x: this.x,
      y: this.y,
      width: this.width,
      height: this.height,
      top: this.top,
      left: this.left,
      right: this.right,
      bottom: this.bottom,
    };
  }

  static fromRect(
    rectangle: { x: number; y: number; width: number; height: number } = {
      x: 0,
      y: 0,
      width: 0,
      height: 0,
    }
  ) {
    return new DOMRectReadOnlyPolyfill(
      rectangle.x,
      rectangle.y,
      rectangle.width,
      rectangle.height
    );
  }
}

if (typeof global.DOMRectReadOnly === "undefined") {
  global.DOMRectReadOnly = DOMRectReadOnlyPolyfill;
}

class DOMRectPolyfill {
  x: number;
  y: number;
  width: number;
  height: number;
  top: number;
  right: number;
  bottom: number;
  left: number;

  constructor(x = 0, y = 0, width = 0, height = 0) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
    this.top = y;
    this.right = x + width;
    this.bottom = y + height;
    this.left = x;
  }

  toJSON() {
    return {
      x: this.x,
      y: this.y,
      width: this.width,
      height: this.height,
      top: this.top,
      right: this.right,
      bottom: this.bottom,
      left: this.left,
    };
  }

  static fromRect(rectangle = { x: 0, y: 0, width: 0, height: 0 }) {
    return new DOMRectPolyfill(
      rectangle.x,
      rectangle.y,
      rectangle.width,
      rectangle.height
    );
  }
}

global.DOMRect = DOMRectPolyfill;
