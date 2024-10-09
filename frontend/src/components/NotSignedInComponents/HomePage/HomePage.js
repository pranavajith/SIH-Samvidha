import { HomePageAnimation } from "./HomePageAnimation";
import { HomePageUserLogInButtons } from "./HomePageUserLogInButtons";
import "./../../../styles/HomePage.css";
import Testimonials from "../../general-components/Testimonials";
import { testimonials } from "../../dummy-data/dummy-data";

const HomePage = () => {
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
