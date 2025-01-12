import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
} from "react-router-dom";
import { useState, useEffect } from "react";
import Cookies from "js-cookie";

// Pages
import Home from "../pages/Home/Home";
import Login from "../pages/Auth/Login";
import Profile from "../pages/Profile/Profile";
import Note from "../pages/Apps/Note";

export default function Body() {
  const [storedToken, setStoredToken] = useState("");

  useEffect(() => {
    const token = Cookies.get("token");
    if (token) {
      setStoredToken(token);
    }
  }, []);

  return (
    <Router>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          {storedToken ? (
            <>
              <li>
                <Link to="/profile">Profile</Link>
              </li>
              <li>
                <Link to="/note">Note</Link>
              </li>
            </>
          ) : (
            <li>
              <Link to="/login">Login</Link>
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
            <Route path="/login" element={<Navigate to="/profile" replace />} />
          </>
        ) : (
          <>
            <Route path="/profile" element={<Navigate to="/login" replace />} />
            <Route path="/login" element={<Login />} />
          </>
        )}
      </Routes>
    </Router>
  );
}
