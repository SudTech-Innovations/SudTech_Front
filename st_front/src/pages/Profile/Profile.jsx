import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../models/utils/context/UserContext";

export default function Profile() {
  const { checkToken } = useContext(UserContext);
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
    setTheme(newTheme);

    try {
      const response = await fetch(`/api/user`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ theme: newTheme }),
      });

      if (!response.ok) {
        throw new Error("Failed to update user theme");
      }
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
