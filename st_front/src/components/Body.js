import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import { UserContext } from "../models/utils/context/UserContext";
import { useContext } from "react";

import Home from "../pages/Home/Home";
import Login from "../pages/Auth/Login";
import Profile from "../pages/Profile/Profile";

export default function Body() {
  const { user } = useContext(UserContext);
  return (
    <Router>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          {user ? (
            <li>
              <Link to="/profile">Profile</Link>
            </li>
          ) : (
            <li>
              <Link to="/login">Login</Link>
            </li>
          )}
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        {user ? (
          <Route path="/profile" element={<Profile />} />
        ) : (
          <Route path="/profile" element={<Login />} />
        )}
      </Routes>
    </Router>
  );
}
