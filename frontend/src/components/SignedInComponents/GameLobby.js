import React, { useState, useEffect, useContext } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import { useWebSocket } from "../../context/WebSocketContext";
import "./../../styles/GameLobby.css";
import { UserContext } from "../../context/UserContext";
import axios from "axios";
import { urlList } from "../../urls";

const GameLobby = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { lobbyDetails } = location.state || {};
  const { ws } = useWebSocket();
  const [questionData, setQuestionData] = useState(null);
  const [selectedOption, setSelectedOption] = useState(null);
  const [correctOption, setCorrectOption] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const [playerScores, setPlayerScores] = useState(lobbyDetails.players); // Initialize with players
  const lobbyId = lobbyDetails.lobbyId;
  const { user, setUser } = useContext(UserContext);

  const handleUpdateStreak = async () => {
    // Now send another request to update the streak
    const streakUpdateResponse = await axios.post(
      `${urlList.backendDatabase}/user/streak-update`,
      {
        username: user.username,
      },
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    if (streakUpdateResponse.status !== 200) {
      throw new Error("Failed to update streak");
    }

    console.log("Streak updated successfully");
    // Now send another request to update the streak
    const newUser = await axios.get(
      `${urlList.backendDatabase}/user?username=${user.username}`,
      {
        headers: {
          "Content-Type": "application/json",
        },
      }
    );

    console.log("User data retrieved successfully");
    console.log(newUser.data);

    if (newUser.data) {
      setUser((prevUser) => ({
        ...prevUser,
        streakData: newUser.data.streakData,
      }));
    }
  };

  useEffect(() => {
    if (ws) {
      ws.onmessage = (message) => {
        const receivedMessage = JSON.parse(message.data);

        if (receivedMessage.messageType === "QuestionUpdate") {
          console.log("Question received in GameLobby: ", receivedMessage);

          // Set question and start time
          setQuestionData(receivedMessage.messageContent);
          setStartTime(Date.now()); // Set the start time when question is received
          setSelectedOption(null); // Reset selection when new question is received
          setCorrectOption(null); // Reset correct option highlight
        } else if (receivedMessage.messageType === "ScoreUpdate") {
          console.log("Score update received: ", receivedMessage);
          const updatedScores = receivedMessage.messageContent;
          setPlayerScores((prevScores) =>
            prevScores.map((player) =>
              player.username === updatedScores.username
                ? { ...player, score: updatedScores.score }
                : player
            )
          );
        } else if (receivedMessage.messageType === "EndGame") {
          console.log("Game ended: ", receivedMessage);
          handleUpdateStreak();
          navigate("/user");
        }
      };
    }
  }, [ws]);

  const handleOptionClick = (option) => {
    if (selectedOption !== null) return; // Disable selection once an option is clicked

    setSelectedOption(option);

    // Find the correct option
    const correct = questionData.options.find((opt) => opt.correctStatus);
    setCorrectOption(correct);

    // Prepare and send the answer to the backend
    const submitAnswer = {
      messageType: "SubmitAnswer",
      messageContent: {
        lobbyId: lobbyId,
        answer: option.value,
        startTime: Math.floor(startTime / 1000), // Convert to Unix timestamp
      },
    };

    ws.send(JSON.stringify(submitAnswer));
    console.log("Answer submitted: ", submitAnswer);
  };

  return (
    <div className="game-lobby-container">
      {/* Player Scores Sidebar */}
      <div className="player-scores-container">
        <h2>Players</h2>
        <ul>
          {playerScores.map((player, index) => (
            <li key={index} className="player-score-item">
              {player.username}: {player.score}
            </li>
          ))}
        </ul>
      </div>

      {/* Question and Options */}
      <div className="gameplay-container-multi">
        {questionData ? (
          <>
            <div className="display-text">
              <p>
                <strong>Question:</strong> {questionData.question}
              </p>
            </div>

            <div className="options">
              {questionData.options.map((option, index) => (
                <button
                  key={index}
                  className={`option-button ${
                    selectedOption === option
                      ? option.correctStatus
                        ? "correct"
                        : "incorrect"
                      : correctOption === option
                      ? "correct"
                      : ""
                  }`}
                  onClick={() => handleOptionClick(option)}
                  disabled={selectedOption !== null}
                >
                  {option.value}
                </button>
              ))}
            </div>

            {selectedOption && (
              <div className="feedback">
                {selectedOption.correctStatus ? (
                  <p className="correct-feedback">Correct! Well done!</p>
                ) : (
                  <p className="incorrect-feedback">
                    Incorrect! Try again next time.
                  </p>
                )}
              </div>
            )}
          </>
        ) : (
          <p>Waiting for the next question...</p>
        )}
      </div>
    </div>
  );
};

export { GameLobby };
