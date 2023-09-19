import {
    Routes, Route, Link
  } from 'react-router-dom';

import Home from './pages/HomePage.jsx';
import Dashboard from './Dashboard.jsx';
import CallBackPage from './pages/CallBackPage.jsx'

function App() {

    return (
        <>


            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/dashboard" element= {<Dashboard />} />
                <Route path ="/callback" element= {<CallBackPage />} />
            </Routes>

        </>
    )
}

export default App;
