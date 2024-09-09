import React, { useState } from 'react';
import './App.css';
import { TitleBar } from './components/general-components/Title';
import { SplashScreen } from './components/SplashScreen';
import { QuestionDisplay } from './components/QuestionDisplay';

function App() {
  return (
    <>
      <SplashScreen />
      <TitleBar />
      <QuestionDisplay />
    </>
  );
}

export default App;
