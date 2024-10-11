import React, { createContext, useState, useContext } from "react";
import { UserContext } from "./UserContext";

const WebSocketContext = createContext(null);

export const WebSocketProvider = ({ children }) => {
  const [ws, setWs] = useState(null);
  const { user } = useContext(UserContext);

  const connectWebSocket = () => {
    const socket = new WebSocket(
      `ws://localhost:8080/ws?username=${user.username}`
    );
    setWs(socket);
    return socket; // Return the WebSocket instance
  };

  return (
    <WebSocketContext.Provider value={{ ws, connectWebSocket }}>
      {children}
    </WebSocketContext.Provider>
  );
};

export const useWebSocket = () => {
  return useContext(WebSocketContext);
};
