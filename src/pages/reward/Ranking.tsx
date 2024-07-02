import { useEffect, useState } from "react";
import { TopBar } from "../../components/common/TopBar";
import cn from "../../utils/cn";
import { getCookie } from "../../utils/cookie";
import { ApiClient } from "../../apis/apiClient";

export const Ranking = () => {
  const deptIdx = getCookie("deptIdx");
  const [, setLoading] = useState<boolean>(false);
  const [ranking, setRanking] = useState<RankingType[]>();

  const getRanking = async (page: number) => {
    try {
      setLoading(true);
      const res = await ApiClient.getInstance().getRanking(page);
      if (res.data) {
        console.log(res.data);
        setRanking(res.data);
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getRanking(1);
  }, []);

  return (
    <>
      <TopBar title="랭킹" back />
      <div className="w-full flex flex-col items-center justify-center gap-4 p-8 mt-8">
        {ranking && (
          <>
            <img src="/images/reward_trophy.svg" className="" />
            {ranking.map((ranking) => (
              <div
                key={ranking.deptIdx}
                className={cn(
                  "w-full flex justify-between items-center bg-white rounded-2xl px-4 py-3 font-bold text-lg",
                  ranking.deptIdx === deptIdx
                    ? "border-4 border-pink-400 bg-red-50"
                    : "",
                )}
              >
                <div className="relative">
                  <img
                    src={`/images/rank${ranking.rankIdx > 4 ? 4 : ranking.rankIdx}.svg`}
                  />
                  <p
                    className={cn(
                      "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
                      ranking.rankIdx === 1
                        ? "text-orange-600"
                        : ranking.rankIdx === 2
                          ? "text-gray-700"
                          : ranking.rankIdx === 3
                            ? "text-amber-700"
                            : "",
                    )}
                  >
                    {ranking.rankIdx}
                  </p>
                </div>
                <div className="text-center">{ranking.deptName}</div>
                <div>{ranking.deptReward}P</div>
              </div>
            ))}
          </>
        )}
      </div>
    </>
  );
};
