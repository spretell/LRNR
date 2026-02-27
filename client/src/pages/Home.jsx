import { useNavigate } from "react-router-dom";
import ParticleSphere from "../components/ParticleSphere";
import "../styles/Home.css";

function Home() {
  const navigate = useNavigate();

  return (
    <main className="home-page">
      <section className="hero-card">
        <div className="hero-content">
          <h1 className="hero-title">
            Your guided path to programming enlightenment
          </h1>

          <p className="hero-subtitle">
            Generate personalized quizzes by topic and difficulty. Practice
            smarter and track your progress.
          </p>

          <div className="hero-buttons">
            <button className="primary-btn" onClick={() => navigate("/quiz")}>
              Get Started
            </button>
          </div>

          <div className="sphere-container" aria-hidden="true">
            <ParticleSphere />
          </div>

          <p className="cta-caption">Quizzes powered by AI</p>
        </div>
      </section>
    </main>
  );
}

export default Home;
