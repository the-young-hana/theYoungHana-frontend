import React, { createContext, useState, ReactNode, FC } from "react";

interface EventContextType {
  event: EventPostReqType;
  setEvent: React.Dispatch<React.SetStateAction<EventPostReqType>>;
}

export const EventContext = createContext<EventContextType>({
  event: {
    eventTitle: "",
    eventType: "",
    eventStart: "",
    eventEnd: "",
    eventDt: "",
    eventFee: 0,
    eventFeeStart: "",
    eventFeeEnd: "",
    eventContent: "",
    eventLimit: 0,
    eventPrizeList: [
      {
        prizeRank: 0,
        prizeName: "",
        prizeLimit: 0,
      },
    ],
  },
  setEvent: () => {},
});

interface EventContextProviderProps {
  children: ReactNode;
}

export const EventContextProvider: FC<EventContextProviderProps> = ({
  children,
}) => {
  const [event, setEvent] = useState<EventPostReqType>({
    eventTitle: "",
    eventType: "신청",
    eventStart: "",
    eventEnd: "",
    eventDt: "",
    eventFee: 0,
    eventFeeStart: "",
    eventFeeEnd: "",
    eventContent: "",
    eventLimit: 0,
    eventPrizeList: [
      {
        prizeRank: 0,
        prizeName: "",
        prizeLimit: 0,
      },
    ],
  });

  return (
    <EventContext.Provider value={{ event, setEvent }}>
      {children}
    </EventContext.Provider>
  );
};
