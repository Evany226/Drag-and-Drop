import './css/App.css'
import Button from "./components/Button.jsx"

function App() {

  return (

      <section id="background">
        <nav class="nav">
          <h1 class="nav-name"> Journaly </h1>
        </nav>
        <div class="main">
          <Button buttonName="Add Checklist +"/>
          <Button buttonName="Add Timer +" />
        </div>
      </section>
  )
}

export default App
