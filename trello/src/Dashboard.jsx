import './css/Dashboard.css'
import Button from "./components/Button.jsx"
import'./css/index.css'
import { useState, useEffect } from "react";
import noteService from './services/notes';
import Note from './components/Note.jsx'



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
        <nav className="nav">
          <h5 className="nav-name"> Evan Yang's Workspace </h5>
          <Button buttonClass="signout-button" buttonName="Sign out" />
        </nav>
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
