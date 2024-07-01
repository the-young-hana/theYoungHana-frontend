import React, { FC } from "react";
import Calendar from "react-calendar";
import "./schedule.css";

interface ScheduleType {
  value: Date;
  isEndClicked?: boolean;
  disabledDate?: string;
  onDateChange: (newDate: Date) => void;
}

const Schedule: FC<ScheduleType> = ({
  value,
  isEndClicked,
  disabledDate,
  onDateChange,
}) => {
  const disabledFutureDates = ({ date }: { date: Date }) => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    // 미래 날짜 비활성화
    if (date > today) {
      return true;
    }

    // isEndClicked가 true일 때 disabledDate 이전 날짜 비활성화
    if (isEndClicked && date < new Date(disabledDate!)) {
      return true;
    }

    return false;
  };

  return (
    <Calendar
      value={value}
      onChange={onDateChange}
      calendarType="gregory"
      prev2Label={false}
      next2Label={false}
      showNeighboringMonth={false}
      tileDisabled={disabledFutureDates}
      formatDay={(_, date) => date.toLocaleString("en", { day: "numeric" })}
    />
  );
};

export default Schedule;
