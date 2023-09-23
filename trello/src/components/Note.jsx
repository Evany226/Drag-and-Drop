import "../css/Note.css"
import "../css/index.css"
import {ReactComponent as Plus} from '../assets/plus.svg';

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
                    <div className="note-button">
                        <Plus style={{width:"8%", color: "#7e889b"}}/>
                        <p className="note-button-text">Add new card</p>
                    </div>
            </div>  
        </div>
    )
}

export default Note;