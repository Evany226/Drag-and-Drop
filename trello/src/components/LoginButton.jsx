import "../css/Button.css";
import { useAuth0 } from "@auth0/auth0-react";
import React from "react";

const LoginButton = ({ buttonName }) => {
  const { loginWithRedirect } = useAuth0();

  const handleLogin = async () => {
    await loginWithRedirect({
      appState: {
        returnTo: "/dashboard",
      },
    });
  };

  return (
    <button className="login-button" onClick={handleLogin}>
      {buttonName}
    </button>
  );
};

export default LoginButton;
