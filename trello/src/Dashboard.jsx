import './css/Dashboard.css'
import Button from "./components/Button.jsx"


function Dashboard() {

  return (

      <section id="dashboard">
        <nav className="nav">
          <h1 className="nav-name"> Journaly </h1>
        </nav>
        <div className="main">
          <Button buttonClass="create-button" buttonName="Add Checklist +"/>
          <Button buttonClass="create-button" buttonName="Add Timer +" />
        </div>
      </section>
  )
}

export default Dashboard;
