import React from "react";
import { useQuestions } from "./store/questions";
import { Button } from "@mui/material";

const Footer: React.FC = () => {
  const questions = useQuestions((state) => state.questions);

  const correct = questions.filter((q) => q.isCorrect).length;
  const incorrect = questions.filter((q) => q.isCorrect === false).length;
  const unanswered = questions.filter((q) => q.userAnswer === undefined).length;

  return (
    <>
      <footer style={{ marginTop: "16px" }}>
        <strong>
          {correct} correctas, {incorrect} incorrectas, {unanswered} sin
          responder
        </strong>

        <div>
          <Button
            sx={{ mt: 2 }}
            onClick={() => useQuestions.getState().reset()}
          >
            Resetear juego
          </Button>
        </div>
      </footer>
    </>
  );
};

export default Footer;
