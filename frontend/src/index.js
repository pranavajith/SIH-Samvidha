import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import { UserProvider } from "./context/UserContext";
import { BrowserRouter as Router } from "react-router-dom";
// import { useTranslation } from "react-i18next";
// can add icons to timeline
// can add learn more button at end
import "./utils/i18n";
import { WebSocketProvider } from "./context/WebSocketContext";
const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  //<React.StrictMode>
  <Router>
    <UserProvider>
      <WebSocketProvider>
        <App />
      </WebSocketProvider>
    </UserProvider>
  </Router>
  //</React.StrictMode>
);
