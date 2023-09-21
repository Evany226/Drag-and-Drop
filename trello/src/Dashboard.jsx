import './css/Dashboard.css'
import './css/Button.css'
import'./css/index.css'
import CreateButton from "./components/CreateButton.jsx"
import { useState, useEffect } from "react";
import noteService from './services/notes';
import Note from './components/Note.jsx'
import Nav from './components/Nav.jsx';
import { useAuth0 } from "@auth0/auth0-react";



const Dashboard = () => {
 const [notes,setNotes] = useState([]);

 const { user } = useAuth0();

  if (!user) {
    return null;
  }


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
        <Nav userName={user.name} />

        <div className="selector">
          <CreateButton buttonName="Add Checklist +"/>
          <CreateButton buttonName="Add Timer +" />
        </div>
        <div id="board-canvas">
              <div className="note-wrapper">
                    {
                      notes.map((note) => 
                        <Note note={note} key={note.id}/>
                      )
                    }
              </div>
              <div>{JSON.stringify(user, null, 2)}</div>
        </div>
      </section>
  )
}

export default Dashboard;
