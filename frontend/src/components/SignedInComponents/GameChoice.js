import React from "react";
import "./../../styles/GameChoice.css";
import { useNavigate } from "react-router-dom";

const GameChoice = () => {
  const navigate = useNavigate();
  return (
    <div className="button-wrapper">
      <button
        className="game-choice-button single-player-button"
        onClick={() => {
          navigate("/singleplayer");
        }}
      >
        Single Player
      </button>
      <button
        className="game-choice-button multi-player-button"
        onClick={() => {
          navigate("/multiplayer");
        }}
      >
        Multi Player
      </button>
    </div>
  );
};

export default GameChoice;
