import "../css/Note.css";
import "../css/index.css";
import ContentDropdown from "./ContentDropdown.jsx";
import DeleteDropdown from "./DeleteDropdown.jsx";
import NoteButton from "./NoteButton.jsx";
import NoteItem from "./NoteItem.jsx";
import { useState } from "react";
import { ReactComponent as ThreeDots } from "../assets/dots.svg";

const Note = ({
  note,
  changeContent,
  handleContentChange,
  newContent,
  setNewContent,
  deleteNote,
  deleteContent,
}) => {
  const [open, setOpen] = useState(false);

  const [open2, setOpen2] = useState(false);

  const handleOpen = () => {
    setOpen(!open);
    setNewContent("");
  };

  const handleOpen2 = () => {
    console.log("Hello");
    setOpen2(!open2);
  };

  if (!note.content) {
    return null;
  }

  const contentArr = note.content;

  return (
    <div className="note-container">
      <div className="note-header">
        <div className="name-wrapper">
          <p className="note-name"> {note.name}</p>
        </div>
        <div className="settings-wrapper">
          <ThreeDots
            style={{
              width: "50%",
              cursor: "pointer",
              position: "relative",
              marginRight: "1rem",
            }}
            onClick={handleOpen2}
          />
          {open2 ? (
            <DeleteDropdown deleteNote={() => deleteNote(note.id)} />
          ) : null}
        </div>
      </div>
      <div id="note-body">
        {contentArr.map((item) => {
          return (
            <NoteItem
              key={item.id}
              taskItem={item.taskItem}
              deleteItem={() => deleteContent(note.id, item.id)}
            />
          );
        })}

        {open ? (
          <ContentDropdown
            handleOpen={handleOpen}
            changeContent={changeContent}
            newContent={newContent}
            handleContentChange={handleContentChange}
          />
        ) : (
          <NoteButton handleOpen={handleOpen} />
        )}

        {open ? (
          <div className="overlay" onClick={() => setOpen(false)} />
        ) : null}

        {open2 ? (
          <div className="overlay" onClick={() => setOpen2(false)} />
        ) : null}
      </div>
    </div>
  );
};

export default Note;
