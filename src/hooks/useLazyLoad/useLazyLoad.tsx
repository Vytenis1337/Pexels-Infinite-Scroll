import { useState, useEffect, RefObject } from "react";

const useLazyLoad = (
  imgRef: RefObject<HTMLImageElement>,
  src: string
): string => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    const currentImg = imgRef.current;
    if (!currentImg) {
      console.log("No image ref present, skipping setup.");
      return;
    }

    console.log("Initializing observer for image:", src);
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            console.log("Image is now visible:", src);
            setLoaded(true);
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.5,
        rootMargin: "75%",
        root: document.documentElement,
      }
    );

    observer.observe(currentImg);

    return () => {
      console.log("Disconnecting observer for image:", src);
      setLoaded(false);
      observer.disconnect();
    };
  }, [src, imgRef]);

  return loaded ? src : "";
};

export default useLazyLoad;
