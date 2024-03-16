// useImages custom hook: Manages fetching images from the Pexels API.
// It handles loading state, errors, pagination, and ensures that images are not fetched more than once.
// Parameters:
// pageNum: Current page number for pagination.
// Returns:
// An object containing states and functions related to image fetching.

import { useState, useEffect, useRef } from "react";
import { getImagesPage } from "../utils/getImagesPage";
import { Image } from "../components/imageCard/ImageCard";

const useImages = (pageNum = 1) => {
  const [results, setResults] = useState<Image[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState({ message: "" });
  const [hasNextPage, setHasNextPage] = useState(false);

  // Reference to keep track of which image IDs have already been fetched.
  const fetchedIdsRef = useRef<Set<string>>(new Set());

  useEffect(() => {
    setIsLoading(true);
    setIsError(false);
    setError({ message: "" });

    const controller = new AbortController();
    const { signal } = controller;

    getImagesPage(pageNum, { signal })
      .then((data) => {
        // Filter out any data that has already been fetched.
        const newData = data.filter(
          (d: { id: string }) => !fetchedIdsRef.current.has(d.id)
        );
        // Add new data IDs to the fetched set to avoid refetching.
        newData.forEach((d: { id: string }) => fetchedIdsRef.current.add(d.id)); // Update the set with new IDs
        setResults((prev) => [...prev, ...newData]);
        setHasNextPage(Boolean(data.length));
        setIsLoading(false);
      })
      .catch((e) => {
        setIsLoading(false);
        if (signal.aborted) return; // Ignore errors from canceled requests.
        setIsError(true);
        if (e.name === "AbortError") {
          setError({ message: "Request was cancelled" });
        } else if (e.response && e.response.status === 429) {
          setError({ message: "Youve hit the rate limit! Try again later." });
        } else if (!navigator.onLine) {
          setError({ message: "Check your internet connection and try again" });
        } else {
          setError({ message: e.message || "An unknown error occurred" });
        }
      });

    return () => controller.abort(); // Clean up by aborting in-flight requests.
  }, [pageNum]);

  return { isLoading, isError, error, results, hasNextPage };
};

export default useImages;
