import { Link, useNavigate } from "react-router-dom";
import { NavigationBar } from "../../components/common/NavigationBar";
import { TopBar } from "../../components/common/TopBar";

export const Reward = () => {
  const navigate = useNavigate();

  return (
    <>
      <TopBar title="리워드" />
      <div className="bg-white min-h-bottom-screen mt-12 mb-[107px] flex flex-col gap-5 items-center p-8">
        <div className="w-full border flex flex-col justify-center items-center px-2 pt-5 rounded-2xl bg-gradient-to-b from-[#C8FFA7] to-[#FEFFC7] drop-shadow-base">
          <p className="text-center mb-1 font-semibold text-xl">
            7월 1주차 <br />
            학과 리워드 랭킹
          </p>
          <Link to="/reward/ranking">
            <p className="underline text-hanaGray2 text-sm">바로가기</p>
          </Link>

          <img src="/images/reward_main.png" alt="" />
        </div>
        <div className="w-full flex justify-between items-center font-bold pl-2 pr-3 py-1 rounded-2xl bg-gradient-to-b to-[#FEFFD0] from-[#FBE77E] drop-shadow-base">
          <img src="/images/health.png" />
          <div className="text-lg">내 기여도</div>
          <div className="text-lg">
            502p/<span className="text-gray-500 text-sm">902p</span>
          </div>
        </div>
        <div className="w-full flex justify-between gap-4 font-extrabold text-gray-600 text-xl">
          <div
            className="w-full flex flex-col rounded-xl border p-4 cursor-pointer"
            onClick={() => navigate("/reward/gift")}
          >
            선물 상자 <br /> 열기
            <div className="flex w-full justify-end">
              <img src="/images/reward_gift.svg" className="w-20 -mt-3 " />
            </div>
          </div>
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
      <NavigationBar />
    </>
  );
};
