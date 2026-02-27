// Auth.jsx

// login + create account page ; collects user credentials and sends to backend for authentication

import { useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import "../styles/Auth.css";

export default function Auth() {
  const navigate = useNavigate();

  // toggle between login and signup
  const [mode, setMode] = useState("login"); // "login" | "signup"

  // shared fields
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  // signup-only fields
  const [name, setName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // simple UI-only validation (no backend yet)
  const validationMessage = useMemo(() => {
    if (!email || !password) return "";
    if (mode === "signup" && password !== confirmPassword)
      return "Passwords do not match.";
    if (password.length > 0 && password.length < 6)
      return "Password should be at least 6 characters.";
    return "";
  }, [email, password, confirmPassword, mode]);

  const canSubmit = useMemo(() => {
    if (!email || !password) return false;
    if (mode === "signup") {
      if (!name) return false;
      if (!confirmPassword) return false;
      if (password !== confirmPassword) return false;
    }
    if (password.length < 6) return false;
    return true;
  }, [email, password, confirmPassword, name, mode]);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Later:
    // - login: POST /api/auth/login
    // - signup: POST /api/auth/signup
    // For now, just demo navigation.
    console.log({ mode, name, email, password });

    // pretend auth success → go to dashboard/home
    navigate("/dashboard");
  };

  return (
    <main className="auth-page">
      <section className="auth-card" aria-label="Authentication">
        <div className="auth-grid">
          {/* LEFT: Branding + explanation */}
          <div className="auth-left">
            <p className="auth-kicker">Welcome to LRNR</p>

            <h1 className="auth-title">
              {mode === "login"
                ? "Log in to keep your streak going"
                : "Create an account to start leveling up"}
            </h1>

            <p className="auth-subtitle">
              {mode === "login"
                ? "Pick up right where you left off. Your quizzes, XP, and progress are waiting."
                : "Track streaks, collect XP, and save your best quizzes — all powered by AI."}
            </p>

            <ul className="auth-bullets">
              <li>Streak tracking + XP leveling</li>
              <li>Platinum quiz list (100% scores)</li>
              <li>Personalized quizzes by topic + difficulty</li>
            </ul>

            <div className="auth-switchRow">
              <button
                type="button"
                className={`auth-modeBtn ${mode === "login" ? "is-active" : ""}`}
                onClick={() => setMode("login")}
              >
                Log in
              </button>
              <button
                type="button"
                className={`auth-modeBtn ${mode === "signup" ? "is-active" : ""}`}
                onClick={() => setMode("signup")}
              >
                Create account
              </button>
            </div>

            <p className="auth-footnote">Quizzes powered by AI</p>
          </div>

          {/* RIGHT: Form */}
          <form className="auth-right" onSubmit={handleSubmit}>
            <div className="auth-formHeader">
              <h2 className="auth-formTitle">
                {mode === "login" ? "Log in" : "Create account"}
              </h2>
              <p className="auth-formHint">
                {mode === "login"
                  ? "Use your email and password."
                  : "Use a real email — you’ll need it later."}
              </p>
            </div>

            {mode === "signup" && (
              <div className="auth-field">
                <label className="auth-label" htmlFor="name">
                  Name
                </label>
                <input
                  id="name"
                  className="auth-input"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="ex: Stephanie"
                  autoComplete="name"
                />
              </div>
            )}

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

            {mode === "signup" && (
              <div className="auth-field">
                <label className="auth-label" htmlFor="confirm">
                  Confirm password
                </label>
                <input
                  id="confirm"
                  className="auth-input"
                  type="password"
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                  placeholder="••••••••"
                  autoComplete="new-password"
                />
              </div>
            )}

            {validationMessage && (
              <p className="auth-error" role="alert">
                {validationMessage}
              </p>
            )}

            <button className="auth-btn" type="submit" disabled={!canSubmit}>
              {mode === "login" ? "Log in" : "Create account"}
            </button>

            <div className="auth-helperRow">
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
