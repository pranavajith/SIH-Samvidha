import React, { useContext, useState, useEffect } from "react";
import "./../../styles/CreateLobby.css";
import { UserContext } from "../../context/UserContext";
import { constitutional_questions } from "../dummy-data/dummy-data";
import { useNavigate } from "react-router-dom";
import { useWebSocket } from "../../context/WebSocketContext";

const CreateLobby = () => {
  const navigate = useNavigate();
  const { user } = useContext(UserContext);
  const { connectWebSocket } = useWebSocket();
  const [gameType, setGameType] = useState("FlashCards");
  const [questionList, setQuestionList] = useState("Preamble");
  const [ws, setWs] = useState(null);

  useEffect(() => {
    const socket = connectWebSocket();
    setWs(socket);

    if (socket) {
      socket.onopen = () => {
        console.log("WebSocket connection established in CreateLobby.js.");
      };

      socket.onmessage = (message) => {
        const messageData = JSON.parse(message.data);
        if (messageData.messageType === "LobbyListUpdate") return;
        console.log("Message received in CreateLobby.js: ", messageData);
        navigate("/waitinglobby", { state: { messageData } });
      };
    }
  }, []);

  const handleCreateLobby = (e) => {
    e.preventDefault();

    const lobbyContent = {
      gameType: gameType,
      questionList: constitutional_questions.executive_questions,
    };

    const lobbyData = {
      messageType: "CreateLobby",
      messageContent: lobbyContent,
      username: user.username,
    };

    if (ws && ws.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify(lobbyData));
      console.log("Lobby creation request sent:", lobbyData);
    } else {
      console.error("WebSocket connection is not open.");
    }
  };

  return (
    <div className="lobby-container">
      <h1 className="lobby-title">Create a Game Lobby</h1>
      <form className="lobby-form" onSubmit={handleCreateLobby}>
        <div className="form-group">
          <label htmlFor="gameType">Game Type:</label>
          <select
            id="gameType"
            value={gameType}
            onChange={(e) => setGameType(e.target.value)}
            required
          >
            <option value="FlashCards">FlashCards</option>
          </select>
        </div>

        <div className="form-group">
          <label htmlFor="questionList">Question List:</label>
          <select
            id="questionList"
            value={questionList}
            onChange={(e) => setQuestionList(e.target.value)}
            required
          >
            <option value="Preamble">Preamble</option>
          </select>
        </div>

        <button className="create-button" type="submit">
          Create Lobby
        </button>
      </form>
    </div>
  );
};

export default CreateLobby;
