// Auth.jsx
// login + create account page

import { useEffect, useMemo, useState } from "react";
import { useNavigate } from "react-router-dom";
import { Eye, EyeOff } from "lucide-react";
import { useAuth } from "../context/AuthContext";
import "../styles/Auth.css";

export default function Auth() {
  const navigate = useNavigate();
  const { login, signup, isAuthenticated } = useAuth();

  const [mode, setMode] = useState("login");

  // login fields
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  // signup fields
  const [email, setEmail] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  // password visibility
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // ui state
  const [serverError, setServerError] = useState("");
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    if (isAuthenticated) {
      navigate("/account", { replace: true });
    }
  }, [isAuthenticated, navigate]);

  const uiError = useMemo(() => {
    if (serverError) return serverError;

    if (password && password.length < 6) {
      return "Password must be at least 6 characters.";
    }

    if (
      mode === "signup" &&
      password &&
      confirmPassword &&
      password !== confirmPassword
    ) {
      return "Passwords do not match.";
    }

    return "";
  }, [serverError, password, confirmPassword, mode]);

  const canSubmit = useMemo(() => {
    if (submitting) return false;
    if (!password || password.length < 6) return false;

    if (mode === "login") {
      return !!username.trim();
    }

    if (!firstName.trim()) return false;
    if (!lastName.trim()) return false;
    if (!email.trim()) return false;
    if (!username.trim()) return false;
    if (!confirmPassword) return false;
    if (password !== confirmPassword) return false;

    return true;
  }, [
    submitting,
    mode,
    username,
    firstName,
    lastName,
    email,
    password,
    confirmPassword,
  ]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setServerError("");

    try {
      setSubmitting(true);

      if (mode === "login") {
        await login(username.trim(), password);
        navigate("/account");
        return;
      }

      await signup({
        username: username.trim(),
        first_name: firstName.trim(),
        last_name: lastName.trim(),
        email: email.trim(),
        password,
      });

      navigate("/account");
    } catch (err) {
      setServerError(err.message || "Something went wrong.");
    } finally {
      setSubmitting(false);
    }
  };

  const switchMode = (nextMode) => {
    setMode(nextMode);
    setServerError("");
    setPassword("");
    setConfirmPassword("");
    setShowPassword(false);
    setShowConfirmPassword(false);
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
                onClick={() => switchMode("login")}
                aria-selected={mode === "login"}
              >
                Log in
              </button>

              <button
                type="button"
                className={`auth-toggleBtn ${mode === "signup" ? "is-active" : ""}`}
                onClick={() => switchMode("signup")}
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
                  ? "Enter your username and password to continue."
                  : "Enter your info to create an account."}
              </p>
            </div>

            <div className="auth-signupFields" aria-hidden={mode !== "signup"}>
              <div className="auth-field">
                <label className="auth-label" htmlFor="firstName">
                  First name
                </label>
                <input
                  id="firstName"
                  className="auth-input"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  placeholder="ex: John"
                  autoComplete="given-name"
                  disabled={mode !== "signup"}
                />
              </div>

              <div className="auth-field">
                <label className="auth-label" htmlFor="lastName">
                  Last name
                </label>
                <input
                  id="lastName"
                  className="auth-input"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  placeholder="ex: Doe"
                  autoComplete="family-name"
                  disabled={mode !== "signup"}
                />
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
                  disabled={mode !== "signup"}
                />
              </div>
            </div>

            <div className="auth-field">
              <label className="auth-label" htmlFor="username">
                Username
              </label>
              <input
                id="username"
                className="auth-input"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                placeholder="ex: johndoe"
                autoComplete="username"
              />
            </div>

            <div className="auth-field">
              <label className="auth-label" htmlFor="password">
                Password
              </label>

              <div className="auth-passwordWrapper">
                <input
                  id="password"
                  className="auth-input"
                  type={showPassword ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="••••••••"
                  autoComplete={
                    mode === "login" ? "current-password" : "new-password"
                  }
                />

                <button
                  type="button"
                  className="auth-eyeBtn"
                  onClick={() => setShowPassword((prev) => !prev)}
                  aria-label={showPassword ? "Hide password" : "Show password"}
                  aria-pressed={showPassword}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className="auth-confirmWrap" aria-hidden={mode !== "signup"}>
              <div className="auth-field">
                <label className="auth-label" htmlFor="confirmPassword">
                  Confirm password
                </label>

                <div className="auth-passwordWrapper">
                  <input
                    id="confirmPassword"
                    className="auth-input"
                    type={showConfirmPassword ? "text" : "password"}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="••••••••"
                    autoComplete="new-password"
                    disabled={mode !== "signup"}
                  />

                  <button
                    type="button"
                    className="auth-eyeBtn"
                    onClick={() => setShowConfirmPassword((prev) => !prev)}
                    aria-label={
                      showConfirmPassword
                        ? "Hide confirm password"
                        : "Show confirm password"
                    }
                    aria-pressed={showConfirmPassword}
                    disabled={mode !== "signup"}
                  >
                    {showConfirmPassword ? (
                      <EyeOff size={18} />
                    ) : (
                      <Eye size={18} />
                    )}
                  </button>
                </div>
              </div>
            </div>

            {uiError && (
              <p className="auth-error" role="alert">
                {uiError}
              </p>
            )}

            <button className="auth-btn" type="submit" disabled={!canSubmit}>
              {submitting
                ? mode === "login"
                  ? "Logging in..."
                  : "Creating account..."
                : mode === "login"
                  ? "Log in"
                  : "Create account"}
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
