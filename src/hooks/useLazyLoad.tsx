import { useState, useEffect, RefObject } from "react";

/**
 * Custom React hook for lazy loading images. This hook uses the IntersectionObserver API
 * to load an image only when it becomes visible within the viewport.
 */

const useLazyLoad = (
  imgRef: RefObject<HTMLImageElement>, // Ref to the image element.
  src: string // Source URL of the image.
): string => {
  // State to track whether the image has been loaded.
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // Get the current image element from the ref.
    const currentImg = imgRef.current;

    if (currentImg) {
      // Create a new IntersectionObserver to watch when the image becomes visible.
      const observer = new IntersectionObserver(
        (entries) => {
          // Iterate through the observed entries.
          entries.forEach((entry) => {
            // Check if the image is intersecting (visible within the viewport).
            if (entry.isIntersecting) {
              // Set the loaded state to true, indicating the image should now be loaded.
              setLoaded(true);
              // Stop observing the current image since it has been loaded.
              observer.unobserve(entry.target);
            }
          });
        },
        {
          threshold: 0.5, // Percentage of the image's visibility required to load the image.
          rootMargin: "75%", // Margin around the root. Here it's set to load images a bit before they enter the viewport.
        }
      );

      // Start observing the current image element.
      observer.observe(currentImg);

      // Clean up function to unobserve the current image when the component unmounts or the src changes.
      return () => {
        if (currentImg) {
          observer.unobserve(currentImg);
        }
      };
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [src]);

  // Return the image source if loaded; otherwise, return an empty string to defer loading.
  return loaded ? src : "";
};

export default useLazyLoad;
