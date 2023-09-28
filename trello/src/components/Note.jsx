import "../css/Note.css"
import "../css/index.css"
import {ReactComponent as Plus} from '../assets/plus.svg';
import ContentDropdown from "./ContentDropdown.jsx";
import {useState} from "react";

const Note = ({note,changeContent, handleContentChange,newContent,setNewContent}) => {
const [open,setOpen] = useState(false);

    const handleOpen = () => {
        setOpen(!open);
        setNewContent("");
    };

    if (!note.content) {
        return null;
    } 

    const contentArr = note.content;

    return (
        <div className="note-container">
            <div className="note-header">
                <p className="note-name"> {note.name}</p>
            </div>
            <div id="note-body">
                {
                    contentArr.map((item) => {
                        return <p className="note-body-text" key={item.id}>{item.taskItem}</p>
                    })
                }

            {open 
                ? <ContentDropdown handleOpen={handleOpen} changeContent={changeContent} newContent={newContent} handleContentChange={handleContentChange}/> : 
                <div className="note-button" onClick={handleOpen}>
                    <Plus style={{width:"8%", color: "#7e889b"}}/>
                    <p className="note-button-text">Add new card</p>
                </div>
            }

            {open ? (<div className='overlay' onClick={() => setOpen(false)} />) : null}

            </div>  
            
        </div>
        
    )
}

export default Note;