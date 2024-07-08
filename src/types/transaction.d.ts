interface TransferReqType {
  myAccountIdx: number;
  amount: number;
  receiveAccount: string;
}

interface TransferResType {
  myAccountName: string;
  amount: number;
  receiverName: string;
}
