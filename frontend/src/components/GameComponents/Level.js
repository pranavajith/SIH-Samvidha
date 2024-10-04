import React, { useContext } from "react";
import "../../styles/Level.css";
import { urlList } from "../../urls";
import { UserContext } from "../../context/UserContext";

const Level = ({ level, onClick }) => {
  const { user } = useContext(UserContext);

  const check =
    user.completedLevels.some(
      (completedLevel) => completedLevel.levelId === level.number
    ) || user.ongoingLevel === level.number;

  return (
    <div
      className={`level ${check ? "unlocked" : "locked"}`}
      onClick={check ? onClick : null}
    >
      <video autoPlay loop muted className="level-video">
        <source src={level.videoUrl} type="video/mp4" />
      </video>

      {!check && (
        <div className="overlay-lock">
          <img src={urlList.WhiteLockUrl} alt="Locked" className="lock-icon" />
        </div>
      )}
    </div>
  );
};

export default Level;
