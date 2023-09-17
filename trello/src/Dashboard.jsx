import './css/Dashboard.css'
import Button from "./components/Button.jsx"
import'./css/index.css'
import { useState, useEffect } from "react";
import noteService from './services/notes';
import Note from './components/Note.jsx'



const Dashboard = () => {
 const [notes,setNotes] = useState([]);

  return (

      <section id="dashboard">
        <nav className="nav">
          <h5 className="nav-name"> Evan Yang's Workspace </h5>
        </nav>
        <div className="selector">
          <Button buttonClass="create-button" buttonName="Add Checklist +"/>
          <Button buttonClass="create-button" buttonName="Add Timer +" />
        </div>
        <div id="board-canvas">
              <div class="note-wrapper">
                  <Note/>
              </div>
        </div>
      </section>
  )
}

export default Dashboard;
