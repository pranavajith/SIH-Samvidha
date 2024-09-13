import React, { useContext } from "react";
import "./../../styles/UserProgress.css";
import { UserContext } from "../../context/UserContext";

const UserProgress = () => {
  const { user } = useContext(UserContext);

  return (
    <div className="user-progress-container">
      <div className="progress-header">
        <h3>Progress Tracker</h3>
      </div>

      <div className="progress-details">
        <div className="progress-item">
          <strong>Current Level:</strong>
          <span>{user.currentLevel}</span>
        </div>

        <div className="progress-item">
          <strong>Completed Games:</strong>
          <span>{user.completedGames}</span>
        </div>

        <div className="progress-item">
          <strong>Total Points:</strong>
          <span>{user.points}</span>
        </div>

        <div className="progress-item">
          <strong>Next Milestone:</strong>
          <span>{user.nextMilestone}</span>
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
