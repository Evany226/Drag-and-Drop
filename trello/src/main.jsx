import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import Auth0ProviderWithNavigate from "./Auth0Provider.jsx";
import { BrowserRouter as Router } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <Auth0ProviderWithNavigate>
        <App />
      </Auth0ProviderWithNavigate>
    </Router>
  </React.StrictMode>
);
