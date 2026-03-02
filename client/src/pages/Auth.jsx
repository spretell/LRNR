// Auth.jsx

// login + create account page

import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Auth.css";

export default function Auth() {
  const navigate = useNavigate();

  const [mode, setMode] = useState("login");

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const [name, setName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const uiError = useMemo(() => {
    if (!email && !password) return "";
    if (password && password.length < 6)
      return "Password must be at least 6 characters.";
    if (mode === "signup" && password !== confirmPassword)
      return "Passwords do not match.";
    return "";
  }, [email, password, confirmPassword, mode]);

  const canSubmit = useMemo(() => {
    if (!email || !password) return false;
    if (password.length < 6) return false;
    if (mode === "signup") {
      if (!name) return false;
      if (!confirmPassword) return false;
      if (password !== confirmPassword) return false;
    }
    return true;
  }, [email, password, confirmPassword, name, mode]);

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log({ mode, name, email, password });

    navigate("/account");
  };

  return (
    <main className="auth-page">
      <section
        className={`auth-card ${mode === "signup" ? "card-signup" : "card-login"}`}
        aria-label="Login or create account"
      >
        <div className="auth-grid">
          <div className="auth-left">
            <h1 className="auth-title">
              {mode === "login"
                ? "Welcome back. Keep your streak alive."
                : "Create your account and start leveling up."}
            </h1>

            <p className="auth-subtitle">
              {mode === "login"
                ? "Log in to access your progress, XP, and saved quiz history."
                : "Track your streak, collect XP, and save your best quiz scores."}
            </p>

            <ul className="auth-bullets" aria-label="Benefits">
              <li>Streak tracking + XP leveling</li>
              <li>Platinum quizzes (100% scores)</li>
              <li>Personalized quizzes by topic + difficulty</li>
            </ul>

            <div className="auth-toggle" role="tablist" aria-label="Auth mode">
              <button
                type="button"
                className={`auth-toggleBtn ${mode === "login" ? "is-active" : ""}`}
                onClick={() => setMode("login")}
                aria-selected={mode === "login"}
              >
                Log in
              </button>

              <button
                type="button"
                className={`auth-toggleBtn ${mode === "signup" ? "is-active" : ""}`}
                onClick={() => setMode("signup")}
                aria-selected={mode === "signup"}
              >
                Create account
              </button>
            </div>
          </div>

          <form
            className={`auth-right ${mode === "signup" ? "is-signup" : "is-login"}`}
            onSubmit={handleSubmit}
          >
            <div className="auth-formHeader">
              <h2 className="auth-formTitle">
                {mode === "login" ? "Log in" : "Create account"}
              </h2>
              <p className="auth-formHint">
                {mode === "login"
                  ? "Enter your email and password to continue."
                  : "Enter your info to create an account."}
              </p>
            </div>

            <div className="auth-signupFields" aria-hidden={mode !== "signup"}>
              <div className="auth-field">
                <label className="auth-label" htmlFor="name">
                  Name
                </label>
                <input
                  id="name"
                  className="auth-input"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="ex: John Doe"
                  autoComplete="name"
                  disabled={mode !== "signup"}
                />
              </div>

              <div className="auth-field">
                <label className="auth-label" htmlFor="confirmPassword">
                  Confirm password
                </label>
                <input
                  id="confirmPassword"
                  className="auth-input"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  autoComplete="new-password"
                  disabled={mode !== "signup"}
                />
              </div>
            </div>

            <div className="auth-field">
              <label className="auth-label" htmlFor="email">
                Email
              </label>
              <input
                id="email"
                className="auth-input"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@example.com"
                autoComplete="email"
              />
            </div>

            <div className="auth-field">
              <label className="auth-label" htmlFor="password">
                Password
              </label>
              <input
                id="password"
                className="auth-input"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                autoComplete={
                  mode === "login" ? "current-password" : "new-password"
                }
              />
            </div>

            {uiError && (
              <p className="auth-error" role="alert">
                {uiError}
              </p>
            )}

            <button className="auth-btn" type="submit" disabled={!canSubmit}>
              {mode === "login" ? "Log in" : "Create account"}
            </button>

            <div className="auth-links">
              <button
                type="button"
                className="auth-linkBtn"
                onClick={() => alert("Later: add password reset flow")}
              >
                Forgot password?
              </button>

              <button
                type="button"
                className="auth-linkBtn"
                onClick={() => navigate("/")}
              >
                Back to landing
              </button>
            </div>
          </form>
        </div>
      </section>
    </main>
  );
}
