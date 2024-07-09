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
  eventIdx: number;
  isEnd: number;
  isMine: boolean;
  eventType: string;
  eventTitle: string;
  eventStart: Data;
  eventEnd: Data;
  eventDt: Data;
  eventFee: number;
  eventFeeStart: Data;
  eventFeeEnd: Data;
  eventContent: string;
  eventImageList: string[];
  eventLimit: number;
  eventPrizeList: PrizeType[];
  eventCreateAt: Data;
}

interface PrizeType {
  prizeRank: number;
  prizeName: string;
  prizeLimit: number;
}

interface EventPostReqType {
  eventTitle: string;
  eventType: string;
  eventStart: string;
  eventEnd: string;
  eventDt: string;
  eventFee: number;
  eventFeeStart: string;
  eventFeeEnd: string;
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
  eventImageList: string[];
  eventLimit: number;
  eventPrizeList: PrizeType[];
  eventCreateAt: Data;
}

interface WinnerType {
  memberId: string;
  memberName: string;
}
interface WinnerListType {
  prizeRank: number;
  prizeName: string;
  winnerList: WinnerType[];
}
