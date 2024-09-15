import { ParallaxScreen } from "./ParallaxScreen";
import UserGameplay from "./UserGameplay";
import "./../../styles/UserDisplayWithGame.css";

const UserDisplayWithGame = () => {
  return (
    <div className="right-side-display">
      {/* <ParallaxScreen /> */}
      <UserGameplay />
    </div>
  );
};

export { UserDisplayWithGame };
