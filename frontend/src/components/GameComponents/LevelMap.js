import React from "react";
import Level from "./Level";
import "../../styles/LevelMap.css";

const LevelMap = ({ levelText, levels, onLevelClick }) => {
  return (
    <div className="level-map">
      <div className="level-text">{levelText}</div>
      <div className="level-map-wrapper">
        {levels.map((level, index) => (
          <div className="level-container" key={index}>
            <Level
              level={level}
              onClick={() => {
                onLevelClick(level);
              }}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default LevelMap;
