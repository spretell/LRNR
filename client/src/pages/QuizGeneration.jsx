// QuizGeneration.jsx

// collects user preferences (topic, difficulty, # of questions, style) and sends to backend to generate quiz

import { useState } from "react";
import "../styles/QuizGeneration.css";
import { useNavigate } from "react-router-dom";

// set connect this topics so gemini can access them!!
const TOPIC_SUGGESTIONS = [
  "Javascript",
  "React",
  "Node",
  "Html",
  "CSS",
  "Accessibility",
  "Git",
  "API design",
  "sql",
  "AWS",
];

// set how all this values connect to the api
const DIFFICULTY_OPTIONS = ["Beginner", "Intermediate", "Advanced", "Expert"];

// uses this values for the gemini api
const STYLE_OPTIONS = [
  { value: "normal", label: "normal" },
  { value: "like-im-8", label: "like I’m 8" },
  { value: "jedi", label: "jedi" },
  { value: "ogway", label: "master ogway" },
  { value: "gangster-40s", label: "1940s gangster" },
];

export default function QuizGeneration() {
  const [topic, setTopic] = useState("");
  const [topicDropdown, setTopicDropdown] = useState("");
  const [difficulty, setDifficulty] = useState("Beginner");
  const [numQuestions, setNumQuestions] = useState(5);
  const [style, setStyle] = useState("normal");
  const [customStyle, setCustomStyle] = useState("");

  const navigate = useNavigate();

  const handleTopicDropdownChange = (value) => {
    setTopicDropdown(value);
    setTopic(value);
  };

  const handleGenerate = async (e) => {
    e.preventDefault();

    // payload
    const payload = {
      topic,
      difficulty,
      questionCount: numQuestions,
      type: customStyle ? customStyle : style,
    };

    try {
      const response = await fetch(
        "http://localhost:5050/api/v1/quiz/generate",
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(payload),
        },
      );

      const data = await response.json();

      console.log("json returned from backend:", data);

      // navigate to quiz page with actual data
      navigate("/quiz", { state: { quiz: data.quiz } });
    } catch (error) {
      console.error("failed to generate quiz", error);
      alert("error check console for details.");
    }
  };

  return (
    <main className="qg-page">
      <section className="qg-card">
        <div className="qg-grid">
          <div className="qg-left">
            <h1 className="qg-title">Build your next quiz in seconds</h1>

            <p className="qg-subtitle">
              Pick a topic, difficulty, and number of questions. You can choose
              a suggested topic or type your own. Then generate a quiz powered
              by AI.
            </p>

            <ul className="qg-list">
              <li>Suggested topics + custom topic search</li>
              <li>Beginner-friendly difficulty levels</li>
              <li>Style options</li>
              <li>Designed to match your LRNR style</li>
            </ul>
          </div>

          <div className="qg-rightShell">
            <form className="qg-right" onSubmit={handleGenerate}>
              <details className="qg-item" open>
                <summary className="qg-summary">
                  <div>
                    <p className="qg-label">Topic</p>
                    <p className="qg-value">
                      {topic
                        ? topic
                        : "Choose a suggested topic or type your own"}
                    </p>
                  </div>
                  <span className="qg-chevron" aria-hidden="true">
                    ⌄
                  </span>
                </summary>

                <div className="qg-body">
                  <label className="qg-fieldLabel" htmlFor="topic-select">
                    Suggested topics
                  </label>
                  <select
                    id="topic-select"
                    className="qg-select"
                    value={topicDropdown}
                    onChange={(e) => handleTopicDropdownChange(e.target.value)}
                  >
                    <option value="">Select a topic…</option>
                    {TOPIC_SUGGESTIONS.map((t) => (
                      <option key={t} value={t}>
                        {t}
                      </option>
                    ))}
                  </select>

                  <label className="qg-fieldLabel" htmlFor="topic-input">
                    Or type your own topic
                  </label>
                  <input
                    id="topic-input"
                    className="qg-input"
                    value={topic}
                    onChange={(e) => {
                      setTopic(e.target.value);
                      setTopicDropdown("");
                    }}
                    placeholder="ex: react hooks, arrays, APIs..."
                  />
                </div>
              </details>

              <details className="qg-item">
                <summary className="qg-summary">
                  <div>
                    <p className="qg-label">Difficulty</p>
                    <p className="qg-value">{difficulty}</p>
                  </div>
                  <span className="qg-chevron" aria-hidden="true">
                    ⌄
                  </span>
                </summary>

                <div className="qg-body">
                  <label className="qg-fieldLabel" htmlFor="difficulty-select">
                    Select difficulty
                  </label>

                  <select
                    id="difficulty-select"
                    className="qg-select"
                    value={difficulty}
                    onChange={(e) => setDifficulty(e.target.value)}
                  >
                    {DIFFICULTY_OPTIONS.map((lvl) => (
                      <option key={lvl} value={lvl}>
                        {lvl}
                      </option>
                    ))}
                  </select>
                </div>
              </details>

              <details className="qg-item">
                <summary className="qg-summary">
                  <div>
                    <p className="qg-label">Number of questions</p>
                    <p className="qg-value">{numQuestions}</p>
                  </div>
                  <span className="qg-chevron" aria-hidden="true">
                    ⌄
                  </span>
                </summary>

                <div className="qg-body">
                  <label className="qg-fieldLabel" htmlFor="num-questions">
                    Choose how many questions
                  </label>

                  <select
                    id="num-questions"
                    className="qg-select"
                    value={numQuestions}
                    onChange={(e) => setNumQuestions(Number(e.target.value))}
                  >
                    <option value={5}>5</option>
                    <option value={10}>10</option>
                    <option value={15}>15</option>
                  </select>
                </div>
              </details>

              <details className="qg-item">
                <summary className="qg-summary">
                  <div>
                    <p className="qg-label">Style</p>
                    <p className="qg-value">
                      {customStyle
                        ? customStyle
                        : STYLE_OPTIONS.find((s) => s.value === style)?.label}
                    </p>
                  </div>
                  <span className="qg-chevron" aria-hidden="true">
                    ⌄
                  </span>
                </summary>

                <div className="qg-body">
                  <label className="qg-fieldLabel" htmlFor="style">
                    Choose a style
                  </label>

                  <select
                    id="style"
                    className="qg-select"
                    value={style}
                    onChange={(e) => {
                      setStyle(e.target.value);
                      setCustomStyle("");
                    }}
                  >
                    {STYLE_OPTIONS.map((s) => (
                      <option key={s.value} value={s.value}>
                        {s.label}
                      </option>
                    ))}
                  </select>

                  <label className="qg-fieldLabel" htmlFor="custom-style">
                    Or type your own style
                  </label>

                  <input
                    id="custom-style"
                    className="qg-input"
                    value={customStyle}
                    onChange={(e) => setCustomStyle(e.target.value)}
                    placeholder="ex: pirate captain, sarcastic teacher, medieval knight..."
                  />
                </div>
              </details>

              <div className="qg-actions">
                <button className="qg-btn" type="submit">
                  Generate Quiz
                </button>
              </div>
            </form>
          </div>
        </div>
      </section>
    </main>
  );
}
