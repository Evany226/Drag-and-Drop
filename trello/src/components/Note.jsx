import "../css/Note.css";
import "../css/index.css";
import ContentDropdown from "./ContentDropdown.jsx";
import NoteButton from "./NoteButton.jsx";
import NoteItem from "./NoteItem.jsx";
import { useState } from "react";

const Note = ({
  note,
  changeContent,
  handleContentChange,
  newContent,
  setNewContent,
}) => {
  const [open, setOpen] = useState(false);

  const handleOpen = () => {
    setOpen(!open);
    setNewContent("");
  };

  if (!note.content) {
    return null;
  }

  const contentArr = note.content;

  return (
    <div className="note-container">
      <div className="note-header">
        <p className="note-name"> {note.name}</p>
      </div>
      <div id="note-body">
        {contentArr.map((item) => {
          return <NoteItem id={item.id} taskItem={item.taskItem} />;
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
      </div>
    </div>
  );
};

export default Note;
