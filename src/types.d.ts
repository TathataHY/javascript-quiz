export type Questions = {
  id: number;
  question: string;
  code: string;
  answers: string[];
  correctAnswer: number;
  userAnswer?: number;

  isCorrect?: boolean;
};
