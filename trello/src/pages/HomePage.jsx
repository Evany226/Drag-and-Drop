import "../css/Home.css";
import "../css/Button.css";
import "../css/index.css";
import SignupButton from "../components/SignupButton.jsx";
import LoginButton from "../components/LoginButton.jsx";
import { ReactComponent } from "../assets/new.svg";

function Home() {
  return (
    <>
      <section id="background">
        <nav className="homeNav">
          <div className="navAdjust">
            <div id="titleWrapper">
              <h3 className="title"> dragn</h3>
              <h3 className="title-2">drop </h3>
            </div>
            <h1 class="center-text">Test</h1>
          </div>
          <div className="buttonWrapper">
            <LoginButton buttonName="Log In" />
            <SignupButton buttonName="Sign Up" />
          </div>
        </nav>

        <div id="foreground">
          <div className="mainTextWrapper">
            <ReactComponent style={{ width: "90%" }} />
          </div>
          <div className="subTextWrapper">
            <h2 className="main-title">DragnDrop</h2>
            <h5 className="sub-title">
              Lorem Ipsum is simply dummy text of the printing and typesetting
              industry. Lorem Ipsum is simply dummy text of the printing and
              typesetting industry.
            </h5>
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;
