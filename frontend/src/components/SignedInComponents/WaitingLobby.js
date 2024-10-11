import { useLocation } from "react-router-dom";
import { useWebSocket } from "../../context/WebSocketContext";

const WaitingLobby = () => {
  const location = useLocation();
  const { ws } = useWebSocket();
  if (ws) {
    ws.onmessage = (message) => {
      const messageData = JSON.parse(message.data);
      console.log("Message recieved in WaitingLobby.js: ", messageData);
    };
    const lobbyData = {
      messageType: "Dummy",
    };
    console.log("hi!!");
    ws.send(JSON.stringify(lobbyData));
  }
  return <div></div>;
};

export { WaitingLobby };
