import { HomePageAnimation } from "./HomePageAnimation";
import { HomePageUserLogInButtons } from "./HomePageUserLogInButtons";
import "./../../../styles/HomePage.css";
import { useContext } from "react";
import { UserContext } from "../../../context/UserContext";
import Testimonials from "../../general-components/Testimonials";
import { testimonials } from "../../dummy-data/dummy-data";

const HomePage = () => {
  const { user } = useContext(UserContext);
  return (
    <>
      <div className="color-component">
        <div className="homepage-container">
          <HomePageAnimation />
          <HomePageUserLogInButtons />
        </div>
        <Testimonials testimonials={testimonials} />
      </div>
    </>
  );
};

export { HomePage };
