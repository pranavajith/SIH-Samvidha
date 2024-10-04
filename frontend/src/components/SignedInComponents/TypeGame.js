import React, { useState, useEffect } from "react";
import "./../../styles/TypeGame.css";

const tokenizeText = (inputText) => {
  const wordsArray = inputText.split(/(\s+|[.,;:])+/).filter(Boolean);
  return wordsArray;
};

const TypeGame = ({ displayData, onComplete, handleIncompleteReturn }) => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isInputMode, setIsInputMode] = useState(false);
  const [currentKeyWord, setCurrentKeyWord] = useState(null);
  const [feedback, setFeedback] = useState("");
  const [feedbackClass, setFeedbackClass] = useState("");
  const [isComplete, setIsComplete] = useState(false);

  const { text: preambleText, keywords } = displayData;
  const wordsArray = tokenizeText(preambleText);

  useEffect(() => {
    if (currentWordIndex < wordsArray.length && !isInputMode) {
      const word = wordsArray[currentWordIndex].replace(/[.,;:]/g, "");

      const keyword = keywords.find(
        (k) => k.word.toLowerCase() === word.toLowerCase()
      );

      if (keyword) {
        setIsInputMode(true);
        setCurrentKeyWord(keyword);
      } else {
        setTimeout(() => {
          setDisplayText(
            (prev) =>
              prev +
              (prev.endsWith(" ") ? "" : " ") +
              wordsArray[currentWordIndex]
          );
          setCurrentWordIndex((prev) => prev + 1);
        }, 100);
      }
    } else if (currentWordIndex >= wordsArray.length) {
      setIsComplete(true);
      setTimeout(() => {
        onComplete();
      }, 1500);
    }
  }, [currentWordIndex, isInputMode, wordsArray, keywords, onComplete]);

  const handleChoice = (choice) => {
    const correctWord = currentKeyWord.word;
    if (choice === correctWord) {
      setIsInputMode(false);
      setFeedback("Correct!");
      setFeedbackClass("correct-feedback");
      setDisplayText((prev) => prev + correctWord + " ");
      setCurrentWordIndex((prev) => prev + 1);
      setCurrentKeyWord(null);
      setTimeout(() => setFeedback(""), 1000);
    } else {
      setFeedback(
        <>
          Incorrect! The correct word was "{correctWord}".
          <br />
          Restarting...
        </>
      );
      setFeedbackClass("incorrect-feedback");
      setTimeout(resetGame, 2000);
    }
  };

  const resetGame = () => {
    setDisplayText("");
    setCurrentWordIndex(0);
    setCurrentKeyWord(null);
    setFeedback("");
    setFeedbackClass("");
    setIsInputMode(false);
    setIsComplete(false); // Reset completion status
  };

  return (
    <div className="gameplay-container">
      <div className="display-text">
        {displayText.split("\n").map((line, index) => (
          <p key={index}>{line}</p>
        ))}
      </div>

      {isComplete && !isInputMode ? (
        <div className="congratulations">
          <p>Congratulations! You've completed this round.</p>
        </div>
      ) : (
        <button className="back-option-button" onClick={handleIncompleteReturn}>
          Go Back
        </button>
      )}

      {isInputMode && currentKeyWord && (
        <div className="input-section">
          <p>What should come next?</p>
          <div className="options">
            {currentKeyWord.choices.map((choice, idx) => (
              <button
                key={idx}
                className="option-button"
                onClick={() => handleChoice(choice)}
              >
                {choice}
              </button>
            ))}
          </div>
        </div>
      )}

      <p className={`feedback ${feedbackClass}`}>{feedback}</p>
    </div>
  );
};

export default TypeGame;
