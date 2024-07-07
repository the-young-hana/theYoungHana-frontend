interface storyApi {
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
  postStory(newStory: FormData): Promise<BaseResponseType>;
  updateStory(updateStory: UpdateStryReqType): Promise<BaseResponseType>;
  deleteStory(storyIdx: number): Promise<BaseResponseType>;
  getStoryComment(
    storyIdx: number,
    lastCommentIdx: number,
  ): Promise<DataResponseType<StoryCommentResType[]>>;
  addStoryComment(
    storyIdx: number,
    newComment: StoryCommentReqType,
  ): Promise<BaseResponseType>;
  editStoryComment(
    storyIdx: number,
    commentIdx: number,
    newComment: StoryCommentReqType,
  ): Promise<BaseResponseType>;
  deleteStoryComment(
    storyIdx: number,
    commentIdx: number,
  ): Promise<BaseResponseType>;
}

export default storyApi;
