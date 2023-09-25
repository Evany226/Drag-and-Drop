import '../css/Dropdown.css'
import '../css/index.css'

const Dropdown = ({addNote, newNote, handleNoteChange}) => {
    return (
        <div id="dropdown">
            <form className="dropdown-form" onSubmit={addNote}>
                <input placeholder="Enter Name..." value={newNote} onChange={handleNoteChange}/>
                <button className="dropdown-input" type="submit" >Add</button>
            </form>   
        </div>
    )
}

export default Dropdown