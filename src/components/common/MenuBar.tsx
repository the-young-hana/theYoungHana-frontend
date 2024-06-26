import { Dispatch, FC, SetStateAction } from "react";
import cn from "../../utils/cn";

interface IProps {
  menu1: string;
  menu2: string;
  one: boolean;
  setOne: Dispatch<SetStateAction<boolean>>;
}

export const MenuBar: FC<IProps> = ({ menu1, menu2, one, setOne }) => {
  const handleEnd = (type: number) => {
    type === 1 ? setOne(true) : setOne(false);
  };

  return (
    <div className="absolute top-24 flex w-full justify-around pt-2 bg-hanaBgGray border-b border-hanaGray2">
      <div
        className={cn(
          one ? "font-bold border-b-[3px] text-hanaGreen border-hanaGreen" : "",
          "cursor-pointer",
        )}
        onClick={() => handleEnd(1)}
      >
        {menu1}
      </div>
      <div
        className={cn(
          !one
            ? "font-bold border-b-[3px] text-hanaGreen border-hanaGreen"
            : "",
          "cursor-pointer",
        )}
        onClick={() => handleEnd(2)}
      >
        {menu2}
      </div>
    </div>
  );
};
