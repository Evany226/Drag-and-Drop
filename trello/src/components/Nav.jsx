import "../css/Dashboard.css"
import LogoutButton from "./LogoutButton.jsx"

const Nav = ({userName}) => {
    return (
        <nav className="nav">
          <h5 className="nav-name"> {userName}'s Workspace </h5>
          <LogoutButton buttonName="Sign out" />
        </nav>
    )
}

export default Nav;