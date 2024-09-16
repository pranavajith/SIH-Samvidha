import React, { useState, useEffect } from "react";
import "./../../styles/QuestionSlider.css";

const QuestionSlider = ({
  display_questions,
  onComplete,
  handleQuizReturn,
}) => {
  const [questions, setQuestions] = useState(display_questions);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [selectedOption, setSelectedOption] = useState(null);
  const [isAnswered, setIsAnswered] = useState(false);
  const [isCompleted, setIsCompleted] = useState(false);
  const [isFlipped, setIsFlipped] = useState(false); // Flip state

  useEffect(() => {
    if (isCompleted && onComplete) {
      const timer = setTimeout(() => {
        onComplete();
      }, 1500);

      return () => clearTimeout(timer);
    }
  }, [isCompleted, onComplete]);

  const handleOptionClick = (option) => {
    setSelectedOption(option);
    setIsAnswered(true);
    setIsFlipped(true); // Trigger flip

    // Check if the selected option is incorrect
    if (!option.correctStatus) {
      const updatedQuestions = [...questions];
      const currentQuestion = updatedQuestions[currentQuestionIndex];
      updatedQuestions.push({ ...currentQuestion });
      setQuestions(updatedQuestions);
    }
  };

  const handleNextQuestion = () => {
    setIsFlipped(false); // Flip back the card
    setTimeout(() => {
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
    }, 200); // Delay to match the flip animation duration
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

  return (
    <div className="question-slider-container">
      <div className="question-slider">
        <div className={`flashcard ${isFlipped ? "flipped" : ""}`}>
          {/* Conditionally render front or back of the flashcard */}
          <div className="flashcard-face flashcard-front">
            {currentQuestionIndex < display_questions.length ? (
              <h2>Question {currentQuestionIndex + 1}</h2>
            ) : (
              <h2 className="red-text"> Previously Incorrect Question </h2>
            )}
            <p>{question.question}</p>
            <div className="options">
              {question.Options.map((option, index) => (
                <button
                  key={index}
                  className="option-button"
                  onClick={() => handleOptionClick(option)}
                  disabled={isAnswered}
                >
                  {option.value}
                </button>
              ))}
            </div>
          </div>
          <div className="flashcard-face flashcard-back">
            {isAnswered && (
              <div className="feedback">
                {selectedOption.correctStatus ? (
                  "Correct!"
                ) : (
                  <span>
                    <h3 className="red-text">Incorrect!</h3>The correct answer
                    is: {question.Options.find((o) => o.correctStatus).value}
                  </span>
                )}
                <br />
                <button className="next-button" onClick={handleNextQuestion}>
                  Next Question
                </button>
              </div>
            )}
          </div>
        </div>
        <button
          className="back-option-button"
          onClick={handleQuizReturn}
          disabled={isAnswered}
        >
          Go Back
        </button>
      </div>
    </div>
  );
};

export default QuestionSlider;
