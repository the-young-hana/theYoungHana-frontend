import { FaIdCard, FaBullhorn } from "react-icons/fa";
import { IoBookmarks } from "react-icons/io5";
import { FaCircleDollarToSlot } from "react-icons/fa6";
import { PiPiggyBankFill } from "react-icons/pi";
import cn from "../../utils/cn";
import { Link, useLocation } from "react-router-dom";

export const NavigationBar = () => {
  const location = useLocation();
  return (
    <div className="sticky bottom-0 flex w-iPhone justify-around bg-white">
      <Link to="/studentCard">
        <div
          className={cn(
            "flex flex-col gap-1 justify-center items-center font-semibold ",
            location.pathname.includes("student")
              ? " text-hanaGreen"
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
            "flex flex-col gap-1 justify-center items-center font-semibold ",
            location.pathname.includes("event")
              ? " text-hanaGreen"
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
            "flex flex-col gap-1 justify-center items-center font-semibold ",
            location.pathname.includes("story")
              ? " text-hanaGreen"
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
            "flex flex-col gap-1 justify-center items-center font-semibold ",
            location.pathname.includes("reward")
              ? " text-hanaGreen"
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
            "flex flex-col gap-1 justify-center items-center font-semibold ",
            location.pathname.includes("knowledge")
              ? " text-hanaGreen"
              : " text-dark",
          )}
        >
          <PiPiggyBankFill size={25} />
          금융상식
        </div>
      </Link>
    </div>
  );
};
