import React, { useState, useCallback } from 'react';
import '../../styles/TaskScreen.css';
import QuestionSlider from '../general-components/QuestionSlider';
import TypeGame from '../SignedInComponents/TypeGame';

const TaskScreen = ({ level, onComplete, handleIncompleteReturn }) => {
  const [isComplete, setIsComplete] = useState(false);

  const handleComplete = useCallback(() => {
    setIsComplete(true);
    onComplete(); // Notify parent about completion
  }, [onComplete]);

  const handleReturn = useCallback(() => {
    setIsComplete(false);
    onComplete(); // Notify parent to potentially reset or navigate back
  }, [onComplete]);

  const renderGame = () => {
    switch (level.questionType) {
      case 'flashcard':
        return (
          <QuestionSlider
            display_questions={level.questionData}
            onComplete={handleComplete}
            handleQuizReturn={handleIncompleteReturn}
          />
        );
      case 'TypeGame':
        // console.log(level.questionData);
        return (
        <TypeGame displayData={level.questionData} />
      );
      default:
        return <div>Unsupported game type</div>;
    }
  };

  return (
    <div className="task-screen-container">
      {isComplete ? (
        <div className="completion-message">
          <h2>Level Completed!</h2>
          <button className="next-level-button" onClick={onComplete}>
            Proceed to Next Level
          </button>
        </div>
      ) : (
        renderGame()
      )}
    </div>
  );
};

export default TaskScreen;
