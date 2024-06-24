import React, { useState, useContext } from 'react';
import { UserContext } from '../../models/utils/context/UserContext';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
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
    <form onSubmit={handleLogin}>
      <label>
        Nom d'utilisateur:
        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
      </label>
      <label>
        Mot de passe:
        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </label>
      <button type="submit">Connexion</button>
    </form>
  );
}