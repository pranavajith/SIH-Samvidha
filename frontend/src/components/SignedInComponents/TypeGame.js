import React, { useState, useEffect } from "react";
import "./../../styles/TypeGame.css";

const preamble = [
  "We",
  "the",
  "people",
  "of",
  "India,",
  "having",
  "solemnly",
  "resolved",
  "to",
  "constitute",
  "India",
  "into",
  "a",
  "Sovereign,",
  "Socialist,",
  "Secular,",
  "Democratic",
  "Republic",
  "and",
  "to",
  "secure",
  "to",
  "all",
  "its",
  "citizens:",
];

const keyWords = [
  { word: "Sovereign,", choices: ["Sovereign,", "Socialist,", "Republic"] },
  { word: "Republic", choices: ["Democratic", "Republic", "Secular"] },
];

const TypeGame = () => {
  const [currentWordIndex, setCurrentWordIndex] = useState(0);
  const [currentKeyWordIndex, setCurrentKeyWordIndex] = useState(0);
  const [displayText, setDisplayText] = useState("");
  const [isInputMode, setIsInputMode] = useState(false);
  const [feedback, setFeedback] = useState("");

  useEffect(() => {
    if (currentWordIndex < preamble.length && !isInputMode) {
      const word = preamble[currentWordIndex];
      const keyWord = keyWords[currentKeyWordIndex];

      if (keyWord && keyWord.word === word) {
        setIsInputMode(true);
      } else {
        setTimeout(() => {
          setDisplayText((prev) => prev + word + " ");
          setCurrentWordIndex((prev) => prev + 1);
        }, 300); // Controls typing speed
      }
    }
  }, [currentWordIndex, isInputMode]);

  const checkAnswer = (selected) => {
    const correctWord = keyWords[currentKeyWordIndex].word;
    if (selected === correctWord) {
      setIsInputMode(false);
      setFeedback("");
      setDisplayText((prev) => prev + selected + " ");
      setCurrentWordIndex((prev) => prev + 1);
      setCurrentKeyWordIndex((prev) => prev + 1);
    } else {
      setFeedback("Incorrect! Starting over...");
      setTimeout(resetGame, 2000);
    }
  };

  const resetGame = () => {
    setDisplayText("");
    setCurrentWordIndex(0);
    setCurrentKeyWordIndex(0);
    setFeedback("");
    setIsInputMode(false);
  };

  return (
    <div className="gameplay-container">
      <div className="display-text">{displayText}</div>

      {isInputMode && (
        <div className="input-section">
          <p>What should come next?</p>
          <div className="options">
            {keyWords[currentKeyWordIndex].choices.map((choice, idx) => (
              <button key={idx} onClick={() => checkAnswer(choice)}>
                {choice}
              </button>
            ))}
          </div>
        </div>
      )}

      <p className="feedback">{feedback}</p>
    </div>
  );
};

export default TypeGame;
