import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./components/ProtectedRoute";

import Navbar from "./components/navbar";
import Footer from "./components/footer";

import Home from "./pages/Home";
import Auth from "./pages/Auth";
import Account from "./pages/Account";
import QuizGeneration from "./pages/QuizGeneration";
import QuizPage from "./pages/QuizPage";
import Results from "./pages/Results";
import NotFound from "./pages/NotFound";

function App() {
  return (
    <Router>
      <Navbar />

      <Routes>
        {/* public routes */}
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth />} />

        {/* protected routes */}
        <Route
          path="/account"
          element={
            <ProtectedRoute>
              <Account />
            </ProtectedRoute>
          }
        />

        <Route
          path="/quiz-generation"
          element={
            <ProtectedRoute>
              <QuizGeneration />
            </ProtectedRoute>
          }
        />

        <Route
          path="/quiz"
          element={
            <ProtectedRoute>
              <QuizPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/results"
          element={
            <ProtectedRoute>
              <Results />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<NotFound />}
         />
      </Routes>

      <Footer />
    </Router>
  );
}

export default App;
