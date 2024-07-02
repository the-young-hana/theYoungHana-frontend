interface EventListReqType {
  value: string;
  isEnd: boolean;
  page: number;
}

interface EventListType {
  eventIdx: number;
  eventTitle: string;
  eventSummary: string;
  eventType: string;
  eventStart: Date;
  eventEnd: Date;
}

interface EventDetailType {
  eventTitle: string;
  eventFee: number;
  eventContent: string;
  eventImageList: [string];
  eventStart: Date;
  eventEnd: Date;
  isEnd: number;
  isMine: boolean;
}
