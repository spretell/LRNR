import { NavLink } from "react-router-dom";
import "../styles/footer.css"; // use "./footer.css" if your file lives in components

export default function Footer({ isLoggedIn = false }) {
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
        <div className="footer-right">
          
          <p className="footer-links-title">Links</p>

          <nav className="footer-links" aria-label="Footer navigation">
            <NavLink to="/" className="footer-link">
              Home
            </NavLink>

            {isLoggedIn && (
              <>
                <NavLink to="/account" className="footer-link">
                  Account
                </NavLink>

                <NavLink to="/quiz" className="footer-link">
                  Quiz
                </NavLink>
              </>
            )}
          </nav>
        </div>
      </div>
    </footer>
  );
}