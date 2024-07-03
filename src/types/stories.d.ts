interface GetTransactionsReqType {
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

interface GetTransactionsResType {
  deptAccountBalance: number;
  deptAccountNumber: string;
  deptName: string;
  deptAccountTransactionsByDate: {
    date: string;
    transactions: TransactionType[];
  }[];
}

interface GetStoriesResType {
  storyIdx: number;
  storyTitle: string;
  storyLikeNum: number;
  storyCommentNum: number;
  startDate: string;
  endDate: string;
  isLiked: boolean;
  createdAt: string;
  totalAmount: number;
  transactionList: {
    transactionIdx: number;
    transactionId: string;
    transactionName: string;
    transactionAmount: number;
    transactionBalance: number;
    transactionType: string;
    transactionIsUsed: boolean;
    transactionDate: string;
  }[];
}

interface getStoryDetailResType {
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
  transactionList: {
    transactionIdx: number;
    transactionId: string;
    transactionName: string;
    transactionAmount: 0;
    transactionBalance: 0;
    transactionType: string;
    transactionIsUsed: true;
    transactionDate: string;
  }[];
  createdAt: string;
}
