import "../css/Button.css";
import { useAuth0 } from "@auth0/auth0-react";

const LogoutButton = ({ buttonName }) => {
  const { logout } = useAuth0();

  const handleLogout = () => {
    logout({
      logoutParams: {
        returnTo: window.location.origin,
      },
    });
  };

  return (
    <button className="logout-button" onClick={handleLogout}>
      {buttonName}
    </button>
  );
};

export default LogoutButton;
