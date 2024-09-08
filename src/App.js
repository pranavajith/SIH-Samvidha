import React, { useState } from 'react';
import './App.css';
import { TitleBar } from './components/general-components/Title';
import { SplashScreen } from './components/SplashScreen';
import { MainButton } from './components/MainComponents';
import { urlList } from './urls';
import QuestionSlider from './components/QuestionSlider';
import { constitutional_questions } from './components/dummy-data/dummy-data';

function App() {
  const [questions, setQuestions] = useState(null);
  const [completedNum, setCompletedNum] = useState(-1);

  const handleButtonClick = (index) => {
    if (index > completedNum ) {
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

    setCompletedNum(index + 1);
  };

  const handleQuizCompletion = () => {
    setQuestions(null); // Set questions to null after 5 seconds
  };

  return (
    <>
      <SplashScreen />
      <TitleBar />
      {questions ? (
        <QuestionSlider display_questions={questions} onComplete={handleQuizCompletion} />
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
}

export default App;
