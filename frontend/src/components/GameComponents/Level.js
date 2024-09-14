import React from "react";
import "../../styles/Level.css"; // Import the updated CSS
import { urlList } from "../../urls";

const Level = ({ level, onClick }) => {
  return (
    <div
      className={`level ${level.status}`}
      onClick={level.status === "unlocked" ? onClick : null}
    >
      <video autoPlay loop muted className="level-video">
        <source src={level.videoUrl} type="video/mp4" />
      </video>
      {level.status === "locked" && (
        <div className="overlay-lock">
          <img src={urlList.WhiteLockUrl} alt="Locked" className="lock-icon" />
        </div>
      )}
    </div>
  );
};

export default Level;
