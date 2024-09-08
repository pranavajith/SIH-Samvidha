import React, { useState } from 'react';
import './../styles/QuestionSlider.css';
import { questions as initialQuestions, preambleText } from './dummy-data/dummy-data'; 

const QuestionSlider = () => {
  const [questions, setQuestions] = useState(initialQuestions);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false); // New state for completion

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setIsAnswered(true);

    // If the answer is incorrect, append a new entry of the current question to the end of the list
    if (!option.correctStatus) {
      const updatedQuestions = [...questions];
      const currentQuestion = updatedQuestions[currentQuestionIndex];
      updatedQuestions.push({ ...currentQuestion }); // Append a new entry of the same question
      setQuestions(updatedQuestions);
    }
  };

  const handleNextQuestion = () => {
    setCurrentQuestionIndex((prevIndex) => {
      const nextIndex = (prevIndex + 1) % questions.length;

      // Check if all questions have been answered
      if (nextIndex === 0) {
        setIsCompleted(true); // Mark as completed
        return prevIndex; // Stay on the current question
      }

      return nextIndex;
    });
    setSelectedOption(null);
    setIsAnswered(false);
  };

  if (isCompleted) {
    return (
      <div className="completion-message">
        <h2>Congratulations!</h2>
        <p>You have successfully learned about the Preamble!</p>
        <div className="preamble-container">
          <h3>The Preamble of the Indian Constitution</h3>
          <p className="preamble-text">{preambleText}</p>
        </div>
      </div>
    );
  }

  const question = questions[currentQuestionIndex];
  const isCorrect = selectedOption ? selectedOption.correctStatus : false;

  return (
    <div className="question-slider">
      <h2>Question {currentQuestionIndex + 1}</h2>
      <p>{question.question}</p>
      <div className="options">
        {question.Options.map((option, index) => (
          <button
            key={index}
            className={`option-button ${isAnswered ? (option.correctStatus ? 'correct' : 'incorrect') : ''}`}
            onClick={() => handleOptionClick(option)}
            disabled={isAnswered}
          >
            {option.value}
          </button>
        ))}
      </div>
      {isAnswered && (
        <div className="feedback">
          {isCorrect ? 'Correct!' : 'Incorrect!'}
        </div>
      )}
      {isAnswered && (
        <button className="next-button" onClick={handleNextQuestion}>
          Next Question
        </button>
      )}
    </div>
  );
};

export default QuestionSlider;
