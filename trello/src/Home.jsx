import './css/Home.css';
import Button from './components/Button';
import mainLogo from './assets/duck.png';
import {ReactComponent as ReactLogo} from './assets/design.svg';


function Home() {

    return (
        <>
            <section id="background">
                <nav className="homeNav">
                    <div className="navAdjust"> 
                        <div id="titleWrapper">
                            <h1 class="title"> Template</h1>
                            <h2 class="title-2">Design </h2>

                            <div id="logoWrapper">
                                <img src={mainLogo} />
                            </div>
                        </div>
                        <div class="buttonWrapper">
                            <Button buttonClass="login-button" buttonName="Log In" />
                            <Button buttonClass="signup-button" buttonName="Sign Up"/>
                        </div>
                    </div>
                </nav>

            <div id="wrapper">
                <div id="foreground">
                    <div class="mainTextWrapper">
                        <h1 class="main-title">Lorem Ipsum <br></br> typesetting </h1>
                        <h2 class="sub-title">Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum is simply dummy text of the printing and typesetting industry.</h2>
                    </div>
                    <ReactLogo />
                </div>
            </div>
            </section>

        </>
    )


  }
  
  export default Home;
  