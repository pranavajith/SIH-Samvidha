import React from 'react';
import Level from './Level';
import '../../styles/LevelMap.css';  // Importing the CSS from the styles folder

const LevelMap = ({ levels, onLevelClick }) => {
  return (
    <div className="level-map">
      {levels.map((level, index) => (
        <Level 
          key={index} 
          level={level} 
          onClick={() => onLevelClick(level)} 
        />
      ))}
    </div>
  );
};

export default LevelMap;
