import React from "react";
import { Link } from "react-router-dom";
import "./../../styles/Title.css";
import "./../../utils/i18n";
import { useTranslation } from "react-i18next";
import LanguageSwitcher from "../NotSignedInComponents/LanguageSwitcher";
import { useNarration } from "../../context/NarrationContext";
import { getNarrationText } from "../../utils/narrationData";

const TitleBar = () => {
  const { t } = useTranslation();
  const { isNarrationActive, toggleNarration, narrate } = useNarration();

  const handleNarrate = (textKey) => {
    narrate(getNarrationText(textKey));
  };

  return (
    <nav className="navbar">
      <Link to="/">
        <h1 className="navbar-brand" onClick={() => handleNarrate('Home')}>
          {t("Samvidhan")}
        </h1>
      </Link>
      <ul className="navbar-menu">
        <li className="navbar-item">
          <Link 
            to="/about" 
            className="navbar-button" 
            onClick={() => handleNarrate('About')}
          >
            {t("About")}
          </Link>
        </li>
        <li className="navbar-item">
          <Link 
            to="/timeline" 
            className="navbar-button" 
            onClick={() => handleNarrate('Timeline')}
          >
            {t("timeline")}
          </Link>
        </li>
        <li className="navbar-item">
          <Link 
            to="/demo" 
            className="navbar-button" 
            onClick={() => handleNarrate('Demo')}
          >
            {t("Demo")}
          </Link>
        </li>
        <li className="navbar-item">
          <LanguageSwitcher />
        </li>
        <li className="navbar-item">
          <Link 
            to="/signin" 
            className="navbar-button" 
            onClick={() => handleNarrate('SignIn')}
          >
            {t("Signin")}
          </Link>
        </li>
      </ul>
      <button onClick={toggleNarration} className="navbar-button">
        {isNarrationActive ? "Stop Narration" : "Start Narration"}
      </button>
    </nav>
  );
};

export { TitleBar };
