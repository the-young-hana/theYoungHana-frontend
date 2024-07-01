import { FC, useRef, useState } from "react";
import { Button } from "../common/Button";
import { FiPlus } from "react-icons/fi";
import { IoIosClose } from "react-icons/io";
import cn from "../../utils/cn";

import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import {
  MobileDatePicker,
  MobileDateTimePicker,
  MobileDateRangePicker,
  SingleInputDateRangeField,
} from "@mui/x-date-pickers-pro";

interface IProps {
  type: string;
}

export const EventForm: FC<IProps> = ({ type }) => {
  const [winning, setWinning] = useState<string[][]>([["", ""]]);
  const prizeRef = useRef<HTMLInputElement[]>([]);
  const winnumRef = useRef<HTMLInputElement[]>([]);

  const addInput = () => {
    setWinning((winning) => [...winning, ["", ""]]);
  };

  const popWinning = () => {
    setWinning((win) => win.slice(0, -1));
    if (prizeRef.current && winnumRef.current) {
      prizeRef.current[prizeRef.current.length - 1].value =
        winning[winning.length - 1][0];
      winnumRef.current[winnumRef.current.length - 1].value =
        winning[winning.length - 1][1];
    }
  };

  const modifyWinning = (index: number, type: string) => {
    const updatedWinning = [...winning];
    if (type === "prize") {
      updatedWinning[index][0] = prizeRef.current[index].value;
    } else if (type === "num") {
      updatedWinning[index][1] = winnumRef.current[index].value;
    }
    setWinning(updatedWinning);
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between">
        <p className="font-bold">제목</p>
        <input
          type="text"
          placeholder="제목"
          className="text-end font-medium w-52"
        />
      </div>
      <div className="flex justify-between items-center">
        <p className="font-bold">신청 시작</p>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <MobileDateTimePicker
            format="YYYY-MM-DD HH:mm"
            label="신청 시작"
            slotProps={{ textField: { size: "small" } }}
          />
        </LocalizationProvider>
      </div>
      <div className="flex justify-between items-center">
        <p className="font-bold">신청 마감</p>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <MobileDateTimePicker
            format="YYYY-MM-DD HH:mm"
            label="신청 마감"
            slotProps={{ textField: { size: "small" } }}
          />
        </LocalizationProvider>
      </div>
      {type !== "신청" && (
        <div className="flex justify-between items-center">
          <p className="font-bold">발표 날짜</p>
          <LocalizationProvider dateAdapter={AdapterDayjs}>
            <MobileDatePicker
              format="YYYY-MM-DD"
              label="발표 날짜"
              slotProps={{ textField: { size: "small" } }}
            />
          </LocalizationProvider>
        </div>
      )}
      <div className="flex justify-between text-nowrap">
        <p className="font-bold">참가비</p>
        <div>
          <input
            type="number"
            placeholder="0"
            className="text-end font-medium w-52"
          />
          <span>원</span>
        </div>
      </div>
      <div className="flex justify-between items-center">
        <p className="font-bold">입금기간</p>
        <LocalizationProvider dateAdapter={AdapterDayjs}>
          <MobileDateRangePicker
            format="YYYY-MM-DD"
            label="입금 기간"
            slots={{ field: SingleInputDateRangeField }}
            slotProps={{ textField: { size: "small" } }}
          />
        </LocalizationProvider>
      </div>
      {type === "응모" && (
        <>
          <p className="font-bold">당첨 인원 및 상품</p>
          {winning.map(([prize, num], index) => (
            <div
              key={index}
              className="relative flex justify-between items-center text-nowrap border rounded-2xl py-5 px-3 text-center"
            >
              {winning.length > 1 && (
                <Button
                  roundedFull
                  className="absolute -top-2 right-0 !p-0 bg-white !text-hanaGray2 border border-hanaGray2"
                  onClick={popWinning}
                >
                  <IoIosClose size={15} />
                </Button>
              )}
              <p className="text-center font-semibold w-10">{index + 1}등</p>
              <input
                type="text"
                placeholder="상품"
                defaultValue={prize}
                ref={(el) => el && (prizeRef.current[index] = el)}
                onBlur={() => modifyWinning(index, "prize")}
                className="w-28 text-center"
              />
              <input
                type="number"
                placeholder="당첨 인원"
                defaultValue={num}
                ref={(el) => el && (winnumRef.current[index] = el)}
                onBlur={() => modifyWinning(index, "num")}
                className="w-20 text-center"
              />
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
      )}
      {type === "선착" && (
        <div className="flex justify-between text-nowrap">
          <p className="font-bold">인원수</p>
          <div>
            <input
              type="text"
              placeholder="0"
              className="text-end font-medium w-52"
            />
            <span>명</span>
          </div>
        </div>
      )}
    </div>
  );
};
