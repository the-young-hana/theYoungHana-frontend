import { FaIdCard, FaBullhorn } from "react-icons/fa";
import { IoBookmarks } from "react-icons/io5";
import { FaCircleDollarToSlot } from "react-icons/fa6";
import { PiPiggyBankFill } from "react-icons/pi";
import cn from "../../utils/cn";
import { Link, useLocation } from "react-router-dom";

export const NavigationBar = () => {
  const location = useLocation();
  return (
    <div className="absolute left-0 bottom-0 ">
      <div className="flex w-iPhone justify-between bg-white px-5 pb-9 pt-5 -2xl border border-t">
        <Link to="/studentCard">
          <div
            className={cn(
              "flex flex-col gap-1 justify-center items-center font-semibold text-sm",
              location.pathname.includes("student")
                ? " text-hanaGreen scale-110"
                : " text-dark",
            )}
          >
            <FaIdCard size={25} />
            학생증
          </div>
        </Link>
        <Link to="/event">
          <div
            className={cn(
              "flex flex-col gap-1 justify-center items-center font-semibold text-sm",
              location.pathname.includes("event")
                ? " text-hanaGreen scale-110"
                : " text-dark",
            )}
          >
            <FaBullhorn size={25} />
            이벤트
          </div>
        </Link>
        <Link to="/story">
          <div
            className={cn(
              "flex flex-col gap-1 justify-center items-center font-semibold text-sm",
              location.pathname.includes("story")
                ? " text-hanaGreen scale-110"
                : " text-dark",
            )}
          >
            <IoBookmarks size={25} />
            스토리
          </div>
        </Link>
        <Link to="/reward">
          <div
            className={cn(
              "flex flex-col gap-1 justify-center items-center font-semibold text-sm",
              location.pathname.includes("reward")
                ? " text-hanaGreen scale-110"
                : " text-dark",
            )}
          >
            <FaCircleDollarToSlot size={25} />
            리워드
          </div>
        </Link>
        <Link to="/knowledge">
          <div
            className={cn(
              "flex flex-col gap-1 justify-center items-center font-semibold text-sm",
              location.pathname.includes("knowledge")
                ? " text-hanaGreen scale-110"
                : " text-dark",
            )}
          >
            <PiPiggyBankFill size={25} />
            금융상식
          </div>
        </Link>
      </div>
    </div>
  );
};
