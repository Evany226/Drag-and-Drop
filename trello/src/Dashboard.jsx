import "./css/Dashboard.css";
import "./css/Button.css";
import "./css/index.css";
import "./css/Button.css";
import CreateButton from "./components/CreateButton.jsx";
import { useState, useEffect } from "react";
import noteService from "./services/notes";
import Note from "./components/Note.jsx";
import Nav from "./components/Nav.jsx";
import Dropdown from "./components/Dropdown.jsx";
import { ReactComponent as Plus } from "./assets/plus.svg";
import { useAuth0 } from "@auth0/auth0-react";
// import { useRef } from "react";
// import { useDraggable } from "react-use-draggable-scroll";
import { DragDropContext } from "@hello-pangea/dnd";
import { v4 as uuidv4 } from "uuid";

const Dashboard = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState(null);
  const [newContent, setNewContent] = useState("");
  const [open, setOpen] = useState(false);

  // const ref = useRef();
  // const { events } = useDraggable(ref, {
  //   activeMouseButton: "Left",
  // });

  const { user } = useAuth0();
  const { getAccessTokenSilently } = useAuth0();

  if (!notes) {
    return null;
  }

  useEffect(() => {
    const getData = async () => {
      const accessToken = await getAccessTokenSilently();

      noteService.getAll(accessToken).then((initialNotes) => {
        setNotes(initialNotes);
      });
    };
    getData();
  }, []);

  const handleOpen = () => {
    setOpen(!open);
    setNewNote("");
  };

  const handleNoteChange = (event) => {
    console.log(event.target.value);
    setNewNote(event.target.value);
  };

  const addNote = (event) => {
    event.preventDefault();
    const addData = async () => {
      const accessToken = await getAccessTokenSilently();

      const noteObject = {
        name: newNote,
        content: [],
      };

      noteService.create(noteObject, accessToken).then((returnedNote) => {
        setNotes(notes.concat(returnedNote));
        setNewNote("");
      });
    };
    if (newNote === "") {
      window.alert("List name must not be empty");
    } else {
      addData();
    }
  };

  const handleContentChange = (event) => {
    console.log(event.target.value);
    setNewContent(event.target.value);
  };

  const changeContent = (event, id) => {
    event.preventDefault();
    const changeData = async () => {
      const accessToken = await getAccessTokenSilently();
      console.log("hello");
      console.log(id);
      const note = notes.find((n) => n.id === id);
      const oldContent = note.content;
      console.log(oldContent);

      const contentObject = {
        taskItem: newContent,
        id: uuidv4(),
      };

      const updatedContent = oldContent.concat(contentObject);
      console.log(updatedContent);

      const changedNote = {
        ...note,
        content: updatedContent,
      };
      console.log(changedNote);

      noteService.update(id, changedNote, accessToken).then((returnedNote) => {
        setNotes(notes.map((note) => (note.id !== id ? note : returnedNote)));
        setNewContent("");
      });
    };
    if (newContent === "") {
      window.alert("Content must not be empty");
    } else {
      changeData();
    }
  };

  const deleteNote = (id) => {
    noteService.remove(id).then((returnedNote) => {
      setNotes(notes.filter((note) => note.id != id));
    });
  };

  const deleteContent = (id, itemId) => {
    console.log(id);
    console.log(itemId);
    const note = notes.find((n) => n.id === id);
    const oldContent = note.content;

    const afterDelete = oldContent.filter((item) => item.id != itemId);

    const changedNote = {
      ...note,
      content: afterDelete,
    };

    console.log(changedNote);

    noteService.update(id, changedNote).then((returnedNote) => {
      setNotes(notes.map((note) => (note.id != id ? note : returnedNote)));
    });
  };

  if (!user) {
    return null;
  }

  const onDragEnd = (result) => {
    const { source, destination } = result;
    if (!destination) {
      return;
    }

    if (source.droppableId != destination.droppableId) {
      const sourceNote = notes.find((item) => item.id === source.droppableId);
      const destNote = notes.find(
        (item) => item.id === destination.droppableId
      );
      const sourceItems = [...sourceNote.content];
      const destItems = [...destNote.content];
      const [removed] = sourceItems.splice(source.index, 1);
      destItems.splice(destination.index, 0, removed);

      const newSource = {
        ...sourceNote,
        content: sourceItems,
      };

      const newDest = {
        ...destNote,
        content: destItems,
      };

      noteService.update(newSource.id, newSource).then((returnedNote) => {
        console.log(returnedNote);
      });

      noteService.update(newDest.id, newDest).then((returnedNote) => {
        console.log(returnedNote);
      });

      setNotes(
        notes.map((n) => {
          if (n.id === sourceNote.id) {
            return newSource;
          }
          if (n.id === destNote.id) {
            return newDest;
          } else {
            return n;
          }
        })
      );
    } else {
      const note = notes.find((item) => item.id === source.droppableId);
      const copiedItems = [...note.content];
      const [removedItem] = copiedItems.splice(source.index, 1);
      copiedItems.splice(destination.index, 0, removedItem);

      const newNote = {
        ...note,
        content: copiedItems,
      };

      const id = note.id;

      noteService.update(id, newNote).then((returnedNote) => {
        console.log(returnedNote);
      });
      setNotes(notes.map((n) => (n.id === id ? newNote : n)));
    }
  };

  const handleScroll = (event) => {
    const container = event.target.parentElement;
    const scrollAmount = event.deltaY;
    container.scrollTo({
      top: 0,
      left: container.scrollLeft + scrollAmount * 8,
      behavior: "smooth",
    });
  };

  return (
    <section id="dashboard">
      <Nav userName={user.name} userPic={user.picture} />

      <div className="selector">
        <div className="dropdownWrapper">
          <CreateButton buttonName="Add Checklist +" toggleOpen={handleOpen} />
        </div>
        <CreateButton buttonName="Add Timer +" />
      </div>
      <DragDropContext onDragEnd={(result) => onDragEnd(result)}>
        <div id="board">
          <div id="board-canvas" onWheel={handleScroll}>
            {notes.map((note) => {
              return (
                <div className="note-wrapper" key={note.id}>
                  <Note
                    note={note}
                    changeContent={() => changeContent(event, note.id)}
                    handleContentChange={handleContentChange}
                    newContent={newContent}
                    setNewContent={setNewContent}
                    deleteNote={deleteNote}
                    deleteContent={deleteContent}
                  />
                </div>
              );
            })}
            <div className="add-wrapper">
              {open ? (
                <Dropdown
                  handleOpen={handleOpen}
                  newNote={newNote}
                  handleNoteChange={handleNoteChange}
                  addNote={addNote}
                />
              ) : (
                <div className="menu-button" onClick={handleOpen}>
                  <Plus
                    style={{
                      width: "7%",
                      color: "#fff",
                      marginLeft: "0.5rem",
                    }}
                  />
                  <p className="menu-button-text">Add new list</p>
                </div>
              )}
              {open ? (
                <div className="overlay" onClick={() => setOpen(false)} />
              ) : null}
            </div>
          </div>
        </div>
      </DragDropContext>
    </section>
  );
};

export default Dashboard;
