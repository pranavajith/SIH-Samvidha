import React, { useEffect, useState } from "react";
import { useWebSocket } from "../../context/WebSocketContext";
import "./../../styles/JoinLobby.css"; // Import your custom CSS
import { useNavigate } from "react-router-dom";

const JoinLobby = () => {
  const { ws } = useWebSocket();
  const navigate = useNavigate();
  const [lobbies, setLobbies] = useState([]); // State to hold the list of lobbies
  const [isLoading, setIsLoading] = useState(true); // State for loading

  useEffect(() => {
    if (!ws) {
      return; // Exit early if WebSocket is not ready
    }

    // Function to fetch lobbies
    const fetchLobbies = () => {
      // Send a request to get available lobbies
      const message = {
        messageType: "ShowLobbies",
        messageContent: {},
      };

      ws.send(JSON.stringify(message)); // Send the message to WebSocket server
    };

    fetchLobbies();

    // Listen for messages from the server
    const handleMessage = (event) => {
      const msg = JSON.parse(event.data);
      console.log("Message received in JoinLobby.js: ", msg);

      if (msg.messageType === "LobbyListUpdate") {
        setLobbies(msg.messageContent);
        setIsLoading(false);
      } else if (msg.messageType === "LobbyJoined") {
        console.log("Here is msg:", msg);
        navigate("/waitinglobby", {
          state: { msgContent: msg.messageContent },
        });
      }
    };

    ws.addEventListener("message", handleMessage); // Listen for incoming messages

    // Cleanup on component unmount
    return () => {
      ws.removeEventListener("message", handleMessage);
    };
  }, [ws]); // Add ws as a dependency

  // Function to join a lobby
  const joinLobby = (lobbyId) => {
    if (!ws) {
      console.error("WebSocket not connected");
      return; // Exit if WebSocket is not ready
    }

    const message = {
      messageType: "JoinLobby",
      messageContent: { lobbyId },
    };

    ws.send(JSON.stringify(message)); // Send the join lobby message
  };

  return (
    <div className="join-lobby-container">
      {isLoading ? (
        <div className="loading-screen">
          <h2>Loading lobbies...</h2>
          <div className="loading-spinner"></div>
        </div>
      ) : (
        <div className="lobby-details">
          <h2>Available Lobbies</h2>

          {lobbies && lobbies.length > 0 && (
            <ul>
              {lobbies.map((lobby) => (
                <li key={lobby.lobbyId}>
                  <h3>{lobby.gameType}</h3>
                  <p>Created by: {lobby.createdUser}</p>
                  <p>ID: : {lobby.lobbyId}</p>
                  <p>Number of Questions: {lobby.questionList.length}</p>
                  <button onClick={() => joinLobby(lobby.lobbyId)}>Join</button>
                </li>
              ))}
            </ul>
          )}
        </div>
      )}
    </div>
  );
};

export default JoinLobby;
