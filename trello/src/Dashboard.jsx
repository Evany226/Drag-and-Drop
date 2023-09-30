import './css/Dashboard.css'
import './css/Button.css'
import'./css/index.css'
import "./css/Button.css"
import CreateButton from "./components/CreateButton.jsx"
import { useState, useEffect } from "react";
import noteService from './services/notes';
import Note from './components/Note.jsx'
import Nav from './components/Nav.jsx';
import Dropdown from './components/Dropdown.jsx';
import {ReactComponent as Plus} from './assets/plus.svg';
import { useAuth0 } from "@auth0/auth0-react";


const Dashboard = () => {
 const [notes,setNotes] = useState([]);
 const [newNote, setNewNote] = useState(null)
 const [newContent, setNewContent] = useState("");
 const [open,setOpen] = useState(false);
 const { user } = useAuth0();

 if (!notes) { 
  return null 
}

 useEffect(() => {
  noteService
    .getAll()
    .then(initialNotes => {
      setNotes(initialNotes);
    })
}, [])

 const handleOpen = () => {
  setOpen(!open);
  setNewNote("");
 };

 const handleNoteChange = (event) => {
  console.log(event.target.value);
  setNewNote(event.target.value);
}

 const addNote = (event) => {
    if (newNote === "") {
      event.preventDefault();
      window.alert("List name must not be empty");
    }
    else {
    event.preventDefault();
    const noteObject = {
      name: newNote,
      content: [],
      id: notes.length + 1
    }

    noteService.create(noteObject).then((returnedNote)=> {
      setNotes(notes.concat(returnedNote));
      setNewNote("");
    })
  }
 }

 const handleContentChange = (event) => {
  console.log(event.target.value);
  setNewContent(event.target.value);
}

const changeContent = (event, id) => {
  event.preventDefault();
  console.log("hello");
  console.log(id)
  const note = notes.find(n => n.id === id);
  const oldContent = note.content;
  console.log(oldContent)

  const contentObject = {
      taskItem: newContent,
      id: note.content.length + 1,
  }
  
  const updatedContent = oldContent.concat(contentObject);
  console.log(updatedContent);

  const changedNote = {
    ...note,
    content: updatedContent
  }
  console.log(changedNote);

  
  noteService.update(id, changedNote).then(returnedNote => {
    setNotes(notes.map(note => note.id !== id ? note : returnedNote));
    setNewContent("");
  })
  

}


 if (!user) {
   return null;
 }



  return (

      <section id="dashboard">
        <Nav userName={user.name} />

        <div className="selector">
          <div className="dropdownWrapper" >
              <CreateButton buttonName="Add Checklist +" toggleOpen={handleOpen}/>
          </div>
          <CreateButton buttonName="Add Timer +" />
        </div>
        <div id="board">
          <div id="board-canvas">
                <div className="note-wrapper">
                      {
                        notes.map((note) => 
                          <Note note={note} key={note.id} changeContent={() => changeContent(event, note.id)} handleContentChange={handleContentChange} newContent={newContent} setNewContent={setNewContent}/>
                        )
                      }
                      <div className="add-wrapper">
                            {
                              open ? <Dropdown handleOpen={handleOpen} newNote={newNote} handleNoteChange={handleNoteChange} addNote={addNote}/> :
                            
                                  <div className="note-button-2" onClick={handleOpen}>
                                      <Plus style={{width:"7%", color: "#fff", marginLeft: "0.5rem"}}/>
                                      <p className="note-button-text-2">Add new list</p>
                                  </div>
                            }
                      
                      </div>
                      {open ? (<div className='overlay' onClick={() => setOpen(false)} />) : null}
                </div>
                
          </div>
        </div>

      </section>
  )
}

export default Dashboard;
