import { useRef, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";

import { UserContext } from "../../models/utils/context/UserContext";

export default function Login() {
  const navigate = useNavigate();
  const formRef = useRef();
  const inputs = useRef([]);
  const [validation, setValidation] = useState("");
  const { signIn } = useContext(UserContext);

  function resetAll() {
    inputs.current = [];
  }

  const addInputs = (el) => {
    if (el && !inputs.current.includes(el)) {
      inputs.current.push(el);
    }
  };

  const handleForm = async (e) => {
    e.preventDefault();

    if (inputs.current.length === 2) {
      await signIn(inputs.current[0].value, inputs.current[1].value)
        .then(() => {
          navigate("/profile");
          setValidation("");
        })
        .catch((e) => {
          console.error(e);
          setValidation("Error, email or password incorrect");
        });
      console.log("values", inputs.current[0].value, inputs.current[1].value);
    } else {
      setValidation("Error, input references are missing");
    }

    resetAll();
  };

  return (
    <>
      <form ref={formRef} onSubmit={handleForm} id="login-form">
        <div>
          <label htmlFor="email">Identifiants</label>
          <input
            ref={addInputs}
            type="string"
            id="email"
            name="email"
            required
          />
        </div>
        <div>
          <label htmlFor="password">Mot de passe</label>
          <input
            ref={addInputs}
            type="password"
            id="password"
            name="password"
            required
          />
        </div>
        <button type="submit">Se connecter</button>
        <p>{validation}</p>
      </form>
    </>
  );
}
