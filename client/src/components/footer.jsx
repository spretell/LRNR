import { NavLink } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../styles/footer.css";

export default function Footer() {
  const { isAuthenticated } = useAuth();

  return (
    <footer className="footer">
      <div className="footer-container">
        {/* LEFT SECTION */}
        <div className="footer-left">
          <img
            className="footer-logo"
            src="/images/LRNR-logo.png"
            alt="LRNR logo"
          />

          <p className="footer-copy">
            © {new Date().getFullYear()} LRNR. All rights reserved.
          </p>

          <p className="footer-tagline">
            Unlock your potential — one quiz at a time.
          </p>
        </div>

        {/* RIGHT SECTION */}
        {isAuthenticated && (
          <div className="footer-right">
            <p className="footer-links-title">Helpful Links:</p>

            <nav className="footer-links" aria-label="Footer navigation">
              <NavLink to="/account" className="footer-link">
                Home
              </NavLink>

              <NavLink to="/account" className="footer-link">
                Account
              </NavLink>

              <NavLink to="/quiz-generation" className="footer-link">
                Quiz
              </NavLink>
            </nav>
          </div>
        )}
      </div>
    </footer>
  );
}
