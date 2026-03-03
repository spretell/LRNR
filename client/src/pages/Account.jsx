import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/account.css";

export default function Account() {
  // React Router navigation (used for the CTA button)
  const navigate = useNavigate();

  // Placeholder user data (later this will come from the backend)
  const user = useMemo(
    () => ({
      firstName: "Brittany", // TODO: replace with real user name from API/auth
      streaks: 7,
      platinumQuizzes: 12,
      xp: 2450,
    }),
    []
  );

  // Button click -> takes user to quiz generator route
  const goToQuizGenerator = () => {
    navigate("/quiz-generation");
  };

  return (
    <main className="account-page">
      {/* Keeps content centered and prevents it from stretching too wide */}
      <section className="account-shell">
        {/* Main container with the same gradient feel as the home hero card */}
        <div className="account-hero">
          {/* Welcome section */}
          <header className="account-header">
            <h1 className="account-welcome">
              Hi, <span className="account-name">{user.firstName}</span> !
            </h1>
            <p className="account-subtitle">
              Welcome back to your dashboard: here's your progress so far
            </p>
          </header>

          <section className="account-stats" aria-label="User stats">

            {/* Card 1: Platinum quizzes */}
            <article className="stat-card stat-card--pink">
              <p className="stat-label">Platinum Quizzes</p>
              <p className="stat-value">{user.platinumQuizzes}</p>
              <p className="stat-help">Completed</p>
            </article>

            {/* Card 2: XP */}
            <article className="stat-card stat-card--gray">
              <p className="stat-label">Level (XP)</p>
              <p className="stat-value">{user.xp}</p>
              <p className="stat-help">Total points</p>
            </article>
            {/* Card 3: Streak */}
            <article className="stat-card stat-card--purple">
              <p className="stat-label">Streak</p>
              <p className="stat-value">{user.streaks}</p>
              <p className="stat-help">Days in a row</p>
            </article>
          </section>

          {/*button to quiz generator*/}
          <section className="account-cta">
            <p className="account-cta-text">
              Ready for your next quiz? Generate one in seconds.
            </p>

           
            <button className="primary-btn" type="button" onClick={goToQuizGenerator}>
              Go to Quiz Generator
            </button>
          </section>
        </div>
      </section>
    </main>
  );
}