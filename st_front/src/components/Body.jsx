import { useState, useEffect, useContext } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
} from "react-router-dom";
import Cookies from "js-cookie";
import { UserContext } from "../models/utils/context/UserContext";

// Pages
import Home from "../pages/Home/Home";
import Login from "../pages/Auth/Login";
import Profile from "../pages/Profile/Profile";
import Note from "../pages/Apps/Note";
import AppPlante from "../pages/Apps/Plante";

export default function Body() {
  const [storedToken, setStoredToken] = useState("");
  const { theme } = useContext(UserContext);
  const [isNavOpen, setIsNavOpen] = useState(false);

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      setStoredToken(token);
    }
  }, []);

  const closeNav = () => {
    setIsNavOpen(false);
  };

  return (
    <Router>
      <div className={`theme-${theme}`}>
        <nav>
          <input
            type="checkbox"
            id="nav-toggle"
            checked={isNavOpen}
            onChange={() => setIsNavOpen(!isNavOpen)}
            className="nav-toggle"
          />
          <label htmlFor="nav-toggle" className="burger-icon">
            <span></span>
            <span></span>
            <span></span>
          </label>
          <img src="./logo.jpg" />
          <ul className={`nav-menu ${isNavOpen ? "show-nav" : ""}`}>
            <li>
              <Link to="/" onClick={closeNav}>
                Home
              </Link>
            </li>
            {storedToken ? (
              <>
                <li>
                  <Link to="/profile" onClick={closeNav}>
                    Profile
                  </Link>
                </li>
                <li>
                  <Link to="/note" onClick={closeNav}>
                    Note
                  </Link>
                </li>
                <li>
                  <Link to="/plante" onClick={closeNav}>
                    Plantes
                  </Link>
                </li>
              </>
            ) : (
              <li>
                <Link to="/login" onClick={closeNav}>
                  Login
                </Link>
              </li>
            )}
          </ul>
        </nav>
        <Routes>
          <Route path="/" element={<Home />} />
          {storedToken ? (
            <>
              <Route path="/profile" element={<Profile />} />
              <Route path="/note" element={<Note />} />
              <Route path="/plante" element={<AppPlante />} />
              <Route
                path="/login"
                element={<Navigate to="/profile" replace />}
              />
            </>
          ) : (
            <>
              <Route
                path="/profile"
                element={<Navigate to="/login" replace />}
              />
              <Route path="/login" element={<Login />} />
            </>
          )}
        </Routes>
      </div>
    </Router>
  );
}
