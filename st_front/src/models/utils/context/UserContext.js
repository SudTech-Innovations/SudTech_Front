import { createContext, useEffect, useState } from "react";

export const UserContext = createContext();

const API_PORT = 8390;

export default function UserContextProvider({ children }) {
  const [role, setRole] = useState();

  useEffect(() => {
    if (localStorage.getItem("role")) {
      setRole(localStorage.getItem("role"));
    }
  }, []);

  async function postData(url = "", donnees = {}) {
    let options = {
      method: "POST",
      cache: "no-cache",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
      body: JSON.stringify(donnees),
    };

    const response = await fetch(url, options);

    return response;
  }

  async function updateData(url = "", donnees = {}) {
    let options = {
      method: "PUT",
      cache: "no-cache",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
      body: JSON.stringify(donnees),
    };

    const response = await fetch(url, options);

    return response;
  }

  const signIn = async (email, password) => {
    const response = await postData("http://localhost:" + API_PORT + "/login", {
      email: email,
      password: password,
    });
    if (response.error) {
      throw new Error("Identifiants incorrects");
    }

    const res = await fetch("http://localhost:" + API_PORT + "/api/user", {
      credentials: "include",
    }).then((response) => response.json());
    setRole(res.role);
    localStorage.setItem("role", res.role);
  };

  const logOut = async () => {
    const response = await postData("http://localhost:" + API_PORT + "/logout");
    if (response.ok) {
      localStorage.removeItem("role");
      setRole();
      return;
    }

    alert("Erreur lors de la déconnexion");
  };

  async function deleteData(url = "") {
    let options = {
      method: "DELETE",
      cache: "no-cache",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
      },
      redirect: "follow",
      referrerPolicy: "no-referrer",
    };

    const response = await fetch(url, options);

    return response;
  }

  return (
    <UserContext.Provider
      value={{ signIn, logOut, postData, deleteData, updateData, role }}
    >
      {children}
    </UserContext.Provider>
  );
}
