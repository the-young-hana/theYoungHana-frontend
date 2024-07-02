import { FC, useEffect, useRef, useState } from "react";
import { Button } from "../common/Button";
import { FiPlus } from "react-icons/fi";
import { IoIosClose } from "react-icons/io";
import cn from "../../utils/cn";

import Schedule from "../common/Schedule";
import { dateToString } from "../../utils/date";
import Modal from "../common/Modal";

interface IProps {
  type: string;
  eventDetail?: EventDetailType;
}

export const EventForm: FC<IProps> = ({ type, eventDetail }) => {
  // 신청날짜, 발표날짜, 입금날짜
  const [startDate, setStartDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [announceDate, setAnnounceDate] = useState<string>("");
  const [depositStartDate, setDepositStartDate] = useState<string>("");
  const [depositEndDate, setDepositEndDate] = useState<string>("");

  // 캘린터 모달 state
  const [isShow, setIsShow] = useState({
    type: "",
    isFilterModalOpen: false,
    isCalendarModalOpen: false,
    moreBtn: false,
    calendar: false,
  });

  const [winning, setWinning] = useState<string[][]>([["", ""]]);
  const prizeRef = useRef<HTMLInputElement[]>([]);
  const winnumRef = useRef<HTMLInputElement[]>([]);

  useEffect(() => {
    if (eventDetail) {
      setStartDate(dateToString(new Date(eventDetail.eventStart)));
      setEndDate(dateToString(new Date(eventDetail.eventEnd)));
    }
  }, [eventDetail]);

  // 캘린더 모달
  const handleCalendarModal = () => {
    setIsShow((prev) => ({
      ...prev,
      isCalendarModalOpen: !prev.isCalendarModalOpen,
    }));
  };

  // 날짜 선택
  const handleDateChange = (newDate: Date) => {
    if (isShow.type === "신청시작") setStartDate(dateToString(newDate));
    if (isShow.type === "신청마감") setEndDate(dateToString(newDate));
    if (isShow.type === "발표날짜") setAnnounceDate(dateToString(newDate));
    if (isShow.type === "입금시작") setDepositStartDate(dateToString(newDate));
    if (isShow.type === "입금마감") setDepositEndDate(dateToString(newDate));

    setIsShow((prev) => ({ ...prev, isCalendarModalOpen: false }));
  };

  // 날짜 검증 로직
  const parseDate = (date: string | Date): Date => {
    if (typeof date === "string" && date === "") {
      return new Date();
    }
    const parsedDate = new Date(date);
    return isNaN(parsedDate.getTime()) ? new Date() : parsedDate;
  };

  // 상품
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
          className="text-end font-medium w-56"
          defaultValue={eventDetail?.eventTitle}
        />
      </div>
      <div className="flex justify-between items-center">
        <p className="font-bold">신청 시작</p>
        <div
          onClick={() => {
            setIsShow((prev) => ({
              ...prev,
              type: "신청시작",
              isCalendarModalOpen: !prev.isCalendarModalOpen,
            }));
          }}
          className="cursor-pointer"
        >
          {startDate ? startDate : "신청시작일 선택"}
        </div>
      </div>
      <div className="flex justify-between items-center">
        <p className="font-bold">신청 마감</p>
        <div
          onClick={() => {
            setIsShow((prev) => ({
              ...prev,
              type: "신청마감",
              isCalendarModalOpen: !prev.isCalendarModalOpen,
            }));
          }}
          className="cursor-pointer"
        >
          {endDate ? endDate : "신청마감일 선택"}
        </div>
      </div>
      {type !== "신청" && (
        <div className="flex justify-between items-center">
          <p className="font-bold">발표 날짜</p>
          <div
            onClick={() => {
              setIsShow((prev) => ({
                ...prev,
                type: "발표날짜",
                isCalendarModalOpen: !prev.isCalendarModalOpen,
              }));
            }}
            className="cursor-pointer"
          >
            {announceDate ? announceDate : "발표날짜 선택"}
          </div>
        </div>
      )}
      <div className="flex justify-between text-nowrap">
        <p className="font-bold">참가비</p>
        <div>
          <input
            type="number"
            placeholder="0"
            className="text-end font-medium w-52"
            defaultValue={eventDetail?.eventFee}
          />
          <span>원</span>
        </div>
      </div>
      <div className="flex justify-between items-center">
        <p className="font-bold">입금기간</p>
        <div className="flex gap-3">
          <div
            onClick={() => {
              setIsShow((prev) => ({
                ...prev,
                type: "입금시작",
                isCalendarModalOpen: !prev.isCalendarModalOpen,
              }));
            }}
            className="cursor-pointer"
          >
            {depositStartDate ? depositStartDate : "입금시작일 선택"}
          </div>
          ~
          <div
            onClick={() => {
              setIsShow((prev) => ({
                ...prev,
                type: "입금마감",
                isCalendarModalOpen: !prev.isCalendarModalOpen,
              }));
            }}
            className="cursor-pointer"
          >
            {depositEndDate ? depositEndDate : "입금마감일 선택"}
          </div>
        </div>
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
      <Modal
        show={isShow.isCalendarModalOpen}
        className="absolute !w-80 !h-fit"
        onClose={handleCalendarModal}
      >
        <div className="-translate-y-6">
          <Schedule
            value={
              isShow.type === "입금시작"
                ? parseDate(startDate)
                : isShow.type === "입금마감"
                  ? parseDate(endDate)
                  : isShow.type === "발표날짜"
                    ? parseDate(announceDate)
                    : isShow.type === "입금시작"
                      ? parseDate(depositStartDate)
                      : isShow.type === "입금마감"
                        ? parseDate(depositEndDate)
                        : new Date()
            }
            onDateChange={handleDateChange}
            isDisabled={false}
          />
        </div>
      </Modal>
    </div>
  );
};
