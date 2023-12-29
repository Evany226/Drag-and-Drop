import "../css/Note.css";
import { ReactComponent as Trash } from "../assets/trash.svg";
import { useState } from "react";

const NoteItem = ({ taskItem, taskId, deleteItem }) => {
  const [isHovering, setIsHovering] = useState(false);

  const handleMouseOver = () => {
    setIsHovering(true);
  };

  const handleMouseOut = () => {
    setIsHovering(false);
  };

  return (
    <div
      className="note-body-text-container"
      onMouseOver={handleMouseOver}
      onMouseOut={handleMouseOut}
    >
      <p className="note-body-text">
        {taskItem} id:{taskId}
      </p>
      {isHovering && (
        <Trash
          style={{
            width: "1rem",
            padding: "0",
            margin: "0",
            cursor: "pointer",
            transitionTime: "3s",
          }}
          onClick={deleteItem}
        />
      )}
    </div>
  );
};

export default NoteItem;
