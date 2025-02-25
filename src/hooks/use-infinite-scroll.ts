import { useCallback, useEffect, useRef } from "react";

import { InfiniteQueryObserverResult } from "@tanstack/react-query";

interface useIntersectionObserverProps {
  threshold?: number;
  hasNextPage: boolean | undefined;
  fetchNextPage: () => Promise<InfiniteQueryObserverResult>;
}

export const useInfiniteScroll = ({
  threshold = 0.1,
  hasNextPage,
  fetchNextPage,
}: useIntersectionObserverProps) => {
  const ref = useRef<HTMLDivElement>(null);

  const observerCallback: IntersectionObserverCallback = useCallback(
    (entries) => {
      entries.forEach((entry) => {
        // eslint-disable-next-line no-console
        console.log(111);
        if (entry.isIntersecting && hasNextPage) fetchNextPage();
      });
    },
    [hasNextPage, fetchNextPage],
  );

  useEffect(() => {
    if (!ref.current) return;
    const observer = new IntersectionObserver(observerCallback, {
      threshold,
    });
    observer.observe(ref.current);
    return () => observer.disconnect();
  }, [observerCallback, threshold]);

  return { ref };
};
