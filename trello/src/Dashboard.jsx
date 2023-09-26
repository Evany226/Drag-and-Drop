import './css/Dashboard.css'
import './css/Button.css'
import'./css/index.css'
import CreateButton from "./components/CreateButton.jsx"
import { useState, useEffect } from "react";
import noteService from './services/notes';
import Note from './components/Note.jsx'
import Nav from './components/Nav.jsx';
import Dropdown from './components/Dropdown.jsx';
import { useAuth0 } from "@auth0/auth0-react";



const Dashboard = () => {
 const [notes,setNotes] = useState([]);
 const [open,setOpen] = useState(false);
 const [newNote, setNewNote] = useState("")
 const { user } = useAuth0();

 useEffect(() => {
  noteService
    .getAll()
    .then(initialNotes => {
      setNotes(initialNotes);
      console.log(initialNotes);
    })
}, [])


 const handleOpen = () => {
  setOpen(!open);
 };
 

 const addNote = (event) => {
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



const changeContent = (event, id) => {
  event.preventDefault();
  console.log("hello");
  console.log(id)
  const note = notes.find(n => n.id === id);
  const oldContent = note.content;

  /*
  const updatedContent = oldContent.concat(newContent);
  console.log(updatedContent);

  const changedNote = {
    ...notes,
    content: updatedContent
  }
  
  noteService.update(id, changedNote).then(returnedNote => {
    setNotes(notes.map(note => note.id !== id ? note : returnedNote))
  })
  */

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
              {open && <Dropdown addNote={addNote} newNote={newNote} handleNoteChange={handleNoteChange}/> }
          </div>
          <CreateButton buttonName="Add Timer +" />
        </div>
        <div id="board">
          <div id="board-canvas">
                <div className="note-wrapper">
                      {
                        notes.map((note) => 
                          <Note note={note} key={note.id} changeContent={() => changeContent(event, note.id)} />
                        )
                      }
                </div>
          </div>
        </div>
      </section>
  )
}

export default Dashboard;
