import React, { useState, useCallback, useContext } from 'react';
import '../../styles/TaskScreen.css';
import QuestionSlider from '../general-components/QuestionSlider';
import TypeGame from '../SignedInComponents/TypeGame';
import { UserContext } from '../../context/UserContext';
import axios from 'axios'; // Import axios
import { urlList } from '../../urls';

const TaskScreen = ({ level, handleReturn }) => {
  const { user, setUser, login } = useContext(UserContext);

  console.log("ivide und eda user", user)

  const handleComplete = async () => {
    const newCompletedLevel = {
      levelId: level.number, 
      score: 100
    };

    // Update completed levels
    let updatedCompletedLevels = user.completedLevels;
    if (user.ongoingLevel == level.number) updatedCompletedLevels = [...user.completedLevels, newCompletedLevel];

    // Update ongoing level
    const updatedOngoingLevel = parseFloat((level.number + 0.1).toFixed(1));

    // Prepare the request data
    const requestData = {
      username: user.username,
      completedLevels: updatedCompletedLevels, 
      ongoingLevel: updatedOngoingLevel, 
      streakData: user.streakData, 
      userProfileImage: user.userProfileImage, 
      dob: "", 
      email: "", 
      firstName: "", 
      lastName: "", 
      password: "",
      multiPlayerScore: user.multiPlayerScore, 
    };
    

    try {
      // Send request to the backend to update the user data using axios
      const response = await axios.post(`${urlList.backendDatabase}/user/modify`, requestData, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      if (response.status !== 200) {
        throw new Error('Failed to update user data');
      }

      // Update user context with modified user data
      setUser(prevUser => ({
        ...prevUser,
        completedLevels: updatedCompletedLevels,
        ongoingLevel: updatedOngoingLevel,
      }));

      // Notify parent about completion
      handleReturn();
    } catch (error) {
      console.error('Error updating user data:', error);
    }
  };

  const renderGame = () => {
    switch (level.questionType) {
      case 'flashcard':
        return (
          <QuestionSlider
            display_questions={level.questionData}
            onComplete={handleComplete}
            handleQuizReturn={handleReturn}
          />
        );
      case 'TypeGame':
        return (
          <TypeGame 
            displayData={level.questionData} 
            onComplete={handleComplete} 
            handleIncompleteReturn={handleReturn} 
          />
        );
      default:
        return <div>Unsupported game type</div>;
    }
  };

  return (
    <div className="task-screen-container">
      {renderGame()}
    </div>
  );
};

export default TaskScreen;
