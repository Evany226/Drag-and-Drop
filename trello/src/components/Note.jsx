import "../css/Note.css"
import "../css/index.css"
import {ReactComponent as Plus} from '../assets/plus.svg';
import {useState} from "react"
import Dropdown from "./Dropdown.jsx"

const Note = ({note}) => {
    const [open,setOpen] = useState(false);

    if (!note.content) {
        return null;
    } 

    const handleOpen = () => {
        setOpen(!open);
        console.log(open);
       };

    const contentArr = note.content;

    return (
        <div className="list-container">
            <div className="note-header">
                <p className="note-name"> {note.name}</p>
            </div>
            <div className="note-body">
                {
                    contentArr.map((item) => {
                        return <p className="note-body-text" key={item.id}>{item.taskItem}</p>
                    })
                }
                    <div className="note-button">
                    {open 
                        ? <p onClick={handleOpen}>Hello</p> : 
                        <>
                            <Plus style={{width:"8%", color: "#7e889b"}}/>
                            <p className="note-button-text" onClick={handleOpen}>Add new card</p>
                        </>
                    }
                    </div>
            </div>  
        </div>
    )
}

export default Note;