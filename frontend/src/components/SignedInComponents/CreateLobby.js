import React, { useContext, useState, useEffect } from "react";
import "./../../styles/CreateLobby.css";
import { UserContext } from "../../context/UserContext";
import { constitutional_questions } from "../dummy-data/dummy-data";

const CreateLobby = () => {
  const { user } = useContext(UserContext);
  const [gameType, setGameType] = useState("FlashCards");
  const [questionList, setQuestionList] = useState("Preamble");
  const [ws, setWs] = useState(null); // WebSocket instance

  // Initialize WebSocket connection on component mount
  useEffect(() => {
    const socket = new WebSocket(
      `ws://localhost:8080/ws?username=${user.username}`
    );

    // Set up WebSocket event listeners
    socket.onopen = () => {
      console.log("WebSocket connection established.");
    };

    socket.onmessage = (message) => {
      const data = JSON.parse(message.data);
      console.log("Message received:", data);
      // Handle incoming messages, e.g., lobby created, questions sent, etc.
    };

    socket.onclose = () => {
      console.log("WebSocket connection closed.");
    };

    socket.onerror = (error) => {
      console.error("WebSocket error:", error);
    };

    // Store WebSocket instance in state
    setWs(socket);

    // Clean up WebSocket on component unmount
    return () => {
      if (socket) {
        socket.close();
      }
    };
  }, [user.username]);

  const handleCreateLobby = (e) => {
    e.preventDefault();

    // Prepare data in the correct format to send over WebSocket
    const lobbyContent = {
      gameType: gameType,
      questionList: constitutional_questions.executive_questions,
    };

    const lobbyData = {
      messageType: "CreateLobby",
      messageContent: lobbyContent, // Directly assign the object here
      username: user.username, // Include username
    };

    if (ws && ws.readyState === WebSocket.OPEN) {
      ws.send(JSON.stringify(lobbyData)); // Send lobby creation data via WebSocket
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
