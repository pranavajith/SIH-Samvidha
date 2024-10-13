import React, { createContext, useState, useContext, useEffect } from "react";
import { UserContext } from "./UserContext";

const WebSocketContext = createContext(null);

export const WebSocketProvider = ({ children }) => {
  const [ws, setWs] = useState(null);
  const { user } = useContext(UserContext);

  const connectWebSocket = () => {
    if (!user) return null;
    const socket = new WebSocket(
      `ws://localhost:8080/ws?username=${user.username}`
    );
    socket.onopen = () => {
      console.log("WebSocket connection established");
      setWs(socket);
    };

    socket.onclose = () => {
      console.log("WebSocket connection closed");
      setWs(null);
    };
    return socket; // Return the WebSocket instance
  };

  useEffect(() => {
    connectWebSocket();

    // Cleanup on component unmount
    return () => {
      if (ws) {
        ws.close();
      }
    };
  }, [user]);

  return (
    <WebSocketContext.Provider value={{ ws, connectWebSocket }}>
      {children}
    </WebSocketContext.Provider>
  );
};

export const useWebSocket = () => {
  return useContext(WebSocketContext);
};
