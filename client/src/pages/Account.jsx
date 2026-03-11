import { useMemo } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/account.css";
import { useAuth } from "../context/AuthContext";

export default function Account() {
  // React Router navigation (used for the CTA button)
  const navigate = useNavigate();

  const { user, loading, isAuthenticated } = useAuth();

  // Button click -> takes user to quiz generator route
  const goToQuizGenerator = () => {
    navigate("/quiz-generation");
  };

  // console.log(user);

  const getNextLevelXp = (level) => {
 
    return (level + 1) * 100;
  };

  /*
   - useMemo prevents recalculating on every render
   - also protects against user being undefined while loading
   */
  const dashboard = useMemo(() => {
    const safeUser = user || {};

    const level = Number(safeUser.level ?? 1);
    const nextLevel = level + 1;

    const xp = Number(safeUser.experience_points ?? 0);
    const nextLevelXp = getNextLevelXp(level);

    // Keep XP progress within bounds so the bar doesn't overflow
    const clampedXp = Math.min(Math.max(xp, 0), nextLevelXp);
    const xpPercent = nextLevelXp > 0 ? Math.round((clampedXp / nextLevelXp) * 100) : 0;

    return {
      firstName: safeUser.first_name ?? "there",
      platinumQuizzes: Number(safeUser.platinumQuizzes ?? 0),
      streak: Number(safeUser.streak ?? 0),
      xp,
      level,
      nextLevel,
      nextLevelXp,
      xpPercent,
    };
  }, [user]);


  if (loading) {
    return (
      <main className="account-page">
        <section className="account-shell">
          <div className="account-hero">
            <p className="account-subtitle">Loading your dashboard...</p>
          </div>
        </section>
      </main>
    );
  }

  return (
    <main className="account-page">
      {/* Keeps content centered and prevents it from stretching too wide */}
      <section className="account-shell">
        {/* Main container with the same gradient feel as the home hero card */}
        <div className="account-hero">
          {/* Welcome section */}
          <header className="account-header">
            <h1 className="account-welcome">
              Hi, <span className="account-name">{dashboard.firstName}</span> !
            </h1>
            <p className="account-subtitle">
              Welcome back to your dashboard: here's your progress so far
            </p>
          </header>

          <section className="account-stats" aria-label="User stats">
            {/* Card 1: Platinum quizzes */}
            <article className="stat-card stat-card--pink">
              <p className="stat-label">Platinum Quizzes</p>
              <p className="stat-value">{dashboard.platinumQuizzes}</p>
              <p className="stat-help">Completed</p>

              {/*how it works */}
              <div className="stat-subsection">
                <p className="stat-subtitle">How it works</p>
                <p className="stat-detail">
                  Platinum quizzes are earned when you score <strong>100%</strong> on a quiz.
                </p>
              </div>
            </article>

            {/* Card 2: XP */}
            <article className="stat-card stat-card--gray">
              <p className="stat-label">Level (XP)</p>

              <p className="stat-value">
                Level {dashboard.level}
              </p>

              <p className="stat-help">
                {Math.min(dashboard.xp, dashboard.nextLevelXp)}/{dashboard.nextLevelXp} XP to Level {dashboard.nextLevel}
              </p>

              {/* progress bar */}
              <div className="xp-bar" aria-label="XP progress">
                <div className="xp-bar-fill" style={{ width: `${dashboard.xpPercent}%` }} />
              </div>

              {/* how it works */}
              <div className="stat-subsection">
                <p className="stat-subtitle">How it works</p>
                <p className="stat-detail">
                  Earn XP by completing quizzes. Higher scores (and harder quizzes) can award more XP.
                </p>
              </div>
            </article>

            {/* Card 3: Streak */}
            <article className="stat-card stat-card--purple">
              <p className="stat-label">Streak</p>
              <p className="stat-value">{dashboard.streak}</p>
              <p className="stat-help">Days in a row</p>

              {/* how it works */}
              <div className="stat-subsection">
                <p className="stat-subtitle">How it works</p>
                <p className="stat-detail">
                  Your streak increases when you complete at least <strong>one quiz per day</strong>.
                  Missing a day resets your streak.
                </p>
              </div>
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