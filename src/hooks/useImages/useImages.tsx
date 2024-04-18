import { useState, useEffect, useRef } from "react";
import { getImagesPage } from "../../utils/getImagesPage/getImagesPage";
import { Image } from "../../components/imageCard/ImageCard";

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

    getImagesPage(pageNum, { signal })
      .then((data) => {
        const localIdsSet = new Set();
        const newData = data.filter((d: { id: string }) => {
          return (
            !fetchedIdsRef.current.has(d.id) &&
            !localIdsSet.has(d.id) &&
            localIdsSet.add(d.id)
          );
        });

        newData.forEach((d: { id: string }) => fetchedIdsRef.current.add(d.id));
        setResults((prev) => [...prev, ...newData]);
        setHasNextPage(Boolean(data.length));
        setIsLoading(false);
      })
      .catch((e) => {
        setIsLoading(false);
        if (signal.aborted) return;
        setIsError(true);
        setError({
          message:
            e.name === "AbortError"
              ? "Request was cancelled"
              : e.message || "An unknown error occurred",
        });
      });

    return () => {
      controller.abort();
    };
  }, [pageNum]);

  return { isLoading, isError, error, results, hasNextPage };
};

export default useImages;
