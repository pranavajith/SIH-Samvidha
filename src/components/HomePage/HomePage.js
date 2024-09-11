import { HomePageAnimation } from "./HomePageAnimation";
import { HomePageUserLogInButtons } from "./HomePageUserLogInButtons";
import "./../../styles/HomePage.css";

const HomePage = () => {
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
