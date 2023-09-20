import '../css/Home.css'
import '../css/Button.css'
import'../css/index.css'
import SignupButton from '../components/SignupButton.jsx'
import LoginButton from '../components/LoginButton.jsx';
import mainLogo from '../assets/duck.png';
import {ReactComponent as ReactLogo} from '../assets/design.svg';



function Home() {

    return (
        <>
            <section id="background">
                <nav className="homeNav">
                    <div className="navAdjust"> 
                        <div id="titleWrapper">
                            <h3 className="title"> Template</h3>
                            <h3 className="title-2">Design </h3>

                            <div id="logoWrapper">
                                <img src={mainLogo} />
                            </div>
                        </div>
                        <div className="buttonWrapper">
                            <LoginButton buttonName="Log In" />
                            <SignupButton buttonName="Sign Up"/>
                        </div>
                    </div>
                </nav>

            <div id="wrapper">
                <div id="foreground">
                    <div className="mainTextWrapper">
                        <h1 className="main-title">Lorem Ipsum <br></br> typesetting </h1>
                        <h4 className="sub-title">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry.</h4>
                    </div>
                    <ReactLogo />
                </div>
            </div>
            </section>

        </>
    )


  }
  
  export default Home;
  