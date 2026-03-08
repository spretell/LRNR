import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import QuestionCard from "../components/QuestionCard";

export default function QuizPage() {
  const location = useLocation();
  const navigate = useNavigate();
  const quiz = location.state?.quiz;

  const [currentQuestion, setCurrentQuestion] = useState(0);
  const [answers, setAnswers] = useState({});

  if (!quiz) return <p>No quiz loaded. Please generate a quiz first.</p>;

  const question = quiz[currentQuestion];

  const selectAnswer = (option) => {
    setAnswers({ ...answers, [currentQuestion]: option });
  };

  const nextQuestion = () => {
    if (currentQuestion + 1 < quiz.length) {
      setCurrentQuestion(currentQuestion + 1);
    } else {
      // Navigate to result page
      const score = quiz.reduce(
        (acc, q, idx) => acc + (answers[idx] === q.correctAnswer ? 1 : 0),
        0,
      );
      navigate("/result", { state: { score, total: quiz.length } });
    }
  };

  return (
    <div style={{ maxWidth: 600, margin: "0 auto" }}>
      <h1>Quiz</h1>
      <p>
        Question {currentQuestion + 1} / {quiz.length}
      </p>

      <QuestionCard
        question={question}
        selectAnswer={selectAnswer}
        selected={answers[currentQuestion]}
      />

      <button onClick={nextQuestion} style={{ marginTop: 20 }}>
        {currentQuestion + 1 < quiz.length ? "Next Question" : "Finish Quiz"}
      </button>
    </div>
  );
}
