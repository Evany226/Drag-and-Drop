import '../css/Dashboard.css'

const Button = ({buttonName, buttonClass}) => {
    return (
        <button className={buttonClass}>{buttonName}</button>
    )
}

export default Button;