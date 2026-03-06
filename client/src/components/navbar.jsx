import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import "../styles/navbar.css";

/* i did ONE component for logged-out vs logged-in view*/
export default function Navbar() {
  const [menuOpen, setMenuOpen] = useState(false);
  const navigate = useNavigate();

  // pull auth state from context (no more prop drilling)
  const { logout, isAuthenticated, loading } = useAuth();

  //  don't show the "logged out" navbar while auth is still loading
  const showLoggedInNav = !loading && isAuthenticated;

  // Close the drawer
  const closeMenu = () => setMenuOpen(false);

  // Toggle drawer open/close
  const toggleMenu = () => setMenuOpen((prev) => !prev);

  // Close drawer on Escape key
  useEffect(() => {
    const handleKeyDown = (e) => {
      if (e.key === "Escape") closeMenu();
    };

    if (menuOpen) window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [menuOpen]);

  // Prevent body scroll when drawer is open
  useEffect(() => {
    document.body.style.overflow = menuOpen ? "hidden" : "";
    return () => {
      document.body.style.overflow = "";
    };
  }, [menuOpen]);

  // NavLink active class for "current page" indicator
  const navLinkClass = ({ isActive }) =>
    isActive ? "nav-link active" : "nav-link";

  const handleLogout = async () => {
    try {
      await logout();
      closeMenu();
      navigate("/auth");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  const handleLogin = () => {
    closeMenu();
    navigate("/auth");
  };

  return (
    <nav className="navbar">
      <div className="nav-container">
        {/* LOGO */}
        <NavLink to="/" className="logo-link" onClick={closeMenu}>
          <img className="logo-img" src="/images/LRNR-logo.png" alt="LRNR logo" />
        </NavLink>

        {/* DESKTOP NAV */}
        <div className="nav-links nav-links--desktop">
          {/*show a small placeholder while auth is still loading*/}
          {loading ? (
            <span className="nav-loading">Loading...</span>
          ) : showLoggedInNav ? (
            <>
              <NavLink to="/quiz" className={navLinkClass}>
                Quiz
              </NavLink>

              <NavLink to="/account" className={navLinkClass}>
                Account
              </NavLink>

              <button className="primary-btn" type="button" onClick={handleLogout}>
                Logout
              </button>
            </>
          ) : (
            <button className="primary-btn" type="button" onClick={handleLogin}>
              Login
            </button>
          )}
        </div>

        {/* HAMBURGER (mobile only) */}
        <button
          className="hamburger"
          type="button"
          aria-label={menuOpen ? "Close menu" : "Open menu"}
          aria-expanded={menuOpen}
          aria-controls="mobile-nav-drawer"
          onClick={toggleMenu}
        >
          <span className="hamburger-lines" aria-hidden="true">
            <span />
            <span />
            <span />
          </span>
        </button>

        {/* OVERLAY (click to close) */}
        <div
          className={menuOpen ? "overlay overlay--show" : "overlay"}
          onClick={closeMenu}
          aria-hidden={!menuOpen}
        />

        {/* MOBILE DRAWER */}
        <aside
          id="mobile-nav-drawer"
          className={menuOpen ? "drawer drawer--open" : "drawer"}
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation"
        >
          <div className="drawer-top">
            {/* Drawer logo */}
            <NavLink to="/" className="drawer-logo-link" onClick={closeMenu}>
              <img
                className="drawer-logo-img"
                src="/images/LRNR-logo.png"
                alt="LRNR logo"
              />
            </NavLink>

            {/* Close (X) */}
            <button
              className="drawer-close"
              type="button"
              aria-label="Close menu"
              onClick={closeMenu}
            >
              ×
            </button>
          </div>

          <div className="drawer-links">
            {/* prevent showing logged-out drawer while auth is loading */}
            {loading ? (
              <span className="nav-loading">Loading...</span>
            ) : showLoggedInNav ? (
              <>
                <NavLink to="/quiz" className={navLinkClass} onClick={closeMenu}>
                  Quiz
                </NavLink>

                <NavLink to="/account" className={navLinkClass} onClick={closeMenu}>
                  Account
                </NavLink>

                <button
                  className="primary-btn drawer-btn"
                  type="button"
                  onClick={handleLogout}
                >
                  Logout
                </button>
              </>
            ) : (
              <button className="primary-btn drawer-btn" type="button" onClick={handleLogin}>
                Login
              </button>
            )}
          </div>
        </aside>
      </div>
    </nav>
  );
}