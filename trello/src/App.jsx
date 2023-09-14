import {
    Routes, Route, Link
  } from 'react-router-dom';

import Home from './Home.jsx';
import Dashboard from './Dashboard.jsx';

function App() {

    return (
        <>


            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/dashboard" element= {<Dashboard />} />
            </Routes>

        </>
    )
}

export default App;
