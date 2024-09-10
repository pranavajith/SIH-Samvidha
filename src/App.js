import React from 'react';
import './App.css';
import { TitleBar } from './components/general-components/Title';
import { SplashScreen } from './components/SplashScreen';
import { HomePage } from './components/HomePage/HomePage';
import { QuestionDisplay } from './components/QuestionDisplay'; // Import your QuestionDisplay component
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { ConstitutionTimeline } from './components/ConstitutionTimeline';
import AboutUs from './components/AboutUs';
import Signup from './components/SignUp.js';
import SignIn from './components/SignIn.js';

function App() {
  return (
    <Router>
      <div>
        <SplashScreen />
        <TitleBar /> 
        <Routes>
          <Route path="/" element={<HomePage />} /> 
          <Route path="/demo" element={<QuestionDisplay />} /> 
          <Route path="/about" element={<AboutUs />} /> 
          <Route path="/signup" element={<Signup />} /> 
          <Route path="/signin" element={<SignIn />} /> 
        </Routes>
      </div>
    </Router>
  );
}

export default App;
