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
import { useRef } from "react";
import { useDraggable } from "react-use-draggable-scroll";

const Dashboard = () => {
  const [notes, setNotes] = useState([]);
  const [newNote, setNewNote] = useState(null);
  const [newContent, setNewContent] = useState("");
  const [open, setOpen] = useState(false);

  const ref = useRef();
  const { events } = useDraggable(ref);

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
    const addData = async () => {
      const accessToken = await getAccessTokenSilently();

      if (newNote === "") {
        event.preventDefault();
        window.alert("List name must not be empty");
      } else {
        event.preventDefault();
        const noteObject = {
          name: newNote,
          content: [],
        };

        noteService.create(noteObject, accessToken).then((returnedNote) => {
          setNotes(notes.concat(returnedNote));
          setNewNote("");
        });
      }
    };
    addData();
  };

  const handleContentChange = (event) => {
    console.log(event.target.value);
    setNewContent(event.target.value);
  };

  const changeContent = (event, id) => {
    const changeData = async () => {
      const accessToken = await getAccessTokenSilently();
      event.preventDefault();
      console.log("hello");
      console.log(id);
      const note = notes.find((n) => n.id === id);
      const oldContent = note.content;
      console.log(oldContent);

      const contentObject = {
        taskItem: newContent,
        id: note.content.length + 1,
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
    changeData();
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

  return (
    <section id="dashboard">
      <Nav userName={user.sub} />

      <div className="selector">
        <div className="dropdownWrapper">
          <CreateButton buttonName="Add Checklist +" toggleOpen={handleOpen} />
        </div>
        <CreateButton buttonName="Add Timer +" />
      </div>
      <div id="board">
        <div id="board-canvas" {...events} ref={ref}>
          <div className="note-wrapper">
            {notes.map((note) => (
              <Note
                note={note}
                key={note.id}
                changeContent={() => changeContent(event, note.id)}
                handleContentChange={handleContentChange}
                newContent={newContent}
                setNewContent={setNewContent}
                deleteContent={deleteContent}
              />
            ))}
            <div className="add-wrapper">
              {open ? (
                <Dropdown
                  handleOpen={handleOpen}
                  newNote={newNote}
                  handleNoteChange={handleNoteChange}
                  addNote={addNote}
                />
              ) : (
                <div className="note-button-2" onClick={handleOpen}>
                  <Plus
                    style={{ width: "7%", color: "#fff", marginLeft: "0.5rem" }}
                  />
                  <p className="note-button-text-2">Add new list</p>
                </div>
              )}
            </div>
            {open ? (
              <div className="overlay" onClick={() => setOpen(false)} />
            ) : null}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Dashboard;
