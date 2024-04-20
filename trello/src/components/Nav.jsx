/* eslint-disable react/no-unescaped-entities */
import "../css/Dashboard.css";
import { useNavigate } from "react-router-dom";
import { ReactComponent as Return } from "../assets/return.svg";

const Nav = ({ boardName, boardTheme }) => {
  const navigate = useNavigate();

  const returnHome = () => {
    navigate("/dashboard");
  };

  return (
    <nav
      className={
        boardTheme === 1
          ? "nav-1"
          : boardTheme === 2
          ? "nav-2"
          : boardTheme === 3
          ? "nav-3"
          : null
      }
    >
      <div className="nav-name-container">
        {boardTheme === 1 ? (
          <Return
            onClick={returnHome}
            style={{ cursor: "pointer", fill: "black" }}
          />
        ) : (
          <Return
            onClick={returnHome}
            style={{ cursor: "pointer", fill: "white" }}
          />
        )}
        <h5 className={boardTheme === 1 ? "nav-name-dark" : "nav-name"}>
          {boardName}
        </h5>
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
