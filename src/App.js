import React, { useState } from 'react';
import './App.css';
import { TitleBar } from './components/general-components/Title';
import { SplashScreen } from './components/SpashScreen';
import { MainButton } from './components/MainComponents';
import { urlList } from './urls';
import QuestionSlider from './components/QuestionSlider';

function App() {
  const [showQuestionSlider, setShowQuestionSlider] = useState(false);

  const handleMainClick = () => {
    setShowQuestionSlider(true);
  };

  return (
    <>
      <SplashScreen />
      <TitleBar />
      {showQuestionSlider ? (
        <QuestionSlider /> 
      ) : (
        <>
          <div className="flex-container">
            <MainButton imgUrl={urlList.PreambleUrl} buttonText={"Preamble"} onClick={handleMainClick} isLocked={false}/>
          </div>

          <div className="flex-container">
            <MainButton imgUrl={urlList.LegislatureUrl} buttonText={"Legislature"} isLocked={true}/>
            <MainButton imgUrl={urlList.ExecutiveUrl} buttonText={"Executive"} isLocked={true}/>
            <MainButton imgUrl={urlList.JudicaryUrl} buttonText={"Judiciary"} isLocked={true}/>
          </div>
        </>
      )}
    </>
  );
}

export default App;
