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
            <div className="slogan-wrapper">
              <h2 className="main-title">
                Your digital transformation begins here!
              </h2>
              <h5 className="sub-title">
                Unlock the full potential of your business. Start your journey
                today and experience the future of business software.
              </h5>
              <TryButton buttonName="Get started today!" />
            </div>
          </div>
          <div className="subTextWrapper">
            <ReactComponent class="svgcomp" />
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;
