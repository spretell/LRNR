import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/results.css";

export default function Results() {
  // React Router navigation lets us move the user to another page
  const navigate = useNavigate();

  /*Placeholder quiz result data for now.
     backend response?*/
  const result = useMemo(
    () => ({
      correctAnswers: 8,
      totalQuestions: 10,
    }),
    []
  );

  /*Calculate percentage score */
  const scorePercent = Math.round(
    (result.correctAnswers / result.totalQuestions) * 100
  );

  /*
    XP earned is based on percentage correct.
    Simple version:
    - 80% score = 80 XP
    This is easy to explain and easy to scale later.
  */
  const xpEarned = scorePercent;

  // CTA button takes the useer back to quiz generation
  const handleTryAnotherQuiz = () => {
    navigate("/quiz-generation");
  };

  return (
    <main className="results-page">
      <section className="results-shell">
        <div className="results-hero">
          {/* Page heading / intro */}
          <header className="results-header">
            <p className="results-eyebrow">Quiz Complete</p>
            <h1 className="results-title">Here are your results</h1>
            <p className="results-subtitle">
              Great work! Review your score and XP earned below.
            </p>
          </header>

          {/* Results summary cards */}
          <section className="results-grid" aria-label="Quiz results summary">
            {/* Card 1: Score */}
            <article className="result-card result-card--pink">
              <p className="result-label">Score</p>
              <p className="result-value">
                {result.correctAnswers} / {result.totalQuestions}
              </p>
              <p className="result-help">Correct / Total Questions</p>
            </article>

            {/* Card 2: XP Earned */}
            <article className="result-card result-card--blue">
              <p className="result-label">XP Earned</p>
              <p className="result-value">{xpEarned} XP</p>
              <p className="result-help">XP awarded from your score percentage</p>
            </article>

            {/* Card 3: Percentage */}
            <article className="result-card result-card--purple">
              <p className="result-label">Percentage</p>
              <p className="result-value">{scorePercent}%</p>
              <p className="result-help">Based on answers submitted</p>
            </article>
          </section>

          <section className="results-cta">
            <p className="results-cta-text">
              Want to keep learning? Try another quiz and build your streak.
            </p>

            <button
              className="primary-btn"
              type="button"
              onClick={handleTryAnotherQuiz}
            >
              Try Another Quiz
            </button>
          </section>

          {/* Secondary navigation option for users who want to review progress */}
          <div className="results-dashboard-link">
            <button
              className="results-secondary-btn"
              type="button"
              onClick={() => navigate("/account")}
            >
              Back to Dashboard
            </button>
          </div>

        </div>
      </section>
    </main>
  );
}