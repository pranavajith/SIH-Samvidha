import React, { useState } from "react";
import "./../../styles/UserGameplay.css";
import LevelMap from "../GameComponents/LevelMap";
import TaskScreen from "../GameComponents/TaskScreen";

const UserGameplay = () => {
  const [levels, setLevels] = useState([
    { number: 1, status: "unlocked", image: "level1.png" },
    { number: 2, status: "locked", image: "level2.png" },
    { number: 3, status: "locked", image: "level3.png" },
  ]);

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

  return (
    <div>
      {currentLevel ? (
        <TaskScreen
          level={currentLevel}
          onComplete={() => handleCompleteTasks(currentLevel.number)}
        />
      ) : (
        <LevelMap levels={levels} onLevelClick={handleLevelClick} />
      )}
    </div>
  );
};

export default UserGameplay;
