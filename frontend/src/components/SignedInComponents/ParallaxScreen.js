import { urlList } from "../../urls";
import "./../../styles/ParallaxScreen.css";

const ParallaxScreen = () => {
  return (
    <div
      className="parallax-screen"
      style={{ backgroundImage: `url(${urlList.StagePicUrl})` }}
    ></div>
  );
};

export { ParallaxScreen };
