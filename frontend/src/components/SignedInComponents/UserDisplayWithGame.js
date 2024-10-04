import UserGameplay from "./UserGameplay";
import "./../../styles/UserDisplayWithGame.css";
import { gameLevelsModified } from "../dummy-data/dummy-data";

const UserDisplayWithGame = () => {
  const preambleGames = gameLevelsModified
    .filter((level) => level.levelGroupText === "Preamble")
    .sort((a, b) => a.number - b.number);
  const rightsGames = gameLevelsModified
    .filter((level) => level.levelGroupText === "Rights")
    .sort((a, b) => a.number - b.number);
  return (
    <div className="right-side-display">
      <UserGameplay inputLevels={preambleGames} />
      <UserGameplay inputLevels={rightsGames} />
    </div>
  );
};

export { UserDisplayWithGame };
