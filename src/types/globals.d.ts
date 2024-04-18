declare global {
  interface Window {
    IntersectionObserver: typeof IntersectionObserver & {
      new (
        callback: IntersectionObserverCallback,
        options?: IntersectionObserverInit
      ): IntersectionObserver;
      mock: {
        instances: IntersectionObserverMock[];
        calls: any[];
      };
    };
  }

  interface IntersectionObserver {
    mock: {
      instances: IntersectionObserverMock[];
      calls: any[];
    };
  }
}
export {};
