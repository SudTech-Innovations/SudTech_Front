import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../models/utils/context/UserContext";

export default function Profile() {
  const { checkToken } = useContext(UserContext);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const fetchUserId = async () => {
      const isAuthenticated = await checkToken();
      if (isAuthenticated) {
        setUserId(isAuthenticated);
      }
    };

    fetchUserId();
  }, [checkToken]);

  return (
    <>
      <h1>Profile</h1>
      <p>Utilisateur : {userId} </p>
    </>
  );
}
