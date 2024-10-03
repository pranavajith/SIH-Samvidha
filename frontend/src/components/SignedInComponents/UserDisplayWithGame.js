import UserGameplay from "./UserGameplay";
import "./../../styles/UserDisplayWithGame.css";
// import { preambleLevels } from "../dummy-data/dummy-data";
import { gameLevels } from "../dummy-data/dummy-data";

const UserDisplayWithGame = () => {
  return (
    <div className="right-side-display">
      <UserGameplay inputLevels={gameLevels[0]} />
    </div>
  );
};

export { UserDisplayWithGame };
