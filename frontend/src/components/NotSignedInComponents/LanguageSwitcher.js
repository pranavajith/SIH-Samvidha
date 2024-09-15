// LanguageSwitcher.js (Modified)
import React, { useState } from "react";
import { useTranslation } from "react-i18next";
import "./../../styles/LanguageSwitcher.css";

function LanguageSwitcher() {
  const { i18n } = useTranslation(); // Get i18n from the useTranslation hook
  const [language, setLanguage] = useState("en"); // Default to English

  const changeLanguage = (selectedLanguage) => {
    setLanguage(selectedLanguage);
    i18n.changeLanguage(selectedLanguage); // Use i18n to change the language
  };
  const { t } = useTranslation();
  return (
    <div>
      {/* <label htmlFor="language">Choose Language: </label> */}
      <select
        className="language-selector-input"
        value={language}
        onChange={(e) => changeLanguage(e.target.value)}
      >
        <option value="en">Language: English</option>
        <option value="hi">भाषा: हिन्दी</option>
        <option value="te">భాష: తెలుగు</option>
        {/* Everything below is not functional.  */}
        <option value="en">ভাষা: বাংলা</option>
        <option value="en">ഭാഷ: മലയാളം</option>
        <option value="en">மொழி: தமிழ்</option>
        <option value="en">ಭಾಷೆ: ಕನ್ನಡ</option>
      </select>
    </div>
  );
}

export default LanguageSwitcher;
