import "../css/Home.css";
import "../css/Button.css";
import "../css/index.css";
import SignupButton from "../components/SignupButton.jsx";
import LoginButton from "../components/LoginButton.jsx";
import TryButton from "../components/TryButton.jsx";

function Home() {
  return (
    <>
      <section className="home-page">
        <nav className="home-nav">
          <div id="titleWrapper">
            <h3 className="title"> dragn</h3>
            <h3 className="title-2">drop </h3>
          </div>
          <div className="button-wrapper">
            <LoginButton buttonName="Log In" />
            <SignupButton buttonName="Signup" />
          </div>
        </nav>
        <div className="home-body">
          <div className="home-wrapper">
            <h1 className="home-title">
              The most comphrehensive Workplace Management Platform
            </h1>
            <p className="home-subtitle">
              Empower Your Workplace, Elevate Your Success: Navigating the
              Future of Efficient and Collaborative Management.
            </p>
            <TryButton buttonName="Get started" />
          </div>
        </div>
      </section>
    </>
  );
}

export default Home;
