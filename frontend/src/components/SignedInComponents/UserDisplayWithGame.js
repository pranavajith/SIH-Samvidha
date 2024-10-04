import UserGameplay from "./UserGameplay";
import "./../../styles/UserDisplayWithGame.css";
import { gameLevels, gameLevelsModified } from "../dummy-data/dummy-data";

const UserDisplayWithGame = () => {
  const preambleGames = gameLevelsModified
    .filter((level) => level.levelGroupText === "Preamble")
    .sort((a, b) => a.number - b.number);
  return (
    <div className="right-side-display">
      <UserGameplay inputLevels={preambleGames} />
    </div>
  );
};

export { UserDisplayWithGame };
