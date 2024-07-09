import React, { FC, useEffect, useRef, useState } from "react";
import Calendar, { CalendarProps } from "react-calendar";
import "./schedule.css";
import { Button } from "./Button";
import { dateToString } from "../../utils/date";

interface ScheduleType {
  value: Date | string;
  isEndClicked?: boolean;
  disabledDate?: string;
  disabledPastDate?: string;
  onDateChange: (newDate: Date) => void;
  isDisabled?: boolean;
  time?: boolean;
  isOpen?: boolean;
}

const Schedule: FC<ScheduleType> = ({
  value,
  isEndClicked,
  disabledDate,
  disabledPastDate,
  onDateChange,
  isDisabled = true,
  time = false,
  isOpen = false,
}) => {
  const [isSelct, setIsSelect] = useState<boolean>(false);
  const [date, setDate] = useState<Date>(new Date());
  const [hour, setHour] = useState<string>("00");
  const [isHour, setIsHour] = useState<boolean>(false);
  const [minute, setMinute] = useState<string>("00");
  const [isMinute, setIsMinute] = useState<boolean>(false);

  const disabledFutureDates: CalendarProps["tileDisabled"] = ({ date }) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    if (!isDisabled) return false;

    if (date > today) {
      return true;
    }

    if (isEndClicked && disabledDate && date < new Date(disabledDate)) {
      return true;
    }

    return false;
  };

  const disabledPastDates: CalendarProps["tileDisabled"] = ({ date }) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);

    // 오늘 이전 날짜 비활성화
    if (date < today) {
      return true;
    }

    // disabledDate가 주어진 경우, 그 날짜 이전 날짜 비활성화
    if (disabledPastDate && date < new Date(disabledPastDate)) {
      return true;
    }

    return false;
  };

  const handleDateChange: CalendarProps["onChange"] = (value) => {
    if (value instanceof Date) {
      if (time) {
        setDate(value);
        setIsSelect(true);
      } else {
        onDateChange(value);
      }
    }
  };

  const handleHourChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setHour(event.target.value);
    setIsHour(true);
  };

  const handleMinuteChange = (event: React.ChangeEvent<HTMLSelectElement>) => {
    setMinute(event.target.value);
    setIsMinute(true);
  };

  const handleDateTimeChange = () => {
    const dateTime = `${dateToString(date)} ${hour}:${minute}`;
    onDateChange(new Date(dateTime));
  };

  useEffect(() => {
    setHour("00");
    setMinute("00");
    setIsHour(false);
    setIsMinute(false);
    setIsSelect(false);
  }, [isOpen]);

  return (
    <>
      {!isSelct ? (
        <Calendar
          value={value}
          onChange={handleDateChange}
          calendarType="gregory"
          prev2Label={false}
          next2Label={false}
          showNeighboringMonth={false}
          tileDisabled={disabledDate ? disabledFutureDates : disabledPastDates}
          formatDay={(_, date) => date.toLocaleString("en", { day: "numeric" })}
        />
      ) : (
        <>
          {time && (
            <div className="w-full text-2xl flex flex-col justify-between items-center">
              <div className="flex justify-center items-center gap-4 my-10">
                {isHour ? (
                  <div
                    onClick={() => {
                      setIsHour(false);
                    }}
                    className="cursor-pointer"
                  >
                    {hour}
                  </div>
                ) : (
                  <select id="hour" size={5} onChange={handleHourChange}>
                    <option className="h-11" disabled>
                      {" "}
                    </option>
                    <option className="h-11" disabled>
                      {" "}
                    </option>
                    {Array(23)
                      .fill(0)
                      .map((_, index) => {
                        const value =
                          index + 1 < 10 ? `0${index}` : (index + 1).toString();
                        return (
                          <option
                            key={value}
                            value={value}
                            className="py-1 cursor-pointer"
                          >
                            {value}
                          </option>
                        );
                      })}
                    <option className="h-11" disabled>
                      {" "}
                    </option>
                    <option className="h-11" disabled>
                      {" "}
                    </option>
                  </select>
                )}{" "}
                <div className="font-bold">시</div>
                {isMinute ? (
                  <div
                    onClick={() => {
                      setIsMinute(false);
                    }}
                    className="cursor-pointer"
                  >
                    {minute}
                  </div>
                ) : (
                  <select id="minute" size={5} onChange={handleMinuteChange}>
                    <option className="h-11" disabled>
                      {" "}
                    </option>
                    <option className="h-11" disabled>
                      {" "}
                    </option>
                    {Array(59)
                      .fill(0)
                      .map((_, index) => {
                        const value =
                          index + 1 < 10 ? `0${index}` : (index + 1).toString();
                        return (
                          <option
                            key={value}
                            value={value}
                            className="py-1 cursor-pointer"
                          >
                            {value}
                          </option>
                        );
                      })}
                    <option className="h-11" disabled>
                      {" "}
                    </option>
                    <option className="h-11" disabled>
                      {" "}
                    </option>
                  </select>
                )}
                <div className="font-bold">분</div>
              </div>
              <Button className="!px-20" onClick={handleDateTimeChange}>
                확인
              </Button>
            </div>
          )}
        </>
      )}
    </>
  );
};

export default Schedule;
