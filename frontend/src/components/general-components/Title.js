import "./../../styles/Title.css";
import { Link } from "react-router-dom";
import "./../../utils/i18n";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "../NotSignedInComponents/LanguageSwitcher";
const TitleBar = () => {
  const { t } = useTranslation();
  return (
    <nav className="navbar">
      <Link to="/">
        <h1 className="navbar-brand">{t("Samvidhan")}</h1>
      </Link>
      <ul className="navbar-menu">
        <li className="navbar-item">
          <Link to="/about" className="navbar-button">
            {t("About")}
          </Link>
        </li>
        <li className="navbar-item">
          <Link to="/timeline" className="navbar-button">
            {t("timeline")}
          </Link>
        </li>
        <li className="navbar-item">
          <Link to="/demo" className="navbar-button">
            {t("Demo")}
          </Link>
        </li>
        <li className="navbar-item">
          <LanguageSwitcher />
        </li>
        <li className="navbar-item">
          <Link to="/signin" className="navbar-button">
            {t("Signin")}
          </Link>
        </li>
      </ul>
    </nav>
  );
};

export { TitleBar };
