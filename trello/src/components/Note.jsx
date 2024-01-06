import "../css/Note.css";
import "../css/index.css";
import ContentDropdown from "./ContentDropdown.jsx";
import DeleteDropdown from "./DeleteDropdown.jsx";
import NoteButton from "./NoteButton.jsx";
import NoteItem from "./NoteItem.jsx";
import { useState } from "react";
import { ReactComponent as ThreeDots } from "../assets/dots.svg";
import { Draggable } from "@hello-pangea/dnd";
import { Droppable } from "@hello-pangea/dnd";

const Note = ({
  note,
  changeContent,
  handleContentChange,
  handleNoteChange,
  newNote,
  setNewNote,
  newContent,
  setNewContent,
  deleteNote,
  deleteContent,
  editNote,
  editContent,
}) => {
  const [open, setOpen] = useState(false);

  const [open2, setOpen2] = useState(false);

  const [editOpen, setEditOpen] = useState(false);

  const handleOpen = () => {
    setOpen(!open);
    setNewContent("");
  };

  const handleOpen2 = () => {
    console.log("Hello");
    setOpen2(!open2);
  };

  const handleEdit = (name) => {
    setEditOpen(!editOpen);
    setNewNote(name);
    setOpen2(false);
  };

  if (!note.content) {
    return null;
  }

  const contentArr = note.content;

  return (
    <div className="note-container">
      <div className="note-header">
        <div className="name-wrapper">
          {editOpen ? (
            <form
              onSubmit={() => {
                editNote(note.id);
                setEditOpen(false);
              }}
            >
              <input
                className="edit-name"
                value={newNote}
                onChange={handleNoteChange}
                autoFocus
                onFocus={(e) => e.currentTarget.select()}
              ></input>
            </form>
          ) : (
            <p
              className="note-name"
              onClick={() => {
                handleEdit(note.name);
              }}
            >
              {note.name}
            </p>
          )}
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
            <DeleteDropdown
              deleteNote={() => deleteNote(note.id)}
              handleEdit={() => handleEdit(note.name)}
            />
          ) : null}
        </div>
      </div>
      <Droppable droppableId={note.id}>
        {(provided) => {
          return (
            <div {...provided.droppableProps} ref={provided.innerRef}>
              <div id="note-body">
                {contentArr.map((item, index) => {
                  return (
                    <Draggable
                      key={item.id}
                      draggableId={item.id}
                      index={index}
                    >
                      {(provided, snapshot) => {
                        return (
                          <div
                            className="draggable"
                            ref={provided.innerRef}
                            {...provided.draggableProps}
                            {...provided.dragHandleProps}
                          >
                            <NoteItem
                              key={item.id}
                              taskItem={item.taskItem}
                              taskId={item.id}
                              noteId={note.id}
                              deleteItem={(event) =>
                                deleteContent(event, note.id, item.id)
                              }
                              newContent={newContent}
                              setNewContent={setNewContent}
                              handleContentChange={handleContentChange}
                              editContent={editContent}
                            />
                          </div>
                        );
                      }}
                    </Draggable>
                  );
                })}
                {provided.placeholder}

                {open ? (
                  <ContentDropdown
                    handleOpen={handleOpen}
                    changeContent={(event) => changeContent(event, note.id)}
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

                {editOpen ? (
                  <div
                    className="overlay"
                    onClick={() => {
                      editNote(note.id);
                      setEditOpen(false);
                    }}
                  />
                ) : null}
              </div>
            </div>
          );
        }}
      </Droppable>
    </div>
  );
};

export default Note;
