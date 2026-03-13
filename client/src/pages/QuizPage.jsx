import { useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import "./QuizPage.css";

export default function QuizPage() {
  const location = useLocation();
  const { quiz } = location.state || { quiz: [] }; // get quiz from navigation
  const [answers, setAnswers] = useState({}); // store user answers
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0); // track current question
  const [timeLeft, setTimeLeft] = useState(300); // total time in seconds (e.g., 5 minutes)

  // Countdown
  useEffect(() => {
    if (timeLeft <= 0) {
      handleSubmit(); // auto-submit when time reaches 0
      return;
    }

    const timerId = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);

    // Cleanup interval to avoid memory leaks
    return () => clearInterval(timerId);
  }, [timeLeft]); // re-run when timeLeft changes

  if (!quiz || quiz.length === 0) {
    return <p>No quiz data found. Please generate a quiz first.</p>;
  }

  const handleSelectAnswer = (choice) => {
    setAnswers({ ...answers, [currentQuestionIndex]: choice });
  };

  const handleNext = () => {
    if (currentQuestionIndex < quiz.length - 1) {
      setCurrentQuestionIndex(currentQuestionIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex(currentQuestionIndex - 1);
    }
  };

  const handleSubmit = () => {
    let score = 0;
    quiz.forEach((q, i) => {
      if (answers[i] === q.answer) score += 1;
    });
    alert(`You scored ${score} / ${quiz.length}`);
  };

  const currentQuestion = quiz[currentQuestionIndex];

  return (
    <main className="quiz-page">
      <div className="timer">
        Time Left:{" "}
        {Math.floor(timeLeft / 60)
          .toString()
          .padStart(2, "0")}
        :{(timeLeft % 60).toString().padStart(2, "0")}
      </div>

      <div className="progress-bar">
        <div
          className="progress-fill"
          style={{
            width: `${((currentQuestionIndex + 1) / quiz.length) * 100}%`,
          }}
        ></div>
      </div>

      <div className="quiz-question-card">
        <h2>
          {currentQuestionIndex + 1} of {quiz.length}
        </h2>
        <h1>Question</h1>
        <h3>{currentQuestion.question}</h3>
        {/* <ul> */}
        {currentQuestion.choices.map((choice, i) => (
          // <li key={i}>
          <label
            key={i}
            className={`choice-btn ${answers[currentQuestionIndex] === choice ? "selected" : ""}`}
          >
            <input
              type="radio"
              name={`question-${currentQuestionIndex}`}
              value={choice}
              checked={answers[currentQuestionIndex] === choice}
              onChange={() => handleSelectAnswer(choice)}
            />
            {choice}
          </label>

          // </li>
        ))}
        <div className="info-text">
          <p>Multiple-choice question: choose the one correct answer. ✅</p>
        </div>
        {/* </ul> */}
      </div>

      <div className="quiz-actions">
        <button
          className="prev-btn"
          onClick={handlePrevious}
          disabled={currentQuestionIndex === 0}
        >
          Previous
        </button>

        {currentQuestionIndex < quiz.length - 1 ? (
          <button className="next-btn" onClick={handleNext}>
            Next
          </button>
        ) : (
          <button className="submit-btn" onClick={handleSubmit}>
            Submit Quiz
          </button>
        )}
      </div>
    </main>
  );
}
