/* import { useCallback, useEffect, useState } from "react";

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
  // 관찰할 요소입니다. 스크롤 최하단 div요소에 setTarget을 ref로 넣어 사용할 것입니다.
  const [target, setTarget] = useState<HTMLDivElement | null | undefined>(null);

  const observerCallback: IntersectionObserverCallback = useCallback(
    (entries) => {
      entries.forEach((entry) => {
        // target이 화면에 관찰되고, 다음페이지가 있다면 다음페이지를 호출
        if (entry.isIntersecting && hasNextPage) {
          fetchNextPage();
        }
      });
    },
    [hasNextPage, fetchNextPage],
  );

  useEffect(() => {
    if (!target) return;

    // ointersection observer 인스턴스 생성
    const observer = new IntersectionObserver(observerCallback, {
      threshold,
    });

    // 타겟 관찰 시작
    observer.observe(target);

    // 관찰 멈춤
    return () => observer.unobserve(target);
  }, [observerCallback, threshold, target]);

  return { setTarget };
}; */
import { useCallback, useEffect, useState } from "react";

import { InfiniteQueryObserverResult } from "@tanstack/react-query";

interface useInfiniteScrollProps {
  hasNextPage: boolean | undefined;
  fetchNextPage: () => Promise<InfiniteQueryObserverResult>;
}

export const useInfiniteScroll = ({
  hasNextPage, // 다음 페이지 여부
  fetchNextPage, // 다음페이지 데이터 가져오기
}: useInfiniteScrollProps) => {
  const [isFetching, setIsFetching] = useState(false); // 데이터 가져오는지 여부

  const handleScroll = useCallback(() => {
    const { scrollTop, scrollHeight, clientHeight } = document.documentElement;

    if (
      scrollHeight - scrollTop <= clientHeight * 1.2 &&
      hasNextPage &&
      !isFetching
    ) {
      setIsFetching(true);
      fetchNextPage().finally(() => setIsFetching(false));
    }
  }, [hasNextPage, fetchNextPage, isFetching]);

  useEffect(() => {
    window.addEventListener("scroll", handleScroll);
    return () => {
      window.removeEventListener("scroll", handleScroll);
    };
  }, [handleScroll]);

  return {};
};
