/* eslint-disable react/no-unescaped-entities */
import "../css/Dashboard.css";
import { useNavigate } from "react-router-dom";
import { ReactComponent as Return } from "../assets/return.svg";

const Nav = ({ boardName }) => {
  const navigate = useNavigate();

  const returnHome = () => {
    navigate("/dashboard");
  };

  return (
    <nav className="nav">
      <div className="nav-name-container">
        <Return
          onClick={returnHome}
          style={{ cursor: "pointer", fill: "white" }}
        />
        <h5 className="nav-name">{boardName}</h5>
      </div>
      <div className="nav-container">
        <div className="nav-profile">
          <img
            className="nav-image"
            style={{ width: "2rem", border: "solid, white, 1px" }}
          ></img>
        </div>
      </div>
    </nav>
  );
};

export default Nav;
