import React, { useContext, useState } from "react";
import "./../../styles/UserGameplay.css";
import LevelMap from "../GameComponents/LevelMap";
import TaskScreen from "../GameComponents/TaskScreen";

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
          levels={inputLevels}
          onLevelClick={handleLevelClick}
          levelText={
            inputLevels.length > 0 ? inputLevels[0].levelGroupText : "Level"
          }
        />
      )}
    </div>
  );
};

export default UserGameplay;
