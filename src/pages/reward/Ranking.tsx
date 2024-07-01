import { TopBar } from "../../components/common/TopBar";
import cn from "../../utils/cn";

const rank = [
  {
    deptIdx: 0,
    deptName: "IT미디어공학과",
    deptRank: 1,
    deptPoints: 2750,
  },
  {
    deptIdx: 1,
    deptName: "경영학과",
    deptRank: 2,
    deptPoints: 1590,
  },
  {
    deptIdx: 2,
    deptName: "컴퓨터공학과",
    deptRank: 3,
    deptPoints: 1467,
  },
  {
    deptIdx: 3,
    deptName: "심리학과",
    deptRank: 4,
    deptPoints: 1000,
  },
  {
    deptIdx: 4,
    deptName: "문헌정보학과",
    deptRank: 5,
    deptPoints: 890,
  },
  {
    deptIdx: 5,
    deptName: "아동가족학과",
    deptRank: 6,
    deptPoints: 666,
  },
];

export const Ranking = () => {
  const deptId = 1;

  return (
    <>
      <TopBar title="랭킹" back />
      <div className="w-full flex flex-col items-center justify-center gap-4 p-8 mt-8">
        <img src="/images/reward_trophy.svg" className="" />
        {rank.map((ranking) => (
          <div
            key={ranking.deptIdx}
            className={cn(
              "w-full flex justify-between items-center bg-white rounded-2xl px-4 py-3 font-bold text-lg",
              ranking.deptIdx === deptId
                ? "border-4 border-pink-400 bg-pink-50"
                : "",
            )}
          >
            <div className="relative">
              <img
                src={`/images/rank${ranking.deptRank > 4 ? 4 : ranking.deptRank}.svg`}
              />
              <p
                className={cn(
                  "absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2",
                  ranking.deptRank === 1
                    ? "text-orange-600"
                    : ranking.deptRank === 2
                      ? "text-gray-700"
                      : ranking.deptRank === 3
                        ? "text-amber-700"
                        : "",
                )}
              >
                {ranking.deptRank}
              </p>
            </div>
            <div className="text-center">{ranking.deptName}</div>
            <div>{ranking.deptPoints}P</div>
          </div>
        ))}
      </div>
    </>
  );
};
