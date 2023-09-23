import '../css/Button.css'

const CreateButton = ({buttonName,toggleOpen}) => {
    return (
        <button className="create-button" onClick={toggleOpen}>{buttonName}</button>
    )
}

export default CreateButton;