// starter code for App.jsx

// main app component that sets up routing for the quiz application

// import necessary components from react-router-dom for routing
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

// page imports
import Home from "./pages/Home";
import Auth from "./pages/Auth";
import Dashboard from "./pages/Dashboard";
import QuizGeneration from "./pages/QuizGeneration";
import Quiz from "./pages/Quiz";
import Results from "./pages/Results";

// main application component
function App() {
  return (
    <Router>
      <Routes>
        {/* define routes for the application ; each route corresponds to a page component */}
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/dashboard" element={<Dashboard />} />
        <Route path="/quiz-generation" element={<QuizGeneration />} />
        <Route path="/quiz" element={<Quiz />} />
        <Route path="/results" element={<Results />} />
      </Routes>
    </Router>
  );
}

// export the App component as the default export so it can be imported in main.jsx
export default App;
