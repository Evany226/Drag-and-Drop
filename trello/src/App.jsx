import "./css/Loader.css";
import { Routes, Route } from "react-router-dom";
import { useAuth0 } from "@auth0/auth0-react";
import PageLoader from "./components/PageLoader.jsx";
import Home from "./pages/HomePage.jsx";
import Dashboard from "./Dashboard.jsx";
import CallBackPage from "./pages/CallBackPage.jsx";
import AuthenticationGuard from "./components/AuthGuard.jsx";
import BoardSelectPage from "./pages/BoardSelectPage.jsx";

function App() {
  const { isLoading } = useAuth0();

  if (isLoading) {
    return (
      <div className="page-layout">
        <PageLoader />
      </div>
    );
  }

  return (
    <>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route
          path="/boards/:id"
          element={<AuthenticationGuard component={Dashboard} />}
        />
        <Route
          path="/dashboard"
          element={<AuthenticationGuard component={BoardSelectPage} />}
        />
        <Route path="/callback" element={<CallBackPage />} />
      </Routes>
    </>
  );
}

export default App;
