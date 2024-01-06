import "../css/Note.css";
import { ReactComponent as Trash } from "../assets/trash.svg";
import { ReactComponent as Edit } from "../assets/edit.svg";
import { useState, useRef } from "react";

const NoteItem = ({
  taskItem,
  taskId,
  noteId,
  deleteItem,
  newContent,
  setNewContent,
  handleContentChange,
  editContent,
}) => {
  const [isHovering, setIsHovering] = useState(false);
  const [open, setOpen] = useState(false);

  const handleMouseOver = () => {
    setIsHovering(true);
  };

  const handleMouseOut = () => {
    setIsHovering(false);
  };

  const handleEdit = () => {
    setOpen(!open);
    setNewContent(taskItem);
  };

  const myRef = useRef(null);

  //makes enter work for submit in textarea
  const onEnterPress = (event) => {
    if (event.keyCode == 13 && event.shiftKey == false) {
      event.preventDefault();
      myRef.current.requestSubmit();
    }
  };

  return (
    <>
      {open ? (
        <>
          <form
            ref={myRef}
            className="edit-content-form"
            onSubmit={(event) => {
              editContent(event, noteId, taskId);
              setOpen(false);
            }}
          >
            <textarea
              className="edit-content"
              value={newContent}
              onChange={handleContentChange}
              autoFocus
              onFocus={(e) => e.currentTarget.select()}
              onKeyDown={(event) => onEnterPress(event)}
            />
            <div className="edit-content-button-wrapper">
              <button
                className="content-button"
                type="submit"
                style={{
                  marginRight: "0",
                  marginLeft: "0.5rem",
                }}
              >
                Save
              </button>
              <button className="delete-button" onClick={deleteItem}>
                <p className="delete-button-text">Delete</p>
                <Trash style={{ color: "red", width: "0.75rem" }} />
              </button>
            </div>
          </form>
        </>
      ) : (
        <div
          className="note-body-text-container"
          onMouseOver={handleMouseOver}
          onMouseOut={handleMouseOut}
        >
          <p className="note-body-text">{taskItem}</p>
          {isHovering && (
            <Edit
              style={{
                width: "0.8rem",
                padding: "0",
                cursor: "pointer",
                transitionTime: "3s",
                position: "absolute",
                top: "0",
                right: "0",
                height: "100%",
                marginRight: "0.5rem",
              }}
              onClick={() => handleEdit(taskItem)}
            />
          )}
        </div>
      )}
      {open ? (
        <div className="dark-overlay" onClick={() => setOpen(false)} />
      ) : null}
    </>
  );
};

export default NoteItem;
