interface storiesApi {
  getTransactions(
    filter: GetTransactionsReqType,
  ): Promise<DataResponseType<GetTransactionsResType>>;
  getStories(
    deptIdx: number,
    page: number,
  ): Promise<DataResponseType<GetStoriesResType[]>>;
  getStoryDetail(
    storyIdx: number,
  ): Promise<DataResponseType<getStoryDetailResType>>;
  addLikeNum(
    storyIdx: number,
  ): Promise<DataResponseType<getStoryDetailResType>>;
}

export default storiesApi;
