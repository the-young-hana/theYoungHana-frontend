import { FC } from "react";
import { IoIosArrowBack, IoIosMenu } from "react-icons/io";
import { GoHome } from "react-icons/go";
import { useNavigate } from "react-router-dom";

interface IProps {
  title?: string;
  isBack?: boolean;
  path?: string;
  back?: boolean;
}

export const TopBar: FC<IProps> = ({
  title = "",
  isBack = true,
  path = "/",
  back,
}) => {
  const navigate = useNavigate();

  return (
    <div className="absolute left-0 top-12 flex justify-between items-center px-5 w-iPhone h-12 bg-hanaBgGray">
      {isBack && (
        <div
          onClick={() => (!back ? navigate(path) : navigate(-1))}
          className="cursor-pointer z-10"
        >
          <IoIosArrowBack size={18} />
        </div>
      )}

      <div className="absolute left-0 flex w-full justify-center items-center text-lg font-bold">
        {title}
      </div>
      <div className="flex gap-2">
        <GoHome size={20} />
        <IoIosMenu size={20} />
      </div>
    </div>
  );
};
