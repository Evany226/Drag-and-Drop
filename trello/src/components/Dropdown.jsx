import '../css/Dropdown.css'
import {ReactComponent as CloseButton} from '../assets/x.svg';


const Dropdown = ({addNote, newNote, handleNoteChange, handleOpen}) => {
    return (
        <div id="dropdown">
        <form className="dropdown-form" onSubmit={
            addNote
            }>

            <div className="dropdown-input-wrapper">
                <textarea className="dropdown-input" placeholder="Enter Name..." value={newNote} onChange={handleNoteChange}/>
            </div>
            <div className="dropdown-button-wrapper">
                <button className="dropdown-button" type="submit" >Add</button>
                <CloseButton style={{width:"10%", cursor:"pointer"}} onClick={handleOpen}/>
            </div>
        </form>   
    </div>
    )
}

export default Dropdown