import React from "react";
import "./../../styles/UserGameplay.css";
import LevelMap from "../GameComponents/LevelMap";

const UserGameplay = ({ inputLevels, handleLevelClick }) => {
  return (
    <div>
      <LevelMap
        levels={inputLevels}
        onLevelClick={handleLevelClick}
        levelText={
          inputLevels.length > 0 ? inputLevels[0].levelGroupText : "Level"
        }
      />
    </div>
  );
};

export default UserGameplay;
