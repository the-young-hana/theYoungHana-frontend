import { TopBar } from "../../components/common/TopBar";
import { FaO, FaXmark } from "react-icons/fa6";
import { Button } from "../../components/common/Button";
import { useState } from "react";
import { useNavigate } from "react-router-dom";

export const Quiz = () => {
  const navigate = useNavigate();
  const [isAnswer, setIsAnswer] = useState<boolean>(false);

  const clickAnswer = () => {
    setIsAnswer(true);
  };

  return (
    <>
      <TopBar title="금융퀴즈" back />
      <div className="flex min-h-full justify-center items-center p-8">
        {!isAnswer ? (
          <div className="bg-white rounded-xl mb-10 px-5 py-8 flex flex-col gap-3">
            <p className="text-hanaGreen">금융 퀴즈</p>
            <div className="text-xl font-bold">
              신용카드가 없으면 신용평가에 불리할 수 있다?
            </div>
            <div className="flex gap-3 justify-center mt-4">
              <Button
                className="!rounded-xl !px-12 !bg-blue-500"
                onClick={clickAnswer}
              >
                <FaO size={26} />
              </Button>
              <Button
                className="!rounded-xl !px-12 bg-red-500"
                onClick={clickAnswer}
              >
                <FaXmark size={26} />
              </Button>
            </div>
          </div>
        ) : (
          <div className="flex flex-col gap-5 w-full items-center">
            <div className="text-center font-bold text-2xl">
              정답이에요!
              <br />
              5P를 받았어요!
            </div>
            <div className="bg-white rounded-xl mb-10 px-5 py-8 flex flex-col gap-3">
              <p className="text-hanaGreen">금융 퀴즈</p>
              <div className="text-xl font-bold">
                해외에서 사용한 신용카드 내역은 신용점수에 영향을 끼치지 않는다?
              </div>
              <div className="text-sm text-hanaGray2">
                아니에요! 해외에서 사용한 신용카드 내역도 신용평가에 반영돼요.
              </div>
            </div>
            <Button
              gray
              className="rounded-xl font-bold text-lg !px-10"
              onClick={() => navigate("/reward")}
            >
              닫기
            </Button>
          </div>
        )}
      </div>
    </>
  );
};
