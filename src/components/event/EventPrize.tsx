import { useContext, useRef } from "react";
import { EventContext } from "../../context/EventContext";
import { Button } from "../common/Button";
import { FiPlus } from "react-icons/fi";
import { IoIosClose } from "react-icons/io";
import cn from "../../utils/cn";

export default function EventPrize() {
  const { event, setEvent } = useContext(EventContext);
  const prizeRef = useRef<HTMLInputElement[]>([]);
  const winnumRef = useRef<HTMLInputElement[]>([]);

  /// 상품 추가
  const addInput = () => {
    setEvent((prevEvent) => ({
      ...prevEvent,
      eventPrizeList: [
        ...prevEvent.eventPrizeList,
        { prizeRank: 0, prizeName: "", prizeLimit: 0 },
      ],
    }));
  };

  // 상품 삭제
  const popWinning = (index: number) => {
    setEvent((prevEvent) => ({
      ...prevEvent,
      eventPrizeList: prevEvent.eventPrizeList.filter(
        (_, prizeIndex) => prizeIndex !== index,
      ),
    }));
  };

  //상품 수정
  const modifyWinning = (index: number, type: string) => {
    const updatedEventPrizeList = [...event.eventPrizeList];
    if (type === "prize") {
      updatedEventPrizeList[index].prizeName = prizeRef.current[index].value;
    } else if (type === "num") {
      updatedEventPrizeList[index].prizeLimit = parseInt(
        winnumRef.current[index].value,
        10,
      );
    }
    setEvent((prevEvent) => ({
      ...prevEvent,
      eventPrizeList: updatedEventPrizeList,
    }));
  };

  return (
    <>
      {event.eventPrizeList.map((list, index) => (
        <div
          key={index}
          className="relative flex justify-between items-center text-nowrap border rounded-2xl py-5 px-3 text-center"
        >
          {event.eventPrizeList.length > 1 && (
            <Button
              roundedFull
              className="absolute -top-2 right-0 !p-0 bg-white !text-hanaGray2 border border-hanaGray2"
              onClick={() => popWinning(index)}
            >
              <IoIosClose size={15} />
            </Button>
          )}
          <p className="text-center font-semibold w-10">{index + 1}등</p>
          <input
            type="text"
            placeholder="상품"
            defaultValue={list.prizeName}
            ref={(el) => el && (prizeRef.current[index] = el)}
            onBlur={() => modifyWinning(index, "prize")}
            className="w-28 text-center"
          />
          <div>
            <input
              type="number"
              placeholder={list.prizeLimit.toString()}
              ref={(el) => el && (winnumRef.current[index] = el)}
              onBlur={() => modifyWinning(index, "num")}
              className="w-20 text-center"
            />
            명
          </div>
        </div>
      ))}
      <div className="w-full flex justify-center">
        <Button
          roundedFull
          className={cn(
            "!p-0 bg-white !text-hanaGreen border-2 border-hanaGreen",
          )}
          onClick={addInput}
        >
          <FiPlus size={20} />
        </Button>
      </div>
    </>
  );
}
