import "../css/Button.css";
import { ReactComponent as Plus } from "../assets/plus.svg";

const NoteButton = ({ handleOpen }) => {
  return (
    <div className="note-button" onClick={handleOpen}>
      <Plus style={{ width: "8%", color: "#7e889b" }} />
      <p className="note-button-text">Add new card</p>
    </div>
  );
};

export default NoteButton;
