import React, { useContext } from "react";
import "./../../styles/UserProgress.css";
import { UserContext } from "../../context/UserContext";
import { UserProgressAnimationDisplay } from "./UserProgressAnimationDisplay";

const UserProgress = () => {
  const { user } = useContext(UserContext);

  // const { gameProgress } = user;
  // const { levelsComplete, totalLevels } = gameProgress;

  // const currentLevel =
  //   levelsComplete.length > 0
  //     ? levelsComplete[levelsComplete.length - 1]
  //     : "None";
  // const completedGames = levelsComplete.length;
  // const nextMilestone =
  //   completedGames < totalLevels
  //     ? levelsComplete[levelsComplete.length - 1] + 1
  //     : "All levels complete";

  // const completedPercentage = (completedGames / totalLevels) * 100;
  const placeHolder = 0;

  return (
    <div className="user-progress-container">
      <div className="progress-header">
        <h3>Progress Tracker</h3>
      </div>
      {/* <UserProgressAnimationDisplay percentage={completedPercentage} /> */}
      <UserProgressAnimationDisplay percentage={placeHolder} />
      <div className="progress-details">
        <div className="progress-item">
          <strong>Completed Games:</strong>
          {/* <span>{completedGames}</span> */}
          <span>{placeHolder}</span>
        </div>

        <div className="progress-item">
          <strong>Total Points:</strong>
          <span>0</span>
        </div>

        <div className="progress-item">
          <strong>Next Milestone:</strong>
          <span>{placeHolder}</span>
          {/* <span>{nextMilestone}</span> */}
        </div>

        <div className="progress-item">
          <strong>Gameplay completed:</strong>
          <span>{placeHolder}%</span>
          {/* <span>{completedPercentage.toFixed(1)}%</span> */}
        </div>

        {user.bonus && (
          <div className="progress-item bonus-section">
            <strong>Bonus Points:</strong>
            <span>{placeHolder}</span>
            {/* <span>{user.bonus}</span> */}
          </div>
        )}
      </div>
    </div>
  );
};

export { UserProgress };
