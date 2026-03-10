import { useLocation } from "react-router-dom";
import { useState } from "react";
import "./QuizPage.css";

export default function QuizPage() {
  const location = useLocation();
  const { quiz } = location.state || { quiz: [] }; // get quiz from navigation
  const [answers, setAnswers] = useState({}); // store user answers
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0); // track current question

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
      <h1>Your Quiz</h1>

      <div className="quiz-question-card">
        <h3>
          Q{currentQuestionIndex + 1}: {currentQuestion.question}
        </h3>
        <ul>
          {currentQuestion.choices.map((choice, i) => (
            <li key={i}>
              <label>
                <input
                  type="radio"
                  name={`question-${currentQuestionIndex}`}
                  value={choice}
                  checked={answers[currentQuestionIndex] === choice}
                  onChange={() => handleSelectAnswer(choice)}
                />
                {choice}
              </label>
            </li>
          ))}
        </ul>
      </div>

      <div className="quiz-actions">
        <button onClick={handlePrevious} disabled={currentQuestionIndex === 0}>
          Previous
        </button>

        {currentQuestionIndex < quiz.length - 1 ? (
          <button onClick={handleNext}>Next</button>
        ) : (
          <button onClick={handleSubmit}>Submit Quiz</button>
        )}
      </div>
    </main>
  );
}
