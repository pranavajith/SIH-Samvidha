import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import reportWebVitals from "./reportWebVitals";
import { UserProvider } from "./context/UserContext";
import { BrowserRouter as Router } from "react-router-dom";
// import { useTranslation } from "react-i18next";
// can add icons to timeline
// can add learn more button at end
import "./utils/i18n";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  //<React.StrictMode>
  <Router>
    <UserProvider>
      <App />
    </UserProvider>
  </Router>
  //</React.StrictMode>
);
reportWebVitals();
