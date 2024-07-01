import { FC } from "react";
import { IoIosArrowBack, IoIosMenu } from "react-icons/io";
import { GoHome } from "react-icons/go";
import { useNavigate } from "react-router-dom";
import cn from "../../utils/cn";

interface IProps {
  title?: string;
  isBack?: boolean;
  path?: string;
  back?: boolean;
  bgdark?: boolean;
  white?: boolean;
}

export const TopBar: FC<IProps> = ({
  title = "",
  isBack = true,
  path = "/",
  back,
  bgdark = false,
  white = false,
}) => {
  const navigate = useNavigate();

  return (
    <div
      className={cn(
        "relative flex justify-between items-center px-5 w-iPhone h-12 bg-hanaBgGray",
        bgdark ? "!bg-dark" : "",
      )}
    >
      {isBack && (
        <div
          onClick={() => (!back ? navigate(path) : navigate(-1))}
          className="cursor-pointer z-10"
        >
          <IoIosArrowBack size={18} color={white ? "#ffffff" : "#000000"} />
        </div>
      )}

      <div className="absolute left-0 flex w-full justify-center items-center text-lg font-bold">
        {title}
      </div>
      <div className="flex gap-2">
        <div className="cursor-pointer z-10" onClick={() => navigate("/")}>
          <GoHome size={20} color={white ? "#ffffff" : "#000000"} />
        </div>
        <IoIosMenu size={20} color={white ? "#ffffff" : "#000000"} />
      </div>
    </div>
  );
};
