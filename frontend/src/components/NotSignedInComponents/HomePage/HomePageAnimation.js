import "./../../../styles/HomePageAnimation.css";
import { useTranslation } from "react-i18next";
// can add icons to timeline
// can add learn more button at end
import "./../../../utils/i18n";
const HomePageAnimation = () => {
  const {t} = useTranslation();
  return (
    <div className="homepage-animation-text-container">
      <div className="homepage-animation-container">
        <dotlottie-player
          className="books-fall"
          src="https://lottie.host/b7e29aef-6fe2-45a2-8c99-5edda7d76409/9jidQHld6H.json"
          background="transparent"
          speed="1"
          style={{ width: "300px", height: "300px" }}
          loop
          autoplay
        ></dotlottie-player>
        <dotlottie-player
          className="arrow"
          src="https://lottie.host/22a78c9c-ba64-4482-9b7c-84b738cce7e8/fv1mPSdh3l.json"
          background="transparent"
          speed="2"
          style={{ width: "100px", height: "100px" }}
          loop
          autoplay
        ></dotlottie-player>
        <dotlottie-player
          src="https://lottie.host/d8b5c1e3-71f8-4959-bd69-447a6e68f467/rYZ7ubb7nQ.json"
          background="transparent"
          speed="1"
          style={{ width: "500px", height: "400px" }}
          loop
          autoplay
        ></dotlottie-player>
      </div>
      
      <div className="text-container">
        <span className="large">{t("pc")}</span>
        <span className="medium">{t("at")}</span>
        <span className="large">{t("tip")}</span>
      </div>
    </div>
  );
};

export { HomePageAnimation };
