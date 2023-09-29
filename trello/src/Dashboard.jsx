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
 const [newNote, setNewNote] = useState("")
 const [newContent, setNewContent] = useState("");
 const { user } = useAuth0();

 useEffect(() => {
  noteService
    .getAll()
    .then(initialNotes => {
      setNotes(initialNotes);
    })
}, [])
const [open,setOpen] = useState(false);

 const handleOpen = () => {
  setOpen(!open);
 };

 const handleContentChange = (event) => {
  console.log(event.target.value);
  setNewContent(event.target.value);
}

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


 //{open && <Dropdown addNote={addNote} newNote={newNote} handleNoteChange={handleNoteChange}/> }

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
                </div>
          </div>
        </div>
      </section>
  )
}

export default Dashboard;
