import React, { useContext } from "react";
import "./../../styles/UserProgress.css";
import { UserContext } from "../../context/UserContext";
import { UserProgressAnimationDisplay } from "./UserProgressAnimationDisplay";

const UserProgress = () => {
  const { user } = useContext(UserContext);

  const placeHolder = 0;

  console.log(user);
  const totalPoints = user.completedLevels.reduce(
    (total, level) => total + level.score,
    0
  );

  return (
    <div className="user-progress-container">
      <div className="progress-header">
        <h3>Progress Tracker</h3>
      </div>
      <UserProgressAnimationDisplay percentage={placeHolder} />
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
          <span>{placeHolder}</span>
        </div>

        <div className="progress-item">
          <strong>Gameplay completed:</strong>
          <span>{placeHolder}%</span>
        </div>

        {user.bonus && (
          <div className="progress-item bonus-section">
            <strong>Bonus Points:</strong>
            <span>{placeHolder}</span>
          </div>
        )}
      </div>
    </div>
  );
};

export { UserProgress };
