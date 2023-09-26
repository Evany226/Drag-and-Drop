import "../css/Note.css"
import "../css/index.css"
import {ReactComponent as Plus} from '../assets/plus.svg';
import {useState} from "react"
import ContentDropdown from "./ContentDropdown.jsx"

const Note = ({note,changeContent}) => {
    const [open,setOpen] = useState(false);
    const [newContent, setNewContent] = useState("");
    

    if (!note.content) {
        return null;
    } 


    const handleContentChange = (event) => {
        console.log(event.target.value);
        setNewContent(event.target.value);
      }
      

    

    const handleOpen = () => {
        setOpen(!open);
        console.log(open);
       };

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

            </div>  
            
        </div>
        
    )
}

export default Note;