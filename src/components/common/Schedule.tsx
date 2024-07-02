import React, { FC } from "react";
import Calendar, { CalendarProps } from "react-calendar";
import "./schedule.css";

interface ScheduleType {
  value: Date;
  isEndClicked?: boolean;
  disabledDate?: string;
  onDateChange: (newDate: Date) => void;
  isDisabled?: boolean;
}

const Schedule: FC<ScheduleType> = ({
  value,
  isEndClicked,
  disabledDate,
  onDateChange,
  isDisabled = true,
}) => {
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

  const handleDateChange: CalendarProps["onChange"] = (value) => {
    if (value instanceof Date) {
      onDateChange(value);
    }
  };

  return (
    <Calendar
      value={value}
      onChange={handleDateChange}
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
