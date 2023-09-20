import "../css/Dashboard.css"
import LogoutButton from "./LogoutButton.jsx"

const Nav = () => {
    return (
        <nav className="nav">
          <h5 className="nav-name"> Someone's Workspace </h5>
          <LogoutButton buttonName="Sign out" />
        </nav>
    )
}

export default Nav;