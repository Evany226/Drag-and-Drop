import "../css/Dashboard.css"
import Button from "./Button.jsx"

const Nav = () => {
    return (
        <nav className="nav">
          <h5 className="nav-name"> Someone's Workspace </h5>
          <Button buttonClass="signout-button" buttonName="Sign out" />
        </nav>
    )
}

export default Nav;