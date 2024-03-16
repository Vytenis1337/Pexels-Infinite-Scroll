import { useState, useEffect, useRef } from "react";
import { getPostsPage } from "../utils/getImagesPage";
import { Image } from "../components/imageCard/ImageCard";

const useImages = (pageNum = 1) => {
  const [results, setResults] = useState<Image[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isError, setIsError] = useState(false);
  const [error, setError] = useState({ message: "" });
  const [hasNextPage, setHasNextPage] = useState(false);

  const fetchedIdsRef = useRef<Set<string>>(new Set());

  useEffect(() => {
    setIsLoading(true);
    setIsError(false);
    setError({ message: "" });

    const controller = new AbortController();
    const { signal } = controller;

    getPostsPage(pageNum, { signal })
      .then((data) => {
        const newData = data.filter(
          (d: { id: string }) => !fetchedIdsRef.current.has(d.id)
        );
        newData.forEach((d: { id: string }) => fetchedIdsRef.current.add(d.id)); // Update the set with new IDs
        setResults((prev) => [...prev, ...newData]);
        setHasNextPage(Boolean(data.length));
        setIsLoading(false);
      })
      .catch((e) => {
        setIsLoading(false);
        if (signal.aborted) return;
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

    return () => controller.abort();
  }, [pageNum]);

  return { isLoading, isError, error, results, hasNextPage };
};

export default useImages;
