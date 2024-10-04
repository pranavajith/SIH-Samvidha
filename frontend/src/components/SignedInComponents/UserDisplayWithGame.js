import UserGameplay from "./UserGameplay";
import "./../../styles/UserDisplayWithGame.css";
import "./../../styles/UserGameplay.css";
import React, { useState } from "react";
import { gameLevelsModified } from "../dummy-data/dummy-data";
import TaskScreen from "../GameComponents/TaskScreen";

const UserDisplayWithGame = () => {
  const [currentLevel, setCurrentLevel] = useState(null);

  const handleLevelClick = (level) => {
    setCurrentLevel(level);
  };

  const handleReturn = () => {
    setCurrentLevel(null);
  };

  const preambleGames = gameLevelsModified
    .filter((level) => level.levelGroupText === "Preamble")
    .sort((a, b) => a.number - b.number);
  const rightsGames = gameLevelsModified
    .filter((level) => level.levelGroupText === "Rights")
    .sort((a, b) => a.number - b.number);

  return (
    <div className="right-side-display">
      {currentLevel ? (
        <TaskScreen level={currentLevel} handleReturn={handleReturn} />
      ) : (
        <>
          <UserGameplay
            inputLevels={preambleGames}
            handleLevelClick={handleLevelClick}
          />
          <UserGameplay
            inputLevels={rightsGames}
            handleLevelClick={handleLevelClick}
          />
        </>
      )}
    </div>
  );
};

export { UserDisplayWithGame };
