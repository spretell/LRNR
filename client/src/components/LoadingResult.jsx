// Loading Result
import { useState, useEffect } from "react";
import "../styles/LoadingQuiz.css";

export default function LoadingResult() {
  const messages = [
    "🧠 Generating result...",
    "📚 Preparing your score...",
    "⏳ Almost ready...",
  ];

  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % messages.length);
    }, 2000);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="loading-container">
      <div className="spinner"></div>
      <p className="loading-text">{messages[index]}</p>
    </div>
  );
}
