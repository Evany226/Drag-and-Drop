/* eslint-disable react/no-unescaped-entities */
import "../css/Dashboard.css";
import LogoutButton from "./LogoutButton.jsx";

const Nav = ({ userName, userPic }) => {
  return (
    <nav className="nav">
      <h5 className="nav-name"> {userName}'s Workspace </h5>
      <div className="nav-container">
        <div className="nav-profile">
          <img
            className="nav-image"
            style={{ width: "2rem", border: "solid, white, 1px" }}
            src={userPic}
          ></img>
        </div>
        <LogoutButton buttonName="Sign out" />
      </div>
    </nav>
  );
};

export default Nav;
