import "./../../../styles/HomePageUserLogInButtons.css";
import { Link } from "react-router-dom"; // Import Link for navigation
import { useTranslation } from "react-i18next";
// can add icons to timeline
// can add learn more button at end
import "./../../../utils/i18n";
const HomePageUserLogInButtons = () => {
  const {t} = useTranslation();
  return (
    <div className="button-container">
      <Link to="/signup" className="signup-login-button">
        {t("sup")}
      </Link>
      <br />
      <Link to="/signin" className="signup-login-button login-button">
        {t("ahvac")}
      </Link>
    </div>
  );
};

export { HomePageUserLogInButtons };
