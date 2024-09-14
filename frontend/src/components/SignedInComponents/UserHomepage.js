import React, { useState } from 'react';
import { TypeGameData } from "../dummy-data/dummy-data";
import TypeGame from "./TypeGame";
import { UserProgress } from "./UserProgress";
import "./../../styles/UserHomePage.css"; // Import the CSS file
import LevelMap from '../GameComponents/LevelMap';
import TaskScreen from '../GameComponents/TaskScreen';

// export const UserHomePage = () => {
//   return (
//     <div className="user-homepage-container">
//       <UserProgress />
//       <TypeGame displayData={TypeGameData.preamble} />
//     </div>
//   );
// };

const UserHomePage = () => {
  const [levels, setLevels] = useState([
    { number: 1, status: 'unlocked', image: 'level1.png' },
    { number: 2, status: 'locked', image: 'level2.png' },
    { number: 3, status: 'locked', image: 'level3.png' },
    // Add more levels as needed
  ]);

  const [currentLevel, setCurrentLevel] = useState(null);

  const handleLevelClick = (level) => {
    setCurrentLevel(level);
  };

  const handleCompleteTasks = (levelNumber) => {
    // Unlock the next level
    setLevels((prevLevels) =>
      prevLevels.map((level) =>
        level.number === levelNumber + 1 ? { ...level, status: 'unlocked' } : level
      )
    );
    setCurrentLevel(null); // Return to the level map
  };

  return (
    <div>
      {currentLevel ? (
        <TaskScreen 
          level={currentLevel} 
          onComplete={() => handleCompleteTasks(currentLevel.number)} 
        />
      ) : (
        <LevelMap levels={levels} onLevelClick={handleLevelClick} />
      )}
    </div>
  );
};

export default UserHomePage;