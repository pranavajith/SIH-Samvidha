import React, { createContext, useContext, useState } from 'react';
import { speak } from '../utils/speech';

const NarrationContext = createContext();

export const NarrationProvider = ({ children }) => {
  const [isNarrationActive, setIsNarrationActive] = useState(false);

  const toggleNarration = () => {
    setIsNarrationActive((prev) => !prev);
  };

  const narrate = (text) => {
    if (isNarrationActive) {
      speak(text);
    }
  };

  return (
    <NarrationContext.Provider value={{ isNarrationActive, toggleNarration, narrate }}>
      {children}
    </NarrationContext.Provider>
  );
};

export const useNarration = () => {
  return useContext(NarrationContext);
};
