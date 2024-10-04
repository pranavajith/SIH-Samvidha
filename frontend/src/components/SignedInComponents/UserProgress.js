import React, { useContext } from "react";
import "./../../styles/UserProgress.css";
import { UserContext } from "../../context/UserContext";
import { UserProgressAnimationDisplay } from "./UserProgressAnimationDisplay";
import { gameLevelsModified } from "../dummy-data/dummy-data";

const UserProgress = () => {
  const { user } = useContext(UserContext);

  const placeHolder = 0;

  console.log(user);
  const totalPoints = user.completedLevels.reduce(
    (total, level) => total + level.score,
    0
  );

  const ongoingLevelObj = gameLevelsModified.find(
    (level) => level.number === user.ongoingLevel
  );

  const nextLevel = ongoingLevelObj ? ongoingLevelObj.levelName : "-";

  const completedPercentage =
    ((user.ongoingLevel - 1) / gameLevelsModified.length) * 100;

  return (
    <div className="user-progress-container">
      <div className="progress-header">
        <h3>Progress Tracker</h3>
      </div>
      <UserProgressAnimationDisplay percentage={completedPercentage} />
      <div className="progress-details">
        <div className="progress-item">
          <strong>Completed Games:</strong>
          <span>{user.completedLevels.length}</span>
        </div>

        <div className="progress-item">
          <strong>Total Points:</strong>
          <span>{totalPoints}</span>
        </div>

        <div className="progress-item">
          <strong>Next Milestone:</strong>
          <span>{nextLevel}</span>
        </div>

        <div className="progress-item">
          <strong>Gameplay completed:</strong>
          <span>{completedPercentage.toFixed(2)}%</span>
        </div>
      </div>
    </div>
  );
};

export { UserProgress };
