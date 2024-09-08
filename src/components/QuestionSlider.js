import React, { useState, useEffect } from 'react';
import './../styles/QuestionSlider.css';

const QuestionSlider = ({ display_questions, onComplete }) => {
  const [questions, setQuestions] = useState(display_questions);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);

  useEffect(() => {
    if (isCompleted && onComplete) {
      const timer = setTimeout(() => {
        onComplete();
      }, 5000); // Wait for 5 seconds before calling onComplete

      return () => clearTimeout(timer);
    }
  }, [isCompleted, onComplete]);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setIsAnswered(true);

    if (!option.correctStatus) {
      const updatedQuestions = [...questions];
      const currentQuestion = updatedQuestions[currentQuestionIndex];
      updatedQuestions.push({ ...currentQuestion });
      setQuestions(updatedQuestions);
    }
  };

  const handleNextQuestion = () => {
    setCurrentQuestionIndex((prevIndex) => {
      const nextIndex = (prevIndex + 1) % questions.length;

      if (nextIndex === 0) {
        setIsCompleted(true);
        return prevIndex;
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
        <p>You have successfully learned about the topic!</p>
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
