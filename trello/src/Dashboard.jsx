import "./css/Dashboard.css";
import "./css/Button.css";
import "./css/index.css";
import "./css/Button.css";
import CreateButton from "./components/CreateButton.jsx";
import { useState, useEffect, useRef } from "react";
import noteService from "./services/notes";
import Note from "./components/Note.jsx";
import Nav from "./components/Nav.jsx";
import Dropdown from "./components/Dropdown.jsx";
import { ReactComponent as Plus } from "./assets/plus.svg";
import { useAuth0 } from "@auth0/auth0-react";
// import { useDraggable } from "react-use-draggable-scroll";
import { DragDropContext } from "@hello-pangea/dnd";
import { Droppable } from "@hello-pangea/dnd";
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

  // eslint-disable-next-line react-hooks/rules-of-hooks
  useEffect(() => {
    const getData = async () => {
      const accessToken = await getAccessTokenSilently();

      noteService.getAll(accessToken).then((initialNotes) => {
        setNotes(initialNotes);
      });
    };
    getData();
  }, [getAccessTokenSilently]);

  const handleOpen = () => {
    setOpen(!open);
    setNewNote("");
  };

  const handleNoteChange = (event) => {
    console.log(event.target.value);
    setNewNote(event.target.value);
  };

  //adds actual columns
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

  //changes note name
  const editNote = (id) => {
    const editData = async () => {
      const note = notes.find((note) => note.id === id);

      const changedNote = {
        ...note,
        name: newNote,
      };

      noteService.update(id, changedNote).then(() => {});
      setNotes(notes.map((note) => (note.id === id ? changedNote : note)));
    };
    if (newNote === "") {
      window.alert("List name must not be empty");
    } else {
      editData();
    }
  };

  //deletes actual columns
  const deleteNote = (id) => {
    noteService.remove(id).then(() => {
      setNotes(notes.filter((note) => note.id !== id));
      setNewNote("");
    });
  };

  const handleContentChange = (event) => {
    console.log(event.target.value);
    setNewContent(event.target.value);
  };

  //this adds new note items
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

  const editContent = (event, id, itemId) => {
    event.preventDefault();
    const editData = async () => {
      const note = notes.find((n) => n.id === id);
      const oldContent = note.content;

      const contentObject = {
        taskItem: newContent,
        id: itemId,
      };

      const updatedContent = oldContent.map((item) =>
        item.id === itemId ? contentObject : item
      );

      const changedNote = {
        ...note,
        content: updatedContent,
      };

      noteService.update(id, changedNote).then(() => {});
      setNotes(notes.map((note) => (note.id != id ? note : changedNote)));
    };

    if (newContent === "") {
      window.alert("Content must not be empty");
    } else {
      editData();
    }
  };

  //delete note items
  const deleteContent = (event, id, itemId) => {
    event.preventDefault();
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

  const onDragEndItems = (result) => {
    const { source, destination, type } = result;
    if (!destination) {
      return;
    }

    if (type === "ITEM") {
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
          setNotes(notes.map((n) => (n.id === id ? returnedNote : n)));
        });
      }
    } else {
      const getToken = async () => {
        const accessToken = await getAccessTokenSilently();

        console.log(notes);
        const copiedItems = [...notes];
        const [removedItem] = copiedItems.splice(source.index, 1);
        copiedItems.splice(destination.index, 0, removedItem);

        noteService.updateAll(copiedItems, accessToken).then((returnedNote) => {
          console.log(returnedNote);
        });

        setNotes(copiedItems);
      };
      getToken();
    }
  };

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const rightRef = useRef(null);

  const scrollRight = () => {
    rightRef.current.scrollIntoView();
    console.log("works");
    setOpen(!open);
    setNewNote("");
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

  const addTimer = () => {
    console.log("Timer!!");
  };

  return (
    <section id="dashboard">
      <Nav userName={user.name} userPic={user.picture} />
      <div className="selector">
        <div className="dropdownWrapper">
          <CreateButton buttonName="Add Checklist +" buttonFunc={scrollRight} />
        </div>
        <CreateButton buttonName="Add Timer +" buttonFunc={addTimer} />
      </div>
      <DragDropContext onDragEnd={(result) => onDragEndItems(result)}>
        <div id="board">
          <div id="board-canvas" onWheel={handleScroll}>
            {notes.map((note, index) => {
              return (
                <Droppable droppableId={uuidv4()} type="COLUMN" key={note.id}>
                  {(provided) => {
                    return (
                      <div {...provided.droppableProps} ref={provided.innerRef}>
                        <div className="note-wrapper">
                          <Note
                            note={note}
                            changeContent={changeContent}
                            handleContentChange={handleContentChange}
                            handleNoteChange={handleNoteChange}
                            newNote={newNote}
                            setNewNote={setNewNote}
                            newContent={newContent}
                            setNewContent={setNewContent}
                            deleteNote={deleteNote}
                            deleteContent={deleteContent}
                            editNote={editNote}
                            editContent={editContent}
                            index={index}
                          />
                        </div>
                        {provided.placeholder}
                      </div>
                    );
                  }}
                </Droppable>
              );
            })}
            <div className="add-wrapper" ref={rightRef}>
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
