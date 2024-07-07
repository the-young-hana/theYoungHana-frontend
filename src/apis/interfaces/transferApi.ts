export interface transferApi {
  postTransfer(
    transferData: TransferReqType,
  ): Promise<DataResponseType<TransferResType>>;
}
