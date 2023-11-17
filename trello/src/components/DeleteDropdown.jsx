import "../css/DeleteDropdown.css";
import { RiDeleteBin2Line } from "react-icons/Ri";

const DeleteDropdown = ({ deleteNote }) => {
  return (
    <div id="delete-dropdown">
      <div className="delete-wrapper" onClick={deleteNote}>
        <p className="delete-text">Delete</p>
        <RiDeleteBin2Line
          style={{
            width: "1rem",
            cursor: "pointer",
            color: "red",
          }}
        />
      </div>
    </div>
  );
};

export default DeleteDropdown;
