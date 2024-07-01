import { TopBar } from "../../components/common/TopBar";
import { FaO, FaXmark } from "react-icons/fa6";
import { Button } from "../../components/common/Button";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { ApiClient } from "../../apis/apiClient";

export const Quiz = () => {
  const navigate = useNavigate();
  const [isAnswer, setIsAnswer] = useState<boolean>(false);
  const [, setLoading] = useState<boolean>(false);
  const [quiz, setQuiz] = useState<QuizType>();
  const [quizAnswer, setQuizAnswer] = useState<QuizAnswerType>();

  useEffect(() => {
    const getQuiz = async () => {
      try {
        setLoading(true);
        const res = await ApiClient.getInstance().getQuiz();
        console.log(res);
        if (res.data) {
          setQuiz(res.data);
        }
      } catch (error) {
      } finally {
        setLoading(false);
      }
    };

    getQuiz();
  }, []);

  const clickAnswer = (answer: boolean) => {
    setIsAnswer(true);
    const postQuizAnswer = async () => {
      try {
        setLoading(true);
        const res = await ApiClient.getInstance().postQuizAnswer({
          quizIdx: quiz!.quizIdx,
          answer: answer,
        });
        console.log(res);
        if (res.data) {
          setQuizAnswer(res.data);
        }
      } catch (error) {
      } finally {
        setLoading(false);
      }
    };

    postQuizAnswer();
  };

  return (
    <>
      <TopBar title="금융퀴즈" back />
      <div className="flex min-h-full justify-center items-center p-8">
        {!isAnswer && quiz ? (
          <div className="bg-white rounded-xl mb-10 px-5 py-8 flex flex-col gap-3">
            <p className="text-hanaGreen">금융 퀴즈</p>
            <div className="text-xl font-bold">{quiz?.quizContent}</div>
            <div className="flex gap-3 justify-center mt-4">
              <Button
                className="!rounded-xl !px-12 !bg-blue-500"
                onClick={() => clickAnswer(true)}
              >
                <FaO size={26} />
              </Button>
              <Button
                className="!rounded-xl !px-12 bg-red-500"
                onClick={() => clickAnswer(false)}
              >
                <FaXmark size={26} />
              </Button>
            </div>
          </div>
        ) : (
          quizAnswer && (
            <div className="flex flex-col gap-5 w-full items-center animate-zoomIn2">
              <div className="text-center font-bold text-2xl">
                {quizAnswer?.isCorrect ? (
                  <>
                    정답이에요! <br /> {quizAnswer.point}P를 받았어요!
                  </>
                ) : (
                  <>
                    앗! 아쉬워요 <br /> 정답을 맞히지 못했어요
                  </>
                )}
              </div>
              <div className="bg-white rounded-xl mb-10 px-5 py-8 flex flex-col gap-3">
                <p className="text-hanaGreen">금융 퀴즈</p>
                <div className="text-xl font-bold">{quiz?.quizContent}</div>
                <div className="text-sm text-hanaGray2">
                  {quizAnswer?.explanation}
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
          )
        )}
      </div>
    </>
  );
};
