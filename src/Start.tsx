import { Button } from "@mui/material";
import React from "react";
import { useQuestions } from "./store/questions";
import { Questions } from "./types";

//Limit only 10 questions
const maxQuestions = 10;

const Start: React.FC = () => {
  const setQuestions = useQuestions((state) => state.setQuestions);

  const handleClick = async () => {
    //Get questions
    const questions = (
      (await fetch("http://localhost:5173/data.json").then((res) =>
        res.json()
      )) as Questions[]
    )
      .sort(() => Math.random() - 0.5)
      .slice(0, maxQuestions);

    //Set questions
    setQuestions(questions);
  };

  return (
    <Button onClick={handleClick} variant="contained" sx={{ mt: 6 }}>
      ¡Empezar!
    </Button>
  );
};

export default Start;
