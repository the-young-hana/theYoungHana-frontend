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
