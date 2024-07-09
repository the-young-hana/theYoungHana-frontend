import { useCallback, useState } from "react";

const useInfiniteScroll = ({
  observer,
  isOffset = true,
  lastIndex = 0,
}: {
  observer: React.MutableRefObject<IntersectionObserver | null>;
  isOffset?: boolean;
  lastIndex?: number;
}) => {
  const [page, setPage] = useState({
    page: isOffset ? 1 : 0,
    hasMore: true,
  });

  const lastStoryElementRef = useCallback(
    (node: HTMLDivElement | HTMLLIElement | null) => {
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && page.hasMore) {
          setPage((prev) => ({
            ...prev,
            page: isOffset ? prev.page + 1 : lastIndex,
          }));
        }
      });
      if (node) observer.current.observe(node);
    },
    [page.hasMore, lastIndex],
  );

  return { page, setPage, lastStoryElementRef };
};

export default useInfiniteScroll;
