import {
  Card,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Stack,
  Typography,
} from "@mui/material";
import { ArrowBackIosNew, ArrowForwardIos } from "@mui/icons-material";
import React from "react";
import { useQuestions } from "./store/questions";
import type { Questions } from "./types";
import SyntaxHighlighter from "react-syntax-highlighter";
import { hybrid } from "react-syntax-highlighter/dist/esm/styles/hljs";
import Footer from "./Footer";

const handleBackgroundColor = (question: Questions, index: number) => {
  const { userAnswer, correctAnswer } = question;

  // Si el usuario no ha respondido, devolver transparente
  if (userAnswer == null) {
    return "transparent";
  }

  // Si el índice no es la respuesta correcta ni la respuesta del usuario, devolver transparente
  if (index !== correctAnswer && index !== userAnswer) {
    return "transparent";
  }

  // Si el índice es la respuesta correcta, devolver verde
  if (index === correctAnswer) {
    return "green";
  }

  // Si el índice es la respuesta del usuario pero no es la respuesta correcta, devolver rojo
  return "red";
};

const Question = ({ question }: { question: Questions }) => {
  const handleClick = (index: number) => {
    useQuestions.getState().setUserAnswer(index);
  };

  return (
    <Card
      variant="outlined"
      sx={{ bgcolor: "#222", p: 2, textAlign: "left", mt: 4 }}
    >
      <Typography variant="h5">{question.question}</Typography>

      <SyntaxHighlighter language="javascript" style={hybrid}>
        {question.code}
      </SyntaxHighlighter>

      <List sx={{ bgcolor: "#333" }} disablePadding>
        {question.answers.map((answer, index) => (
          <ListItem key={index} disablePadding divider>
            <ListItemButton
              disabled={question.userAnswer !== undefined}
              onClick={() => handleClick(index)}
              sx={{ backgroundColor: handleBackgroundColor(question, index) }}
            >
              <ListItemText primary={answer} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Card>
  );
};

const Quiz: React.FC = () => {
  const questions = useQuestions((state) => state.questions);
  const currentQuestion = useQuestions((state) => state.currentQuestion);

  const nextQuestion = useQuestions((state) => state.nextQuestion);
  const previousQuestion = useQuestions((state) => state.previousQuestion);

  const question = questions[currentQuestion];

  return (
    <>
      <Stack
        direction={"row"}
        gap={2}
        alignItems={"center"}
        justifyContent={"center"}
      >
        <IconButton onClick={previousQuestion} disabled={currentQuestion === 0}>
          <ArrowBackIosNew />
        </IconButton>
        {currentQuestion + 1} / {questions.length}
        <IconButton
          onClick={nextQuestion}
          disabled={currentQuestion === questions.length - 1}
        >
          <ArrowForwardIos />
        </IconButton>
      </Stack>
      <Question question={question} />

      <Footer />
    </>
  );
};

export default Quiz;
