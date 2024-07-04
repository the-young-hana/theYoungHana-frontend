import { useCallback, useState } from "react";

const useInfiniteScroll = ({
  observer,
}: {
  observer: React.MutableRefObject<IntersectionObserver | null>;
}) => {
  const [page, setPage] = useState({
    page: 1,
    hasMore: true,
  });

  const lastStoryElementRef = useCallback(
    (node: HTMLDivElement | null) => {
      if (observer.current) observer.current.disconnect();
      observer.current = new IntersectionObserver((entries) => {
        if (entries[0].isIntersecting && page.hasMore) {
          setPage((prev) => ({ ...prev, page: prev.page + 1 }));
        }
      });
      if (node) observer.current.observe(node);
    },
    [page.hasMore],
  );

  return { page, setPage, lastStoryElementRef };
};

export default useInfiniteScroll;
