import React, { useState, useEffect } from "react";
import { useLocation } from "react-router-dom";
import { useWebSocket } from "../../context/WebSocketContext";
import "./../../styles/WaitingLobby.css";

const WaitingLobby = () => {
  const location = useLocation();
  const { messageData } = location.state || {};
  const { ws } = useWebSocket();
  const [isLoading, setIsLoading] = useState(true); // Track loading state

  useEffect(() => {
    if (ws) {
      ws.onmessage = (message) => {
        const receivedMessage = JSON.parse(message.data);
        if (receivedMessage.messageType === "PlayerJoined") {
          setIsLoading(false); // Stop loading when another player joins
        }
      };
    }
  }, [ws]);

  const lobbyDetails = messageData;
  console.log("Here are the lobby details: ", lobbyDetails);

  return (
    <div className="waiting-lobby-container">
      <div className="lobby-details">
        <h2>Lobby Details</h2>
        <p>
          <strong>Lobby ID:</strong> {lobbyDetails.lobbyId}
        </p>
        <p>
          <strong>Created by:</strong> {lobbyDetails.createdUser}
        </p>
        <p>
          <strong>Game Type:</strong> {lobbyDetails.gameType}
        </p>
        <p>
          <strong>Question Count: </strong>
          {lobbyDetails.questionList.length}
        </p>

        <h3>Players:</h3>
        <ul>
          {lobbyDetails.players.map((player, index) => (
            <li key={index}>
              {player.username} - Score: {player.score}
            </li>
          ))}
        </ul>

        {/* <h3>Current Question:</h3>
        <p>
          {lobbyDetails.questionList[lobbyDetails.currentQuestion].question}
        </p>

        <h3>Options:</h3>
        <u>
          {lobbyDetails.questionList[lobbyDetails.currentQuestion].options.map(
            (option, index) => (
              <li key={index}>
                {option.value} {option.correctStatus ? "(Correct)" : ""}
              </li>
            )
          )}
        </u> */}
      </div>

      {isLoading && (
        <div className="loading-screen">
          <h2>Waiting for another player to join...</h2>
          <div className="loading-spinner"></div>
        </div>
      )}
    </div>
  );
};

export { WaitingLobby };
