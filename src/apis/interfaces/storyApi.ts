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
  editStory(
    storyIdx: number,
    updatedStory: UpdateStryReqType,
  ): Promise<BaseResponseType>;
  deleteStory(storyIdx: number): Promise<BaseResponseType>;
  addLikeNum(storyIdx: number): Promise<DataResponseType<StoryDetailResType>>;
  // postStory(newStory: FormData): Promise<BaseResponseType>;
  // updateStory(updateStory: UpdateStryReqType): Promise<BaseResponseType>;
  getStoryComments(
    storyIdx: number,
    lastCommentIdx: number,
  ): Promise<DataResponseType<StoryCommentResType[]>>;
  addStoryComments(
    storyIdx: number,
    newComment: StoryCommentReqType,
  ): Promise<BaseResponseType>;
  editStoryComments(
    storyIdx: number,
    commentIdx: number,
    newComment: StoryCommentReqType,
  ): Promise<BaseResponseType>;
  deleteStoryComments(
    storyIdx: number,
    commentIdx: number,
  ): Promise<BaseResponseType>;
}

export default storyApi;
