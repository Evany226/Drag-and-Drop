import './css/Dashboard.css'
import Button from "./components/Button.jsx"
import'./css/index.css'
import { useState, useEffect } from "react";
import noteService from './services/notes';
import Note from './components/Note.jsx'
import Nav from './components/Nav.jsx';



const Dashboard = () => {
 const [notes,setNotes] = useState([]);


 useEffect(() => {
  noteService
    .getAll()
    .then(initialNotes => {
      setNotes(initialNotes);
      console.log(initialNotes);
    })
}, [])

  return (

      <section id="dashboard">
        <Nav />

        <div className="selector">
          <Button buttonClass="create-button" buttonName="Add Checklist +"/>
          <Button buttonClass="create-button" buttonName="Add Timer +" />
        </div>
        <div id="board-canvas">
              <div className="note-wrapper">
                    {
                      notes.map((note) => 
                        <Note note={note} key={note.id}/>
                      )
                    }
              </div>
        </div>
      </section>
  )
}

export default Dashboard;
