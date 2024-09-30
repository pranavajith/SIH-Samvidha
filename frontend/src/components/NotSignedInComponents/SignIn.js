import React, { useContext, useState } from "react";
import "./../../styles/SignIn.css";
import { Link, useLocation, useNavigate } from "react-router-dom";
import { UserContext } from "../../context/UserContext";
import Banner from "../general-components/Banner";
import "./../../utils/i18n";
import { useTranslation } from "react-i18next";
const SignIn = () => {
  const navigate = useNavigate();
  const { login } = useContext(UserContext);
  const location = useLocation();
  const bannerMessage = location.state?.message;
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    login();
    navigate("/user");
    e.preventDefault();

    // Add form validation and submission logic
    console.log("Login form submitted:", formData);
  };
  const { t } = useTranslation();
  return (
    <>
      {bannerMessage && <Banner message={bannerMessage} />}
      <div className="signin-container">
        <h1 className="signin-title">{t("wlcm")}</h1>
        <form className="signin-form" onSubmit={handleSubmit}>
          <div className="form-group">
            <label htmlFor="email">
              <span role="img" aria-label="email">
                📧
              </span>{" "}
              {t("email")}
            </label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              placeholder={t("emailh")}
              required
            />
          </div>
          <div className="form-group">
            <label htmlFor="password">
              <span role="img" aria-label="lock">
                🔒
              </span>{" "}
              {t("pass")}
            </label>
            <input
              type="password"
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              placeholder={t("passh")}
              required
            />
          </div>
          <button type="submit" className="signin-button">
            <span role="img" aria-label="key">
              🔑
            </span>{" "}
            {t("login")}
          </button>
        </form>
        <div className="signin-footer">
          <p>
            {t("accna")}
            <Link to="/signup">{t("sup")}</Link>
          </p>
        </div>
      </div>
    </>
  );
};

export default SignIn;
