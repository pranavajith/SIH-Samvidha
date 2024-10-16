import React, { useContext } from "react";
import "../../styles/TaskScreen.css";
import QuestionSlider from "../general-components/QuestionSlider";
import TypeGame from "../SignedInComponents/TypeGame";
import { UserContext } from "../../context/UserContext";
import axios from "axios"; // Import axios
import { urlList } from "../../urls";
import { Navigate } from "react-router-dom";

const TaskScreen = ({ level, handleReturn }) => {
  const { user, setUser } = useContext(UserContext);

  const handleComplete = async () => {
    const newCompletedLevel = {
      levelId: level.number,
      score: 100,
    };

    // Update completed levels
    let updatedCompletedLevels = user.completedLevels;
    if (user.ongoingLevel === level.number)
      updatedCompletedLevels = [...user.completedLevels, newCompletedLevel];

    // Update ongoing level
    const updatedOngoingLevel = level.number + 1;

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
      // Send request to the backend to update the user data
      const userModifyResponse = await axios.post(
        `${urlList.backendDatabase}/user/modify`,
        requestData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (userModifyResponse.status !== 200) {
        throw new Error("Failed to update user data");
      }

      // Update user context with modified user data
      // setUser(prevUser => ({
      //   ...prevUser,
      //   completedLevels: updatedCompletedLevels,
      //   ongoingLevel: updatedOngoingLevel,
      // }));

      console.log("User data updated successfully");

      // Now send another request to update the streak
      const streakUpdateResponse = await axios.post(
        `${urlList.backendDatabase}/user/streak-update`,
        {
          username: user.username,
        },
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (streakUpdateResponse.status !== 200) {
        throw new Error("Failed to update streak");
      }

      console.log("Streak updated successfully");

      // Now send another request to update the streak
      const newUser = await axios.get(
        `${urlList.backendDatabase}/user?username=${user.username}`,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      console.log("User data retrieved successfully");
      console.log(newUser.data);

      if (newUser.data) {
        setUser((prevUser) => ({
          ...prevUser,
          completedLevels: updatedCompletedLevels,
          ongoingLevel: updatedOngoingLevel,
          streakData: newUser.data.streakData,
        }));
      }
      // Navigate("/singleplayer");

      // Notify parent about completion after both requests have succeeded
      handleReturn();
    } catch (error) {
      console.error("Error updating user data or streak:", error);
    }
  };

  const renderGame = () => {
    switch (level.questionType) {
      case "flashcard":
        return (
          <QuestionSlider
            display_questions={level.questionData}
            onComplete={handleComplete}
            handleQuizReturn={handleReturn}
          />
        );
      case "TypeGame":
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

  return <div className="task-screen-container">{renderGame()}</div>;
};

export default TaskScreen;
