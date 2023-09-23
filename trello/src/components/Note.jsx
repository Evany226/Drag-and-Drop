import "../css/Note.css"
import "../css/index.css"


const Note = ({note}) => {
    if (!note.content) {
        return null;
    } 

    const contentArr = note.content;

    return (
        <div className="list-container">
            <div className="note-header">
                <p className="note-name"> {note.name}</p>
            </div>
            <div className="note-body">
                {
                    contentArr.map((item) => {
                        return <p className="note-body-text" key={item}>{item}</p>
                    })
                }
            </div>  
        </div>
    )
}

export default Note;