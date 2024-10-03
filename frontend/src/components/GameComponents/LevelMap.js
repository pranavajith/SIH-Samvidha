import React from "react";
import Level from "./Level";
import "../../styles/LevelMap.css"; // Importing the CSS from the styles folder

const LevelMap = ({ levelText, levels, onLevelClick }) => {
  return (
    <div className="level-map">
      <div className="level-text">{levelText}</div>
      {levels.map((level, index) => (
        <div className="level-container" key={index}>
          <Level
            level={level}
            onClick={() => {
              onLevelClick(level);
            }}
          />
          {index < levels.length - 1 && <div className="level-connector"></div>}
        </div>
      ))}
    </div>
  );
};

export default LevelMap;
