import "../css/Note.css";
import { RiDeleteBin2Line } from "react-icons/Ri";
import { useState } from "react";

const NoteItem = ({ taskItem, id }) => {
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
      key={id}
    >
      <p className="note-body-text">{taskItem}</p>
      {isHovering && (
        <RiDeleteBin2Line style={{ width: "8%", padding: "0", margin: "0" }} />
      )}
    </div>
  );
};

export default NoteItem;
