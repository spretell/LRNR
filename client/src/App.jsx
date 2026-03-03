import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Navbar from "./components/navbar"; 

import Home from "./pages/Home";
import QuizGeneration from "./pages/QuizGeneration";
import Quiz from "./pages/Quiz";
import Results from "./pages/Results";
import Account from "./pages/Account";

function App() {
  const isLoggedIn = true; 

  return (
    <Router>
      <Navbar isLoggedIn={isLoggedIn} /> 

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/quiz-generation" element={<QuizGeneration />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/results" element={<Results />} />
        <Route path="/account" element={<Account />} />
      </Routes>
    </Router>
  );
}

export default App;
