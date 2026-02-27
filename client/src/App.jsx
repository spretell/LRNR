import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/navbar";
import Footer from "./components/footer";

import Home from "./pages/Home";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import QuizGeneration from "./pages/QuizGeneration";
import Quiz from "./pages/Quiz";
import Results from "./pages/Results";

function App() {
  const isLoggedIn = false;

  return (
    <Router>
      <Navbar isLoggedIn={isLoggedIn} />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/quiz-generation" element={<QuizGeneration />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/results" element={<Results />} />
      </Routes>

      <Footer isLoggedIn={isLoggedIn} />
    </Router>
  );
}

export default App;