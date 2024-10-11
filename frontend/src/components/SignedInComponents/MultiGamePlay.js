import React from "react";
import "./../../styles/MultiGamePlay.css";
import { useNavigate } from "react-router-dom";

export const MultiGamePlay = () => {
  const navigate = useNavigate();

  return (
    <div className="lobby-button-container">
      <button
        className="create-lobby-button"
        onClick={() => navigate("/createlobby")}
      >
        Create Lobby
      </button>
      <button
        className="join-lobby-button"
        onClick={() => navigate("/joinlobby")}
      >
        Join Lobby
      </button>
    </div>
  );
};

export default MultiGamePlay;
