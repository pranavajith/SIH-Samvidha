import { HomePageAnimation } from "./HomePageAnimation";
import { HomePageUserLogInButtons } from "./HomePageUserLogInButtons";
import "./../../../styles/HomePage.css";
import { useContext } from "react";
import { UserContext } from "../../../context/UserContext";

const HomePage = () => {
  const { user } = useContext(UserContext);
  return (
    <>
      <div className="homepage-container">
        <HomePageAnimation />
        <HomePageUserLogInButtons />
      </div>
    </>
  );
};

export { HomePage };
