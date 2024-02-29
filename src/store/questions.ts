import { create } from "zustand";
import type { Questions } from "../types";
import { persist } from "zustand/middleware";

type State = {
  questions: Questions[];
  setQuestions: (questions: Questions[]) => void;

  currentQuestion: number;
  // setCurrentQuestion: (currentQuestion: number) => void;

  nextQuestion: () => void;
  previousQuestion: () => void;

  reset: () => void;

  // answerQuestion: (answer: number) => void;

  // isCorrect: boolean;

  // setCorrect: (isCorrect: boolean) => void;

  // resetCorrect: () => void;

  // resetIsCorrect: () => void;

  setUserAnswer: (userAnswer: number) => void;
};

export const useQuestions = create<State>()(
  persist(
    (set, get) => ({
      questions: [],
      setQuestions: (questions) => set({ questions }),
      currentQuestion: 0,
      nextQuestion: () => {
        const { currentQuestion, questions } = get();

        if (currentQuestion < questions.length - 1) {
          set({ currentQuestion: currentQuestion + 1 });
        }
      },
      previousQuestion: () => {
        const { currentQuestion } = get();

        if (currentQuestion > 0) {
          set({ currentQuestion: currentQuestion - 1 });
        }
      },
      reset: () => {
        set({ currentQuestion: 0, questions: [] });
      },
      setUserAnswer: (userAnswer) => {
        const { currentQuestion, questions } = get();

        const isCorrect =
          userAnswer === questions[currentQuestion].correctAnswer;

        questions[currentQuestion] = {
          ...questions[currentQuestion],
          userAnswer,
          isCorrect,
        };

        const questionsClone = structuredClone(questions);

        set({ questions: questionsClone });
      },
    }),
    { name: "questions" }
  )
);
