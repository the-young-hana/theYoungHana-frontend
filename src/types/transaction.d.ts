interface TransferReqType {
  myAccountIdx: number;
  amount: number;
  receiveAccount: string;
  deptIdx: number;
}

interface TransferResType {
  myAccountName: string;
  amount: number;
  receiverName: string;
}
