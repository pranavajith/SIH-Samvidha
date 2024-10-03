import React, { useContext, useState } from "react";
import "./../../styles/UserGameplay.css";
import LevelMap from "../GameComponents/LevelMap";
import TaskScreen from "../GameComponents/TaskScreen";
import { UserContext } from "../../context/UserContext";

const UserGameplay = ({ inputLevels }) => {
  const [currentLevel, setCurrentLevel] = useState(null);

  const handleLevelClick = (level) => {
    setCurrentLevel(level);
  };

  const handleReturn = () => {
    setCurrentLevel(null);
  };

  return (
    <div>
      {currentLevel ? (
        <TaskScreen level={currentLevel} handleReturn={handleReturn} />
      ) : (
        <LevelMap
          levels={inputLevels.levels}
          onLevelClick={handleLevelClick}
          levelText={inputLevels.levelText}
        />
      )}
    </div>
  );
};

export default UserGameplay;
