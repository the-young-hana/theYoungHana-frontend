import { Dispatch, FC, SetStateAction } from "react";
import cn from "../../utils/cn";

interface IProps {
  end: boolean;
  setEnd: Dispatch<SetStateAction<boolean>>;
}

export const EventBar: FC<IProps> = ({ end, setEnd }) => {
  const handleEnd = (type: string) => {
    type === "진행중" ? setEnd(false) : setEnd(true);
  };

  return (
    <div className="flex w-full justify-around py-2 bg-hanaBgGray">
      <div
        className={cn(
          !end
            ? "font-bold border-b-[3px] text-hanaGreen border-hanaGreen"
            : "",
          "cursor-pointer",
        )}
        onClick={() => handleEnd("진행중")}
      >
        진행중
      </div>
      <div
        className={cn(
          end ? "font-bold border-b-[3px] text-hanaGreen border-hanaGreen" : "",
          "cursor-pointer",
        )}
        onClick={() => handleEnd("종료")}
      >
        종료
      </div>
    </div>
  );
};
