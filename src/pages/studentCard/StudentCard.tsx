import { useEffect, useState } from "react";
import { AiOutlineThunderbolt } from "react-icons/ai";
import { GrPowerReset } from "react-icons/gr";
import { FiSearch } from "react-icons/fi";
import cn from "../../utils/cn";
import { getCookie, setCookie } from "../../utils/cookie";
import ApiClient from "../../apis/apiClient";
import { NavigationBar } from "../../components/common/NavigationBar";
import { TopBar } from "../../components/common/TopBar";
import "./StudentCard.css"; // 추가된 CSS 파일
import { useNavigate } from "react-router-dom";

const ACCESS_TOKEN = getCookie("accessToken");

export default function StudentCard() {
  const navigate = useNavigate();

  const SECONDS = 30000;
  const INTERVAL = 1000;
  const [isFlipped, setIsFlipped] = useState<boolean>(false);
  const [timeLeft, setTimeLeft] = useState<number>(SECONDS);
  const [isRefresh, setIsRefresh] = useState<boolean>(false);
  const [, setLoading] = useState<boolean>(false);
  const [studentCard, setStudentCard] = useState<StudentCardType>();
  const [studentQR, setStudentQR] = useState<{ qrImage: string }>();

  const second = String(Math.floor((timeLeft / 1000) % 60)).padStart(2, "0");

  const getStudentCard = async () => {
    try {
      setLoading(true);
      const res = await ApiClient.getInstance().getStudentCard();
      if (res.data) {
        setStudentCard(res.data);
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  const getStudentQR = async () => {
    try {
      setLoading(true);
      const res = await ApiClient.getInstance().getStudentQR();
      if (res.data) {
        setStudentQR(res.data);
      }
    } catch (error) {
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    getStudentCard();
    getStudentQR();
  }, []);

  const handleCardClick = () => {
    setIsFlipped((prev) => !prev);
  };

  const handleRefreshClick = (event: React.MouseEvent) => {
    event.stopPropagation();
    setIsRefresh((prev) => !prev);
    console.log("새로고침");
  };

  useEffect(() => {
    setTimeLeft(SECONDS);
  }, [isFlipped, isRefresh]);

  useEffect(() => {
    const timer = setInterval(() => {
      setTimeLeft((prevTime) => prevTime - INTERVAL);
    }, INTERVAL);
    if (timeLeft <= 0 || !isFlipped) {
      clearInterval(timer);
      setIsRefresh((prev) => !prev);
    }
    return () => clearInterval(timer);
  }, [isFlipped, timeLeft]);

  return (
    <>
      <TopBar title="더영하나" />
      <div className="flex flex-col justify-between items-center pt-2 min-h-bottom-screen  mt-12 mb-[107px]">
        <div className="flex justify-between items-center px-5 w-full">
          <img src="/images/logo.png" className="h-10" />
          <div className="flex gap-2 items-center">
            <div className="flex items-center gap-0.5">
              <FiSearch size={20} />
              <p>조회</p>
            </div>
            <div className="flex items-center gap-0.5">
              <AiOutlineThunderbolt size={20} />
              <p>이체</p>
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center">
          <div
            className={`card-container ${isFlipped ? "flipped" : ""}`}
            onClick={handleCardClick}
          >
            <div className="card relative">
              <div className="card-front flex flex-col items-center">
                <img
                  src={studentCard?.studentCardFrontImage}
                  className={cn(studentCard?.isVertical ? "w-60" : "")}
                />
                <p className="font-bold mt-1">터치해서 QR보기</p>
              </div>
              <div className="card-back flex flex-col items-center">
                <div
                  className={cn(
                    "absolute left-0 px-10 flex ",
                    studentCard?.isVertical
                      ? "flex-col items-center left-[50px] gap-5"
                      : "w-full justify-between items-end ",
                  )}
                >
                  <div>
                    <img src={studentQR?.qrImage} className="w-24" />
                    <p className="text-white text-[12px] flex items-center mt-1">
                      {second}초 남았습니다{" "}
                      <GrPowerReset
                        size={15}
                        className=""
                        onClick={(e) => handleRefreshClick(e)}
                      />
                    </p>
                  </div>
                  <div
                    className={cn(
                      studentCard?.isVertical ? "text-center" : "text-end",
                      "text-white",
                    )}
                  >
                    <p>
                      {studentCard?.studentName}({studentCard?.studentId})
                    </p>
                    <p>{studentCard?.studentDept}</p>
                  </div>
                </div>
                <img
                  src={studentCard?.studentCardBackImage}
                  className={cn(studentCard?.isVertical ? "w-60" : "")}
                />
                <p className="font-bold mt-2">터치해서 카드보기</p>
              </div>
            </div>
          </div>
        </div>

        <img src={studentCard?.studentCollegeImage} className="h-12 mb-4" />
        <NavigationBar />
      </div>
    </>
  );
}
