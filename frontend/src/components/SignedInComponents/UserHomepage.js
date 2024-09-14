import { TypeGameData } from "../dummy-data/dummy-data";
import TypeGame from "./TypeGame";
import { UserProgress } from "./UserProgress";
import "./../../styles/UserHomePage.css"; // Import the CSS file

export const UserHomePage = () => {
  return (
    <div className="user-homepage-container">
      <UserProgress />
      <TypeGame displayData={TypeGameData.preamble} />
    </div>
  );
};
