import React, { useState } from 'react';
import './App.css';
import { TitleBar } from './components/general-components/Title';
import { SplashScreen } from './components/SplashScreen';
import { QuestionDisplay } from './components/QuestionDisplay';
import { ConstitutionTimeline } from './components/ConstitutionTimeline';

function App() {
  return (
    <>
      <SplashScreen />
      <TitleBar />
      <QuestionDisplay />
      <ConstitutionTimeline />
    </>
  );
}

export default App;
