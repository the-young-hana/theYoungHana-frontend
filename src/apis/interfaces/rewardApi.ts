export interface rewardApi {
  getRewards(): Promise<DataResponseType<RewardsType>>;
  getRanking(page: number): Promise<DataResponseType<RankingType[]>>;
  getPresent(): Promise<DataResponseType<{ point: number }>>;
  getQuiz(): Promise<DataResponseType<QuizType>>;
  postQuizAnswer(
    quizData: QuizAnswerReqType,
  ): Promise<DataResponseType<QuizAnswerType>>;
}
