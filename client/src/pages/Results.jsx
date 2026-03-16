import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import "../styles/results.css";
import LoadingResult from "../components/LoadingResult";
import { useAuth } from "../context/AuthContext"; // <--- import AuthContext

export default function Results() {
  const navigate = useNavigate();
  const location = useLocation();
  const { refreshUser } = useAuth(); // <--- get refreshUser from context

  const { correctAnswers, totalQuestions, currentQuizId } = location.state || {
    correctAnswers: 0,
    totalQuestions: 0,
    currentQuizId: null,
  };

  const [loading, setLoading] = useState(true);

  const scorePercent =
    totalQuestions > 0
      ? Math.round((correctAnswers / totalQuestions) * 100)
      : 0;
  const xpEarned = scorePercent;

  useEffect(() => {
    const timer = setTimeout(async () => {
      setLoading(false);

      try {
        // 1. Update XP
        await fetch("/api/v1/progress/xp", {
          method: "POST",
          credentials: "include",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ value: xpEarned }),
        });

        // 2️. Update Streak
        await fetch("/api/v1/progress/streak", {
          method: "POST",
          credentials: "include",
        });

        // 3️. Update Platinum Quiz if 100%
        if (scorePercent === 100 && currentQuizId) {
          const res = await fetch("/api/v1/quiz", {
            method: "GET",
            credentials: "include",
          });
          const quizzes = await res.json();

          const platinumQuiz = quizzes.find(
            (q) => q.quizId === currentQuizId && q.type === "platinum",
          );

          if (platinumQuiz) {
            await fetch(`/api/v1/quiz/${platinumQuiz.id}`, {
              method: "PUT",
              credentials: "include",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({ score: 100 }),
            });
          } else {
            await fetch("/api/v1/quiz", {
              method: "POST",
              credentials: "include",
              headers: { "Content-Type": "application/json" },
              body: JSON.stringify({
                quizId: currentQuizId,
                type: "platinum",
                score: 100,
              }),
            });
          }
        }

        // 4️. Refresh user context so Account page shows updated XP/Streak/Platinum
        if (refreshUser) {
          await refreshUser();
        }
      } catch (err) {
        console.error("Error updating progress:", err);
      }
    }, 4000);

    return () => clearTimeout(timer);
  }, [xpEarned, scorePercent, currentQuizId, refreshUser]);

  const handleTryAnotherQuiz = () => {
    navigate("/quiz-generation");
  };

  if (loading) return <LoadingResult />;

  return (
    <main className="results-page">
      <section className="results-shell">
        <div className="results-hero">
          <header className="results-header">
            <p className="results-eyebrow">Quiz Complete</p>
            <h1 className="results-title">Here are your results</h1>
            <p className="results-subtitle">
              Great work! Review your score and XP earned below.
            </p>
          </header>

          <section className="results-grid" aria-label="Quiz results summary">
            <article className="result-card result-card--pink">
              <p className="result-label">Score</p>
              <p className="result-value">
                {correctAnswers} / {totalQuestions}
              </p>
              <p className="result-help">Correct / Total Questions</p>
            </article>

            <article className="result-card result-card--blue">
              <p className="result-label">XP Earned</p>
              <p className="result-value">{xpEarned} XP</p>
              <p className="result-help">
                XP awarded from your score percentage
              </p>
            </article>

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
