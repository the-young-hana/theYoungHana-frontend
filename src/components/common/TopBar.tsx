import { FC } from "react";
import { IoIosArrowBack, IoIosMenu } from "react-icons/io";
import { GoHome } from "react-icons/go";
import { Link, useNavigate } from "react-router-dom";
import cn from "../../utils/cn";

interface IProps {
  title?: string;
  isBack?: boolean;
  path?: string;
  bgdark?: boolean;
  white?: boolean;
}

export const TopBar: FC<IProps> = ({
  title = "",
  isBack = true,
  path = "/",
  bgdark = false,
  white = false,
}) => {
  const navigate = useNavigate();

  return (
    <div
      className={cn(
        "absolute left-0 top-12 flex justify-between items-center px-5 w-iPhone h-12",
        bgdark ? "bg-dark" : "",
      )}
    >
      {isBack && (
        <div onClick={() => navigate(path)} className="cursor-pointer z-10">
          <IoIosArrowBack size={25} color={white ? "#ffffff" : "#000000"} />
        </div>
      )}

      <div className="absolute left-0 flex w-full justify-center items-center text-lg font-bold">
        {title}
      </div>
      <div className="flex gap-2">
        <Link to="/">
          <GoHome size={28} color={white ? "#ffffff" : "#000000"} />
        </Link>
        <IoIosMenu size={28} color={white ? "#ffffff" : "#000000"} />
      </div>
    </div>
  );
};
