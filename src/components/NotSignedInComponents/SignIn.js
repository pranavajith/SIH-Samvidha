import React, { useContext, useState } from "react";
import "./../../styles/SignIn.css";
import { Link } from "react-router-dom";
import { UserContext } from "../../context/UserContext";

const SignIn = () => {
  const { login } = useContext(UserContext);
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
    e.preventDefault();

    // Add form validation and submission logic
    console.log("Login form submitted:", formData);
  };

  return (
    <div className="signin-container">
      <h1 className="signin-title">Welcome Back!</h1>
      <form className="signin-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="email">
            <span role="img" aria-label="email">
              📧
            </span>{" "}
            Email
          </label>
          <input
            type="email"
            id="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">
            <span role="img" aria-label="lock">
              🔒
            </span>{" "}
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            placeholder="Enter your password"
            required
          />
        </div>
        <button type="submit" className="signin-button">
          <span role="img" aria-label="key">
            🔑
          </span>{" "}
          Log In
        </button>
      </form>
      <div className="signin-footer">
        <p>
          Don't have an account? <Link to="/signup">Sign up here</Link>
        </p>
      </div>
    </div>
  );
};

export default SignIn;
