import "../css/Home.css";
import "../css/Button.css";
import "../css/index.css";
import SignupButton from "../components/SignupButton.jsx";
import LoginButton from "../components/LoginButton.jsx";
import TryButton from "../components/TryButton.jsx";
import { ReactComponent } from "../assets/new.svg";

function Home() {
  return (
    <>
      <section id="background">
        <nav className="homeNav">
          <div id="titleWrapper">
            <h3 className="title"> dragn</h3>
            <h3 className="title-2">drop </h3>
          </div>
          <div className="buttonWrapper">
            <LoginButton buttonName="Log In" />
            <SignupButton buttonName="Sign Up" />
          </div>
        </nav>

        <div id="foreground">
          <div className="mainTextWrapper">
            <ReactComponent style={{ width: "80%" }} />
          </div>
          <div className="subTextWrapper">
            <div className="slogan-wrapper">
              <h2 className="main-title">Organize your life!</h2>
              <h5 className="sub-title">
                Lorem Ipsum is simply dummy text of the printing and typesetting
                industry. Lorem Ipsum is simply dummy text of the printing and
                typesetting industry. Lorem Ipsum is simply dummy text of the
                printing and typesetting industry.
              </h5>
              <TryButton buttonName="Try for free" />
            </div>
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;
