import React, { useState } from "react";
import "./../../App.css";
import { MainButton } from "./MainButton";
import { urlList } from "../../urls";
import QuestionSlider from "./QuestionSlider";
import { constitutional_questions } from "./../dummy-data/dummy-data";
import { useEffect } from "react";
import { useNarration } from '../../context/NarrationContext';
import { getNarrationText } from '../../utils/narrationData';

const QuestionDisplay = () => {

  const { isNarrationActive, toggleNarration, narrate } = useNarration();
  
  useEffect(() => {
    if (isNarrationActive) {
      narrate(getNarrationText("DemoMain"));
    }
  }, [isNarrationActive, narrate]);

  const [questions, setQuestions] = useState(null);
  const [completedNum, setCompletedNum] = useState(-1);

  const handleButtonClick = (index) => {
    if (index > completedNum) {
      return;
    }

    switch (index) {
      case -1:
        setQuestions(constitutional_questions.preamble_questions);
        break;
      case 0:
        setQuestions(constitutional_questions.legislature_questions);
        break;
      case 1:
        setQuestions(constitutional_questions.executive_questions);
        break;
      case 2:
        setQuestions(constitutional_questions.judiciary_questions);
        break;
      default:
        break;
    }

    // if (index + 1 > completedNum) setCompletedNum(index + 1);
  };

  const handleQuizCompletion = () => {
    if (
      questions === constitutional_questions.preamble_questions &&
      completedNum === -1
    )
      setCompletedNum(0);
    if (
      questions === constitutional_questions.legislature_questions &&
      completedNum === 0
    )
      setCompletedNum(1);
    if (
      questions === constitutional_questions.executive_questions &&
      completedNum === 1
    )
      setCompletedNum(2);
    setQuestions(null); // Set questions to null after 5 seconds
  };

  const handleQuizReturn = () => {
    setQuestions(null); // Set questions to null after 5 seconds
  };

  return (
    <>
      {questions ? (
        <QuestionSlider
          display_questions={questions}
          onComplete={handleQuizCompletion}
          handleQuizReturn={handleQuizReturn}
        />
      ) : (
        <>
          <div className="flex-container">
            <MainButton
              imgUrl={urlList.PreambleUrl}
              buttonText={"Preamble"}
              onClick={() => handleButtonClick(-1)}
              isLocked={false}
            />
          </div>
          <div className="flex-container">
            <MainButton
              imgUrl={urlList.LegislatureUrl}
              buttonText={"Legislature"}
              onClick={() => handleButtonClick(0)}
              isLocked={completedNum <= -1}
            />
            <MainButton
              imgUrl={urlList.ExecutiveUrl}
              buttonText={"Executive"}
              onClick={() => handleButtonClick(1)}
              isLocked={completedNum <= 0}
            />
            <MainButton
              imgUrl={urlList.JudicaryUrl}
              buttonText={"Judiciary"}
              onClick={() => handleButtonClick(2)}
              isLocked={completedNum <= 1}
            />
          </div>
        </>
      )}
    </>
  );
};

export { QuestionDisplay };
