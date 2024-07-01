interface storiesApi {
  getTransactions(
    filter: GetTransactionsReqType,
  ): Promise<DataResponseType<GetTransactionsResType>>;
}

export default storiesApi;
