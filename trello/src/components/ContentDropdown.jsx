import '../css/ContentDropdown.css'
import {ReactComponent as CloseButton} from '../assets/x.svg';

const ContentDropdown = ({handleOpen}) => {
    return (
    <div id="content-dropdown">
        <form className="content-dropdown-form">
            <div className="content-input-wrapper">
                <textarea className="content-input" placeholder="Enter Name..."/>
            </div>
            <div className="content-button-wrapper">
                <button className="content-button" type="submit" >Add</button>
                <CloseButton style={{width:"10%"}} onClick={handleOpen}/>
            </div>
        </form>   
    </div>
    )
}

export default ContentDropdown