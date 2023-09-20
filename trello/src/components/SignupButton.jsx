import '../css/Button.css'
import { useAuth0 } from "@auth0/auth0-react";
import React from "react";

const SignupButton = ({buttonName}) => {
    const { loginWithRedirect } = useAuth0();

    const handleSignUp = async () => {
        await loginWithRedirect({
          appState: {
            returnTo: "/dashboard",
          },
          authorizationParams: {
            screen_hint: "signup",
          },
        });
      };
  
    
    return (
        <button className="signup-button" onClick={handleSignUp}>{buttonName}</button>
    )
}

export default SignupButton;