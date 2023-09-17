import "../css/Note.css"
import "../css/index.css"


const Note = ({note}) => {
    return (
        <div className="list-container">
            <div className="note-header">
                <p className="note-name"> {note.name}</p>
            </div>
        </div>
    )
}

export default Note;