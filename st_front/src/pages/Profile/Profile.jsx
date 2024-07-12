import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../models/utils/context/UserContext";

export default function Profile() {
  const [username, setUsername] = useState(null);
  const { checkToken, theme, setTheme } = useContext(UserContext);
  const [, setUserId] = useState(null);

  useEffect(() => {
    const fetchUserId = async () => {
      const isAuthenticated = await checkToken();
      if (isAuthenticated) {
        setUserId(isAuthenticated.response.id);
        setTheme(isAuthenticated.response.theme);
        setUsername(isAuthenticated.response.username);
      }
    };

    fetchUserId();
  }, [checkToken, setTheme]);

  const handleThemeChange = async (event) => {
    const newTheme = event.target.value;
    setTheme(newTheme);

    try {
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <h1>Profile</h1>
      <p>Utilisateur : {username} </p>
      <label>
        Thème :
        <select value={theme} onChange={handleThemeChange}>
          <option value="no">-------</option>
          <option value="light">Clair</option>
          <option value="dark">Sombre</option>
          <option value="classic">Classique</option>
        </select>
      </label>
    </>
  );
}
