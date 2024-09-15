import React, { useState } from "react";
import "./../../styles/UserGameplay.css";
import LevelMap from "../GameComponents/LevelMap";
import TaskScreen from "../GameComponents/TaskScreen";
import {
  constitutional_questions,
  TypeGameData,
} from "../dummy-data/dummy-data";
import { urlList } from "../../urls";

const UserGameplay = () => {
  const [levels, setLevels] = useState([
    {
      number: 1,
      status: "unlocked",
      videoUrl: urlList.CheckpointGifUrl,
      questionType: "flashcard",
      questionData: constitutional_questions.constitution_history_questions,
    },
    {
      number: 2,
      status: "locked",
      videoUrl: urlList.CheckpointGifUrl,
      questionType: "flashcard",
      questionData: constitutional_questions.preamble_questions,
    },
    {
      number: 3,
      status: "locked",
      videoUrl: urlList.TrophyGifUrl,
      questionType: "TypeGame",
      questionData: TypeGameData.preamble,
    },
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
        <LevelMap levels={levels} onLevelClick={handleLevelClick} />
      )}
    </div>
  );
};

export default UserGameplay;
