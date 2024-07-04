import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../models/utils/context/UserContext";

export default function Profile() {
  const [username, setUsername] = useState(null);
  const { checkToken, updateData, theme, setTheme, token } =
    useContext(UserContext);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const fetchUserId = async () => {
      const isAuthenticated = await checkToken();
      console.log(isAuthenticated);
      if (isAuthenticated) {
        setUserId(isAuthenticated.response.id);
        setTheme(isAuthenticated.response.theme);
        setUsername(isAuthenticated.response.username);
      }
    };

    fetchUserId();
  }, [checkToken]);

  const handleThemeChange = async (event) => {
    const newTheme = event.target.value;
    setTheme(newTheme);

    try {
      const response = await updateData(`http://localhost:8390/api/user/`, {
        theme: newTheme,
      });
      // console.log("Response:", response);
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
