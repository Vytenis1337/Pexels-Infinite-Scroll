import { useState, useEffect, RefObject } from "react";

const useLazyLoad = (
  imgRef: RefObject<HTMLImageElement>,
  src: string
): string => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const currentImg = imgRef.current;

    if (currentImg) {
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              setLoaded(true);
              observer.unobserve(entry.target);
            }
          });
        },
        {
          threshold: 0.5,
          rootMargin: "75%",
        }
      );

      observer.observe(currentImg);

      return () => {
        if (currentImg) {
          observer.unobserve(currentImg);
        }
      };
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [src]);

  return loaded ? src : "";
};

export default useLazyLoad;
