import React, { useState } from "react";
import "./../../styles/UserGameplay.css";
import LevelMap from "../GameComponents/LevelMap";
import TaskScreen from "../GameComponents/TaskScreen";

const UserGameplay = ({ inputLevels, levelText }) => {
  const [levels, setLevels] = useState(inputLevels);

  const [currentLevel, setCurrentLevel] = useState(null);

  const handleLevelClick = (level) => {
    setCurrentLevel(level);
  };

  const handleCompleteTasks = (levelNumber) => {
    setLevels((prevLevels) =>
      prevLevels.map((level) =>
        level.number === levelNumber + 1
          ? { ...level, status: "unlocked" }
          : level
      )
    );
    setCurrentLevel(null);
  };

  const handleIncompleteReturn = () => {
    setCurrentLevel(null);
  };

  return (
    <div>
      {currentLevel ? (
        <TaskScreen
          level={currentLevel}
          onComplete={() => handleCompleteTasks(currentLevel.number)}
          handleIncompleteReturn={handleIncompleteReturn}
        />
      ) : (
        <LevelMap
          levels={levels}
          onLevelClick={handleLevelClick}
          levelText={levelText}
        />
      )}
    </div>
  );
};

export default UserGameplay;
