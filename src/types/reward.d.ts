interface RewardsType {
  myPoint: number;
  deptPoint: number;
  hasParticipatedInQuiz: boolean;
  hasParticipatedInPresent: boolean;
}

interface RankingType {
  deptIdx: number;
  deptName: string;
  rankIdx: number;
  deptReward: number;
}

interface QuizType {
  quizIdx: number;
  quizContent: string;
}

interface QuizAnswerReqType {
  quizIdx: number;
  answer: boolean;
}

interface QuizAnswerType {
  isCorrect: boolean;
  explanation: string;
  point: number;
}
