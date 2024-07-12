import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../models/utils/context/UserContext";

export default function Home() {
  useContext(UserContext);

  const [message, setMessage] = useState(
    JSON.stringify({ api_status: "offline" })
  );

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetchData("/");
        if (response.ok) {
          const data = await response.text();
          setMessage(data);
          console.log(message);
        } else {
          const data = await response.text();
          setMessage(data);
          console.log(message);
        }
      } catch (error) {
        setMessage(JSON.stringify({ api_status: "offline" }));
        console.log(message);
      }
    };

    fetchData();
  }, [message]);

  return (
    <>
      <h1>Accueil</h1>
      {/* {message} */}
    </>
  );
}
