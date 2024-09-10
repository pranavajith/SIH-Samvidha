import React from 'react';
import './App.css';
import { TitleBar } from './components/general-components/Title';
import { SplashScreen } from './components/SplashScreen';
import { HomePage } from './components/HomePage/HomePage';
import { QuestionDisplay } from './components/QuestionDisplay'; // Import your QuestionDisplay component
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';

function App() {
  return (
    <Router>
      <div>
        <SplashScreen />
        <TitleBar /> 
        <Routes>
          <Route path="/" element={<HomePage />} /> 
          <Route path="/demo" element={<QuestionDisplay />} /> 
        </Routes>
      </div>
    </Router>
  );
}

export default App;
