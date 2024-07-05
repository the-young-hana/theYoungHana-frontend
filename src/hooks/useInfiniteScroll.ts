import { useCallback, useState } from "react";

const useInfiniteScroll = ({
  observer,
  lastIndex = false,
}: {
  observer: React.MutableRefObject<IntersectionObserver | null>;
  lastIndex?: boolean;
}) => {
  const [page, setPage] = useState({
    page: lastIndex ? 0 : 1,
    hasMore: true,
  });

  const lastStoryElementRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && page.hasMore) {
          setPage((prev) => ({
            ...prev,
            page: lastIndex ? prev.page + 10 : prev.page + 1,
          }));
        }
      });
      if (node) observer.current.observe(node);
    },
    [page.hasMore],
  );

  return { page, setPage, lastStoryElementRef };
};

export default useInfiniteScroll;
