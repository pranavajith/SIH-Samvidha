import React, { useContext } from "react";
import "./../../styles/UserProgress.css";
import { UserContext } from "../../context/UserContext";
import { UserProgressAnimationDisplay } from "./UserProgressAnimationDisplay";

const UserProgress = () => {
  const { user } = useContext(UserContext);

  // Destructuring to extract relevant data from the user object
  const { gameProgress } = user;
  const { levelsComplete, totalLevels } = gameProgress;

  // Calculate the current level, completed games, and next milestone
  const currentLevel =
    levelsComplete.length > 0
      ? levelsComplete[levelsComplete.length - 1]
      : "None";
  const completedGames = levelsComplete.length;
  const nextMilestone =
    completedGames < totalLevels
      ? levelsComplete[levelsComplete.length - 1] + 1
      : "All levels complete";

  // Calculate the percentage for the pie chart
  const completedPercentage = (completedGames / totalLevels) * 100;
  // const remainingPercentage = 100 - completedPercentage;

  return (
    <div className="user-progress-container">
      <div className="progress-header">
        <h3>Progress Tracker</h3>
      </div>

      <UserProgressAnimationDisplay percentage={completedPercentage} />

      <div className="progress-details">
        {/* <div className="progress-item">
          <strong>Current Level:</strong>
          <span>{currentLevel}</span>
        </div> */}

        <div className="progress-item">
          <strong>Completed Games:</strong>
          <span>{completedGames}</span>
        </div>

        <div className="progress-item">
          <strong>Total Points:</strong>
          <span>0</span> {/* Total points is always 0 */}
        </div>

        <div className="progress-item">
          <strong>Next Milestone:</strong>
          <span>{nextMilestone}</span>
        </div>

        <div className="progress-item">
          <strong>Gameplay completed:</strong>
          <span>{completedPercentage.toFixed(1)}%</span>
        </div>

        {user.bonus && (
          <div className="progress-item bonus-section">
            <strong>Bonus Points:</strong>
            <span>{user.bonus}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export { UserProgress };
