import { Container, Stack, Typography } from "@mui/material";
import "./App.css";
import JavaScriptLogo from "./assets/JavaScriptLogo";
import Start from "./Start";
import { useQuestions } from "./store/questions";
import Quiz from "./Quiz";

function App() {
  const questions = useQuestions((state) => state.questions);

  return (
    <main>
      <Container maxWidth="sm">
        <Stack
          direction={"row"}
          gap={2}
          alignItems={"center"}
          justifyContent={"center"}
        >
          <JavaScriptLogo />
          <Typography variant="h2" component="h1">
            JavaScript Quiz
          </Typography>
        </Stack>

        {questions.length === 0 && <Start />}
        {questions.length > 0 && <Quiz />}
      </Container>
    </main>
  );
}

export default App;
