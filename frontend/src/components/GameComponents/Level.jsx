import React from 'react';
import '../../styles/Level.css';  // Importing the CSS from the styles folder

const Level = ({ level, onClick }) => {
  return (
    <div className={`level ${level.status}`} onClick={level.status === 'unlocked' ? onClick : null}>
      <img 
        src={`/assets/images/${level.image}`} 
        alt={`Level ${level.number}`} 
        className="level-image" 
      />
      <p className="level-number">{`Level ${level.number}`}</p>
    </div>
  );
};

export default Level;
