import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  Navigate,
} from "react-router-dom";
import { useContext } from "react";
import { UserContext } from "../models/utils/context/UserContext";
import Home from "../pages/Home/Home";
import Login from "../pages/Auth/Login";
import Profile from "../pages/Profile/Profile";

export default function Body() {
  const token = document.cookie;
  const { logOut } = useContext(UserContext);

  return (
    <Router>
      <nav>
        <ul>
          <li>
            <Link to="/">Home</Link>
          </li>
          {token ? (
            <li>
              <Link to="/profile">Profile</Link>
            </li>
          ) : (
            <li>
              <Link to="/login">Login</Link>
            </li>
          )}
          <li>
            <button onClick={logOut} type="button">
              Logout
            </button>
          </li>
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        {token ? (
          <Route path="/profile" element={<Profile />} />
        ) : (
          <Route path="/profile" element={<Navigate to="/login" replace />} />
        )}
      </Routes>
    </Router>
  );
}
