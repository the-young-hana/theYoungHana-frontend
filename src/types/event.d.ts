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
  eventImageList: string[];
  eventStart: Date;
  eventEnd: Date;
  isEnd: number;
  isMine: boolean;

  eventIdx: number;
  isEnd: number;
  isMine: boolean;
  eventType: string;
  eventTitle: string;
  eventStart: Data;
  eventEnd: Data;
  eventDt: Data;
  eventFee: 0;
  eventFeeStart: Data;
  eventFeeEnd: Data;
  eventContent: string;
  eventImageList: string;
  eventLimit: number;
  eventPrizeList: PrizeType[];
}

interface PrizeType {
  prizeRank: number;
  prizeName: string;
  prizeLimit: number;
}

interface EventPostReqType {
  eventTitle: string;
  eventType: string;
  eventStart: Date;
  eventEnd: Date;
  eventDt: Date;
  eventFee: number;
  eventFeeStart: Date;
  eventFeeEnd: Date;
  eventContent: string;
  eventLimit: number;
  eventPrizeList: PrizeType[];
}

interface EventPostResType {
  eventIdx: number;
  isEnd: number;
  isMine: boolean;
  eventType: string;
  eventTitle: string;
  eventStart: Date;
  eventEnd: Date;
  eventDt: Date;
  eventFee: nmuber;
  eventFeeStart: Date;
  eventFeeEnd: Date;
  eventContent: string;
  eventImageList: string;
  eventLimit: number;
  eventPrizeList: PrizeType[];
}
