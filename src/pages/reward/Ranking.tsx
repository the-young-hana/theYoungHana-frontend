import { useEffect, useRef, useState } from "react";
import ApiClient from "../../apis/apiClient";
import cn from "../../utils/cn";
import { getCookie } from "../../utils/cookie";
import { TopBar } from "../../components/common/TopBar";
import useInfiniteScroll from "../../hooks/useInfiniteScroll";

export default function Ranking() {
  const deptIdx = getCookie("deptIdx");
  const [, setLoading] = useState<boolean>(false);
  const [ranking, setRanking] = useState<RankingType[]>([]);
  const observer = useRef<IntersectionObserver | null>(null);

  const { lastStoryElementRef, page, setPage } = useInfiniteScroll({
    observer,
  });

  const getRanking = async () => {
    try {
      setLoading(true);
      const res = await ApiClient.getInstance().getRanking(page.page);
      if (res.data) {
        if (page.page === 1) setRanking(res.data);
        else setRanking((prevList) => [...prevList, ...(res.data || [])]);
        setPage((prev) => ({ ...prev, hasMore: res.data?.length! >= 10 }));
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getRanking();
  }, [page.page]);

  return (
    <>
      <TopBar title="랭킹" back />
      <div className="w-full flex flex-col items-center justify-center gap-4 p-8 mt-8">
        {ranking && (
          <>
            <img src="/images/reward_trophy.svg" className="" />
            {ranking.map((rank, index) => (
              <div
                key={index}
                className={cn(
                  "w-full flex justify-between items-center bg-white border rounded-2xl px-4 py-3 font-bold text-lg",
                  rank.deptIdx === deptIdx
                    ? "border-4 border-[#f3508c] !bg-[#FBF1F5]"
                    : "",
                )}
                ref={ranking.length === index + 1 ? lastStoryElementRef : null}
              >
                <div className="relative">
                  <img
                    src={`/images/rank${index + 1 > 4 ? 4 : index + 1}.svg`}
                  />
                  <p
                    className={cn(
                      "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
                      index === 0
                        ? "text-orange-600"
                        : index === 1
                          ? "text-gray-700"
                          : index === 2
                            ? "text-amber-700"
                            : "",
                    )}
                  >
                    {index + 1}
                  </p>
                </div>
                <div className="text-center">{rank.deptName}</div>
                <div>{rank.deptReward}P</div>
              </div>
            ))}
          </>
        )}
      </div>
    </>
  );
}
