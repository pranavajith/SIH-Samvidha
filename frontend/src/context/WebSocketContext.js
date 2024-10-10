import React, { createContext, useState, useEffect, useContext } from "react";

const WebSocketContext = createContext(null);

export const WebSocketProvider = ({ children }) => {
  const [ws, setWs] = useState(null);

  const generateSocket = ({ username }) => {
    const socket = new WebSocket(`ws://localhost:8080/ws?username=${username}`);

    socket.onopen = () => {
      console.log("WebSocket connection established.");
    };

    socket.onmessage = (message) => {
      const data = JSON.parse(message.data);
      console.log("Message received:", data);
      // Handle incoming messages
    };

    socket.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    // Update the WebSocket state
    setWs(socket);

    // Return the new WebSocket instance so it can be used immediately
    return socket;
  };

  return (
    <WebSocketContext.Provider value={{ ws, generateSocket }}>
      {children}
    </WebSocketContext.Provider>
  );
};

// Custom hook to use WebSocket context in any component
export const useWebSocket = () => {
  return useContext(WebSocketContext);
};
