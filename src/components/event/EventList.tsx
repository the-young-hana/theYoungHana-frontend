import { FC } from "react";
import cn from "../../utils/cn";
import { useNavigate } from "react-router-dom";

interface IProps {
  eventId: number;
  category: string;
  title: string;
  type: string;
  date: string;
}

export const EventList: FC<IProps> = ({
  eventId,
  category,
  title,
  type,
  date,
}) => {
  const navigate = useNavigate();

  const moveToDetail = () => {
    navigate(`/event/eventDetail/${eventId}`);
  };

  return (
    <div
      className="border-b-2 mx-5 px-3 py-3 cursor-pointer"
      onClick={moveToDetail}
    >
      <div className="flex gap-2 text-nowrap font-semibold">
        <div>[{category}]</div>
        <div className=" text-ellipsis overflow-hidden">{title}</div>
        <div
          className={cn(
            "text-sm text-white px-3 py-0.5 rounded-2xl",
            type === "선착"
              ? "bg-red-400"
              : type === "응모"
                ? "bg-blue-400"
                : type === "신청"
                  ? "bg-green-400"
                  : "",
          )}
        >
          {type}
        </div>
      </div>
      <div className="text-sm text-gray-500">{date}</div>
    </div>
  );
};
