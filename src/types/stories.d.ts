interface TransactionsReqType {
  deptIdx: number;
  start: string;
  end: string;
  type: string;
  sort: string;
  page: number;
}

interface TransactionType {
  transactionIdx: number;
  transactionId: string;
  transactionName: string;
  transactionAmount: number;
  transactionBalance: number;
  transactionType: string;
  transactionIsUsed: boolean;
  transactionDate: string;
}

interface TransactionListType {
  date: string;
  transactions: TransactionType[];
}

interface AccountInfoType {
  deptAccountBalance: number;
  deptAccountNumber: string;
  deptName: string;
}

interface TransactionsResType {
  deptAccountInfo: AccountInfoType;
  transactionList: TransactionListType[];
}

interface StoriesResType {
  storyIdx: number;
  storyTitle: string;
  storyLikeNum: number;
  storyCommentNum: number;
  startDate: string;
  endDate: string;
  isLiked: boolean;
  createdAt: string;
  totalAmount: number;
  transactionList: TransactionType[];
}

interface StoryDetailResType {
  storyIdx: number;
  storyTitle: string;
  storyLikeNum: 0;
  storyContent: string;
  storyCommentNum: number;
  isLiked: true;
  storyComment: {
    commentIdx: number;
    commentContent: string;
    createdAt: string;
  };
  storyImageList: string[];
  transactionList: TransactionListType[];
  createdAt: string;
}
