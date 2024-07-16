import React, { useState, useContext } from "react";
import { UserContext } from "../../models/utils/context/UserContext";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { signIn } = useContext(UserContext);

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await signIn(username, password);
      window.location.reload();
    } catch (error) {
      console.error("Erreur de connexion", error);
    }
  };

  return (
    <>
      <div id="auth-container">
        <h1>Se connecter</h1>
        <div className="form-container">
          <form className="form" onSubmit={handleLogin}>
            <div className="input-field">
              <input
                type="text"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <label>Identifiant</label>
            </div>
            <div className="input-field">
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <label>Mot de passe</label>
            </div>

            <div className="btn-container">
              <button className="btn">Envoyer</button>
            </div>
          </form>
        </div>
      </div>
    </>
  );
}
