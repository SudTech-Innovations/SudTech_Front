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
      // Redirection ou mise à jour de l'état de l'interface utilisateur après une connexion réussie
      console.log("Connexion réussie");
    } catch (error) {
      console.error("Erreur de connexion", error);
    }
  };

  return (
    <>
      <div id="auth-container">
        <div class="heading">Se connecter</div>
        <form class="form" onSubmit={handleLogin}>
          <div class="input-field">
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
            <label>Identifiant</label>
          </div>
          <div class="input-field">
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <label>Mot de passe</label>
          </div>

          <div class="btn-container">
            <button class="btn">Envoyer</button>
          </div>
        </form>
      </div>
    </>
  );
}
