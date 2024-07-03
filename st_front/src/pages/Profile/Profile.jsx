import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../models/utils/context/UserContext";

export default function Profile() {
  const { checkToken, updateData } = useContext(UserContext);
  const [userId, setUserId] = useState(null);
  const [theme, setTheme] = useState("light");

  useEffect(() => {
    const fetchUserId = async () => {
      const isAuthenticated = await checkToken();
      if (isAuthenticated) {
        setUserId(isAuthenticated);
      }
    };

    fetchUserId();
  }, [checkToken]);

  const handleThemeChange = async (event) => {
    const newTheme = event.target.value;
    console.log("New theme:", newTheme);
    setTheme(newTheme);

    try {
      const response = await updateData(`http://localhost:8390/api/user/`, {
        theme: newTheme,
      });
      console.log("Response:", response);
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <>
      <h1>Profile</h1>
      <p>Utilisateur : {userId} </p>
      <label>
        Thème :
        <select value={theme} onChange={handleThemeChange}>
          <option value="light">Clair</option>
          <option value="dark">Sombre</option>
        </select>
      </label>
    </>
  );
}
