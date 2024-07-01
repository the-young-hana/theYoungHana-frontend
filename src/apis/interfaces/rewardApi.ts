export interface rewardApi {
  getQuiz(): Promise<DataResponseType<QuizType>>;
  postQuizAnswer(
    quizData: QuizAnswerReqType,
  ): Promise<DataResponseType<QuizAnswerType>>;
}
