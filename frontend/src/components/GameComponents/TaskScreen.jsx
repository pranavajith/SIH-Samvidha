import React, { useState } from 'react';
import '../../styles/TaskScreen.css';  // Importing the CSS from the styles folder

const TaskScreen = ({ level, onComplete }) => {
  const [tasksCompleted, setTasksCompleted] = useState(false);

  const completeTasks = () => {
    setTasksCompleted(true);
    onComplete(); // Unlock the next level
  };

  return (
    <div className="task-screen">
      <h1>{`Tasks for Level ${level.number}`}</h1>
      <p>Complete all tasks to unlock the next level.</p>
      <button 
        className="complete-button" 
        onClick={completeTasks}
        disabled={tasksCompleted}
      >
        {tasksCompleted ? 'Tasks Completed' : 'Complete Tasks'}
      </button>
    </div>
  );
};

export default TaskScreen;
