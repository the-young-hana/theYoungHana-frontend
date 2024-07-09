import { FC, useContext, useEffect, useRef, useState } from "react";
import Schedule from "../common/Schedule";
import { dateTimeToString } from "../../utils/date";
import Modal from "../common/Modal";
import { EventContext } from "../../context/EventContext";
import moment from "moment";
import EventPrize from "./EventPrize";

interface IProps {
  type: string;
  setIsActive: React.Dispatch<React.SetStateAction<boolean>>;
  isModify: boolean;
}

export const EventForm: FC<IProps> = ({ type, setIsActive, isModify }) => {
  const { event, setEvent } = useContext(EventContext);
  const titleRef = useRef<HTMLInputElement | null>(null);
  const feeRef = useRef<HTMLInputElement | null>(null);
  const limitRef = useRef<HTMLInputElement | null>(null);

  const [isStart, setIsStart] = useState<boolean>(false);
  const [isEnd, setIsEnd] = useState<boolean>(false);
  const [isDt, setIsDt] = useState<boolean>(false);
  const [isFeeStart, setIsFeeStart] = useState<boolean>(false);
  const [isFeeEnd, setIsFeeEnd] = useState<boolean>(false);

  // 캘린터 모달 state
  const [isShow, setIsShow] = useState({
    type: "",
    isFilterModalOpen: false,
    isCalendarModalOpen: false,
    moreBtn: false,
    calendar: false,
  });

  useEffect(() => {
    if (isModify) {
      setIsStart(true);
      setIsEnd(true);
      if (event.eventFee !== 0) {
        setIsFeeStart(true);
        setIsFeeEnd(true);
      }
      if (event.eventType !== "신청") {
        setIsDt(true);
      }
    }
  }, [event]);

  useEffect(() => {
    if (isStart && isEnd && event.eventTitle !== "") {
      if (event.eventFee > 0 && isFeeStart && isFeeEnd) {
        setIsActive(true);
      } else if (event.eventFee === 0) {
        setIsActive(true);
      }
    }
  }, [isStart, isEnd, isDt, event.eventFee, isFeeStart, isFeeEnd]);

  // 캘린더 모달
  const handleCalendarModal = () => {
    setIsShow((prev) => ({
      ...prev,
      isCalendarModalOpen: !prev.isCalendarModalOpen,
    }));
  };

  // 날짜 선택
  const handleDateChange = (date: Date) => {
    const newDate = moment(date).format("YYYY-MM-DD HH:mm:ss");

    if (isShow.type === "신청시작") {
      setEvent((prevEvent) => ({
        ...prevEvent,
        eventStart: newDate,
      }));
      !isStart && setIsStart(true);
    }

    if (isShow.type === "신청마감") {
      setEvent((prevEvent) => ({
        ...prevEvent,
        eventEnd: newDate,
      }));
      if (event.eventType === "신청") {
        setEvent((prevEvent) => ({
          ...prevEvent,
          eventDt: newDate,
        }));
      }
      if (event.eventFee === 0) {
        setEvent((prevEvent) => ({
          ...prevEvent,
          eventFeeStart: newDate,
        }));
        setEvent((prevEvent) => ({
          ...prevEvent,
          eventFeeEnd: newDate,
        }));
      }
      !isEnd && setIsEnd(true);
    }
    if (isShow.type === "발표날짜") {
      setEvent((prevEvent) => ({
        ...prevEvent,
        eventDt: newDate,
      }));

      !isDt && setIsDt(true);
    }
    if (isShow.type === "입금시작") {
      setEvent((prevEvent) => ({
        ...prevEvent,
        eventFeeStart: newDate,
      }));
      !isFeeStart && setIsFeeStart(true);
    }
    if (isShow.type === "입금마감") {
      setEvent((prevEvent) => ({
        ...prevEvent,
        eventFeeEnd: newDate,
      }));
      !isFeeEnd && setIsFeeEnd(true);
    }
    setIsShow((prev) => ({ ...prev, isCalendarModalOpen: false }));
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="flex justify-between">
        <p className="font-bold">제목</p>
        <input
          type="text"
          placeholder="제목"
          className="text-end font-medium w-56"
          defaultValue={event.eventTitle}
          ref={titleRef}
          onBlur={() => {
            setEvent((prevEvent) => ({
              ...prevEvent,
              eventTitle: titleRef.current!.value,
            }));
          }}
        />
      </div>
      <div className="flex justify-between items-center">
        <p className="font-bold">신청 시작</p>
        <div className="flex gap-2">
          <div
            onClick={() => {
              setIsShow((prev) => ({
                ...prev,
                type: "신청시작",
                isCalendarModalOpen: !prev.isCalendarModalOpen,
              }));
            }}
            className="cursor-pointer border-b-2 px-2"
          >
            {isStart
              ? dateTimeToString(new Date(event.eventStart))
              : "신청 시작일 선택"}
          </div>
        </div>
      </div>

      <div className="flex justify-between items-center">
        <p className="font-bold">신청 마감</p>
        <div className="flex gap-2">
          <div
            onClick={() => {
              setIsShow((prev) => ({
                ...prev,
                type: "신청마감",
                isCalendarModalOpen: !prev.isCalendarModalOpen,
              }));
            }}
            className="cursor-pointer border-b-2 px-2"
          >
            {isEnd
              ? dateTimeToString(new Date(event.eventEnd))
              : "신청 마감일 선택"}
          </div>
        </div>
      </div>

      {type !== "신청" && (
        <>
          <div className="flex justify-between items-center">
            <p className="font-bold">발표 날짜</p>
            <div className="flex gap-2">
              <div
                onClick={() => {
                  setIsShow((prev) => ({
                    ...prev,
                    type: "발표날짜",
                    isCalendarModalOpen: !prev.isCalendarModalOpen,
                  }));
                }}
                className="cursor-pointer border-b-2 px-2"
              >
                {isDt
                  ? dateTimeToString(new Date(event.eventDt))
                  : "발표 날짜 선택"}
              </div>
            </div>
          </div>
        </>
      )}
      <div className="flex justify-between text-nowrap">
        <p className="font-bold">참가비</p>
        <div>
          <input
            type="number"
            className="text-end font-medium w-52"
            placeholder={event.eventFee.toString()}
            ref={feeRef}
            onBlur={() => {
              setEvent((prevEvent) => ({
                ...prevEvent,
                eventFee: Number(feeRef.current!.value),
              }));
            }}
          />
          <span>원</span>
        </div>
      </div>
      <div className="flex justify-between items-center">
        <p className="font-bold">입금기간</p>
        <div className="flex flex-col">
          <div className="flex gap-3">
            <div
              onClick={() => {
                setIsShow((prev) => ({
                  ...prev,
                  type: "입금시작",
                  isCalendarModalOpen: !prev.isCalendarModalOpen,
                }));
              }}
              className="cursor-pointer border-b-2 px-2"
            >
              {isFeeStart
                ? dateTimeToString(new Date(event.eventFeeStart))
                : "입금 날짜 선택"}
            </div>
          </div>
          <div className="text-center">~</div>
          <div className="flex gap-3">
            <div
              onClick={() => {
                setIsShow((prev) => ({
                  ...prev,
                  type: "입금마감",
                  isCalendarModalOpen: !prev.isCalendarModalOpen,
                }));
              }}
              className="cursor-pointer border-b-2 px-2"
            >
              {isFeeEnd
                ? dateTimeToString(new Date(event.eventFeeEnd))
                : "입금 날짜 선택"}
            </div>
          </div>
        </div>
      </div>
      {type === "응모" && (
        <>
          <p className="font-bold">당첨 인원 및 상품</p>
          <EventPrize />
        </>
      )}
      {type === "선착" && (
        <div className="flex justify-between text-nowrap">
          <p className="font-bold">인원수</p>
          <div>
            <input
              type="text"
              className="text-end font-medium w-52"
              placeholder={event.eventLimit.toString()}
              ref={limitRef}
              onBlur={() => {
                setEvent((prevEvent) => ({
                  ...prevEvent,
                  eventLimit: Number(limitRef.current!.value),
                }));
              }}
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
              isShow.type === "신청시작"
                ? new Date(event.eventStart)
                : isShow.type === "신청마감"
                  ? new Date(event.eventEnd)
                  : isShow.type === "발표날짜"
                    ? new Date(event.eventDt)
                    : isShow.type === "입금시작"
                      ? new Date(event.eventFeeStart)
                      : isShow.type === "입금마감"
                        ? new Date(event.eventFeeEnd)
                        : new Date()
            }
            onDateChange={handleDateChange}
            disabledPastDate={
              isShow.type === "신청마감"
                ? event.eventStart
                : isShow.type === "발표날짜"
                  ? event.eventEnd
                  : isShow.type === "입금시작"
                    ? event.eventDt
                    : isShow.type === "입금마감"
                      ? event.eventFeeStart
                      : ""
            }
            time={true}
            isOpen={isShow.isCalendarModalOpen}
          />
        </div>
      </Modal>
    </div>
  );
};
