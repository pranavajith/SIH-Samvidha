import React, { useState } from "react";
import "./../../styles/AskAI.css";
import { GoogleGenerativeAI } from "@google/generative-ai";
import ChatbotAnimation from "./ChatbotAnimation";
import { useEffect } from "react";
import { useNarration } from '../../context/NarrationContext';
import { getNarrationText } from '../../utils/narrationData';

// Initialize the GoogleGenerativeAI Client
const genAI = new GoogleGenerativeAI(process.env.REACT_APP_GEMINI_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-pro" }); // Adjust based on your desired model

const ChatBot = () => {
  const { isNarrationActive, toggleNarration, narrate } = useNarration();
  
  useEffect(() => {
    if (isNarrationActive) {
      narrate(getNarrationText("AskAIMain"));
    }
  }, [isNarrationActive, narrate]);

  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const [animationVisible, setAnimationVisible] = useState(true);

  const sendMessage = async () => {
    if (!input) return;

    setMessages([...messages, { sender: "user", text: input }]);
    setLoading(true);
    setAnimationVisible(false);

    try {
      // Modify the prompt to pre-prompt the model
      const prompt = `
            You are an AI expert on the Indian Constitution. Please only answer questions directly related to the Indian Constitution. 
            If the user's question is not related to the Indian Constitution, respond with: "Sorry, I can only answer questions about the Indian Constitution."
            User question: ${input}`;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      let chatbotResponse =
        (await response.text()) || "Sorry, I didn't understand that.";

      // Apply formatting if needed
      chatbotResponse = formatResponse(chatbotResponse);

      // Append the bot's response to the chat
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: "bot", text: chatbotResponse },
      ]);
    } catch (error) {
      console.error("Error communicating with chatbot:", error);
      setMessages((prevMessages) => [
        ...prevMessages,
        { sender: "bot", text: "Error: Couldn't fetch response." },
      ]);
    }

    setLoading(false);
    setInput(""); // Clear the input field
  };

  const formatResponse = (response) => {
    let formatted = response.trim();
    formatted = formatted.replace(/\*\*(.*?)\*\*/g, "<b>$1</b>");
    const lines = formatted.split("\n");
    let result = "";
    let listStack = [];

    lines.forEach((line) => {
      if (line.startsWith("* ")) {
        const text = line.substring(2).trim();
        const indentLevel = line.search(/\S/);
        const currentLevel = Math.floor(indentLevel / 4);

        while (listStack.length > currentLevel) {
          result += "</ul>";
          listStack.pop();
        }

        if (listStack.length < currentLevel) {
          result += "<ul>";
          listStack.push(currentLevel);
        }

        result += `<li>${text}</li>`;
      } else {
        while (listStack.length > 0) {
          result += "</ul>";
          listStack.pop();
        }
        result += `<p>${line}</p>`;
      }
    });

    while (listStack.length > 0) {
      result += "</ul>";
      listStack.pop();
    }

    return result;
  };

  return (
    <div className="askai">
      {animationVisible && (
        <div className="animation-placeholder">
          <ChatbotAnimation />
          <p className="welcome-message">
            Welcome! Ask me about the Indian Constitution.
          </p>
        </div>
      )}
      <div className="chat-window">
        {messages.map((msg, idx) => (
          <div
            key={idx}
            className={msg.sender === "user" ? "user-message" : "bot-message"}
          >
            {msg.sender === "user" ? (
              msg.text
            ) : (
              <div dangerouslySetInnerHTML={{ __html: msg.text }} />
            )}
          </div>
        ))}
      </div>

      {loading && <p>Loading...</p>}

      <div style={{ display: "flex", alignItems: "center", marginTop: "1rem" }}>
        <input
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyPress={(e) => e.key === "Enter" && sendMessage()}
          placeholder="Explain the overall stucture of the Indian..."
        />
        <button className="button-ai" onClick={sendMessage} disabled={loading}>
          Send
        </button>
      </div>
    </div>
  );
};

export default ChatBot;
