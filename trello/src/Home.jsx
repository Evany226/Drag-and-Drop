import './css/Home.css';
import Button from './components/Button';
import mainLogo from './assets/duck.png';


function Home() {

    return (
        <>

            <section id="background">
                <nav className="homeNav">
                    <div id="titleWrapper">
                        <h1 class="title"> Template</h1>
                        <h2 class="title-2">design </h2>

                        <div id="logoWrapper">
                            <img src={mainLogo} />
                         </div>

                    </div>
                    <Button buttonClass="login-button" buttonName="Login"/>

                </nav>
            <div id="wrapper">
                <div id="foreground">
                </div>
            </div>
            </section>

        </>
    )


  }
  
  export default Home;
  