import React from "react";
import ChatBot from "./chatbot"; // Ensure this path is correct
import "./../../styles/AskAI.css"; // Ensure the CSS file is correctly linked

const AskAI = () => {
  return (
    <div className="askai-container">
      <h2>AskAI</h2>
      <div className="chatbot">
        <ChatBot />
      </div>
      <footer className="footer">
        <p>
          This service is powered by Google Gemini. Please refer to the
          <a
            href="https://cloud.google.com/terms"
            target="_blank"
            rel="noopener noreferrer"
          >
            Google Cloud Terms of Service
          </a>{" "}
          for more information.
        </p>
      </footer>
    </div>
  );
};

export default AskAI;
