import React from "react";
import GameChoice from "./GameChoice";
import { useEffect } from "react";
import { useNarration } from '../../context/NarrationContext';
import { getNarrationText } from '../../utils/narrationData';

export const Dashboard = () => {
  const { isNarrationActive, toggleNarration, narrate } = useNarration(); // Get narration context

  useEffect(() => {
    if (isNarrationActive) {
      narrate(getNarrationText("Dashboard"));
    }
  }, [isNarrationActive, narrate]);

  return (
    <div className="user-dashboard">
      <GameChoice />
    </div>
  );
};

export default Dashboard;
