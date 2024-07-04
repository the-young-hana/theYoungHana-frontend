interface storiesApi {
  getAccountInfo(deptIdx: number): Promise<DataResponseType<AccountInfoType>>;
  getTransactions(
    filter: TransactionsReqType,
  ): Promise<DataResponseType<TransactionsResType>>;
  getStories(
    deptIdx: number,
    page: number,
  ): Promise<DataResponseType<StoriesResType[]>>;
  getStoryDetail(
    storyIdx: number,
  ): Promise<DataResponseType<StoryDetailResType>>;
  addLikeNum(storyIdx: number): Promise<DataResponseType<StoryDetailResType>>;
}

export default storiesApi;
