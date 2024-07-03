import { createContext, useContext, useEffect, useState } from "react";

export const UserContext = createContext();

const API_URL = "http://localhost";
const API_PORT = 8390;

export default function UserContextProvider({ children }) {
  const [theme, setTheme] = useState(() => {
    const storedTheme = localStorage.getItem("theme");
    return storedTheme ? storedTheme : "light";
  });
  const [token, setToken] = useState("");

  useEffect(() => {
    const existingToken = document.cookie.match(/token=([^;]+)/);
    if (existingToken) {
      setToken(existingToken[1]);
    }
  }, []);

  useEffect(() => {
    localStorage.setItem("theme", theme);
  }, [theme]);

  const authHeader = () => {
    return {
      "Content-Type": "application/json",
      Authorization: `Bearer ${token}`,
    };
  };

  async function fetchData(url = "") {
    let options = {
      method: "GET",
      cache: "no-cache",
      credentials: "include",
      headers: authHeader(),
    };

    const response = await fetch(url, options);
    return response.json();
  }

  async function postData(url = "", donnees = {}) {
    let options = {
      method: "POST",
      cache: "no-cache",
      credentials: "include",
      headers: authHeader(),
      body: JSON.stringify(donnees),
    };

    const response = await fetch(url, options);
    return response.json();
  }

  async function updateData(url = "", donnees = {}) {
    let options = {
      method: "PUT",
      cache: "no-cache",
      credentials: "include",
      headers: authHeader(),
      body: JSON.stringify(donnees),
    };

    const response = await fetch(url, options);
    return response.json();
  }

  async function deleteData(url = "") {
    let options = {
      method: "DELETE",
      cache: "no-cache",
      credentials: "include",
      headers: authHeader(),
    };

    const response = await fetch(url, options);
    return response.json();
  }

  const signIn = async (username, password) => {
    const response = await postData(`${API_URL}:${API_PORT}/auth/login`, {
      username,
      password,
    });

    if (response.error) {
      throw new Error("Identifiants incorrects");
    }

    if (response.token) {
      document.cookie = `token=${response.token}; path=/;`;
      setToken(response.token);
    }

    return response;
  };

  const checkToken = async () => {
    const response = await fetchData(`${API_URL}:${API_PORT}/auth/checkToken`);

    if (response.error) {
      return false;
    }

    return { userId: response.userId, theme: response.theme };
  };

  const logOut = async () => {
    const response = await postData(`${API_URL}:${API_PORT}/auth/logout`);
    if (response.ok) {
      setToken("");
      document.cookie =
        "token=; path=/; expires=Thu, 01 Jan 1970 00:00:01 GMT; SameSite=Lax";
      return;
    }
  };

  return (
    <UserContext.Provider
      value={{
        signIn,
        logOut,
        postData,
        fetchData,
        deleteData,
        updateData,
        checkToken,
        theme,
        setTheme,
      }}
    >
      {children}
    </UserContext.Provider>
  );
}
