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
