import { FC } from "react";
import { IoIosArrowBack, IoIosMenu } from "react-icons/io";
import { GoHome } from "react-icons/go";

interface IProps {
  title?: string;
  isBack?: boolean;
}

export const TopBar: FC<IProps> = ({ title = "", isBack = true }) => {
  return (
    <div className="sticky top-0 flex justify-between items-center px-5 w-iPhone h-12 ">
      {isBack && (
        <div>
          <IoIosArrowBack size={15} />
        </div>
      )}

      <div className="absolute flex w-full justify-center text-xl font-bold">
        {title}
      </div>
      <div className="flex gap-2">
        <GoHome size={20} />
        <IoIosMenu size={20} />
      </div>
    </div>
  );
};
