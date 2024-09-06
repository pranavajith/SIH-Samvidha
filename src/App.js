import React, { useState } from 'react';
import './App.css';
import { TitleBar } from './components/general-components/Title';
import { Footer } from './components/general-components/Footer';
import { SplashScreen } from './components/SpashScreen';
import { Component1, Component2, Component3, Component4 } from './components/MainComponents';
import QuestionSlider from './components/QuestionSlider'; // Import your QuestionSlider component

function App() {
  const [showQuestionSlider, setShowQuestionSlider] = useState(false);

  const handleComponent1Click = () => {
    setShowQuestionSlider(true);
  };

  return (
    <>
      <SplashScreen />
      <TitleBar />
      {showQuestionSlider ? (
        <QuestionSlider /> // Display the QuestionSlider component
      ) : (
        <>
          <Component1 onClick={handleComponent1Click} />
          <div style={{ display: 'flex', width: '100%', height: '50vh' }}>
            <Component2 />
            <Component3 />
            <Component4 />
          </div>
        </>
      )}
      {/* <Footer /> */}
    </>
  );
}

export default App;
