import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import ApiClient from "../../apis/apiClient";
import cn from "../../utils/cn";
import useImagePreloader from "../../hooks/useImagePreloader";
import { NavigationBar } from "../../components/common/NavigationBar";
import { TopBar } from "../../components/common/TopBar";
import { Loading } from "../../components/common/Loading";

const arrImg = [
  "/images/reward_main.png",
  "/images/health.png",
  "/images/stamp.svg",
  "/images/reward_gift.svg",
  "/images/reward_quiz.svg",
];
export default function Reward() {
  const navigate = useNavigate();
  const [, setLoading] = useState<boolean>(false);
  const [reward, setReward] = useState<RewardsType>();
  const imagesLoaded = useImagePreloader(arrImg);
  const [animation, setAnimation] = useState<number>(0);

  useEffect(() => {
    const timerId = setInterval(() => {
      setAnimation((prev) => prev + 1);
    }, 400);
    const timeoutId = setTimeout(() => {
      clearInterval(timerId);
    }, 3000);
    return () => {
      clearInterval(timerId);
      clearTimeout(timeoutId);
    };
  }, []);

  const getRewards = async () => {
    try {
      setLoading(true);
      const res = await ApiClient.getInstance().getRewards();
      if (res.data) {
        setReward(res.data);
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getRewards();
  }, []);

  return (
    <>
      <TopBar title="리워드" />
      <div className="bg-white min-h-bottom-screen mt-12 mb-[107px] flex flex-col gap-5 items-center p-8">
        {reward && imagesLoaded ? (
          <div className="flex flex-col gap-5">
            <div
              className={cn(
                "w-full border flex flex-col justify-center items-center px-2 pt-5 rounded-2xl bg-gradient-to-b from-[#C8FFA7] to-[#FEFFC7] drop-shadow-base animate-slideinup1",
                animation <= 1 ? "opacity-0" : "opacity-1",
              )}
            >
              <p className="text-center mb-1 font-semibold text-xl">
                7월 1주차 <br />
                학과 리워드 랭킹
              </p>
              <Link to="/reward/ranking">
                <p className="underline text-hanaGray2 text-sm">바로가기</p>
              </Link>

              <img src="/images/reward_main.png" alt="" />
            </div>
            <div
              className={cn(
                "w-full flex justify-between items-center font-bold pl-2 pr-3 py-1 rounded-2xl bg-gradient-to-b to-[#FEFFD0] from-[#FBE77E] drop-shadow-base animate-slideinup2",
                animation <= 2 ? "opacity-0" : "opacity-1",
              )}
            >
              <img src="/images/health.png" />
              <div className="text-lg">내 기여도</div>
              <div className="text-lg">
                {reward.myPoint}p/
                <span className="text-gray-500 text-sm">
                  {reward.deptPoint}p
                </span>
              </div>
            </div>
            <div
              className={cn(
                "w-full flex justify-between gap-4 font-extrabold text-gray-600 text-xl animate-slideinup3",
                animation <= 3 ? "opacity-0" : "opacity-1",
              )}
            >
              <div className="relative w-1/2">
                {reward.hasParticipatedInPresent && (
                  <div className="absolute bg-white bg-opacity-60 w-full h-full">
                    <img
                      src="/images/stamp.svg"
                      className="absolute w-30 h-30 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                    />
                  </div>
                )}
                <div
                  className="w-full flex flex-col rounded-xl border p-4 cursor-pointer"
                  onClick={() => navigate("/reward/gift")}
                >
                  선물 상자 <br /> 열기
                  <div className="flex w-full justify-end">
                    <img
                      src="/images/reward_gift.svg"
                      className="w-20 -mt-3 "
                    />
                  </div>
                </div>
              </div>
              <div className="relative w-1/2">
                {reward.hasParticipatedInQuiz && (
                  <div className="absolute bg-white bg-opacity-60 w-full h-full">
                    <img
                      src="/images/stamp.svg"
                      className="absolute w-30 h-30 top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2"
                    />
                  </div>
                )}
                <div
                  className="w-full flex flex-col rounded-xl border p-4 cursor-pointer"
                  onClick={() => navigate("/reward/quiz")}
                >
                  금융 퀴즈 <br /> 풀기
                  <div className="flex w-full justify-end">
                    <img src="/images/reward_quiz.svg" className="w-20 -mt-1" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        ) : (
          <Loading show={true} back={false} />
        )}
      </div>
      <NavigationBar />
    </>
  );
}
