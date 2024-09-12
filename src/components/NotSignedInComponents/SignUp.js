import React, { useState } from "react";
import "./../../styles/SignUp.css";
import { Link } from "react-router-dom"; // Import Link for navigation

const SignUp = () => {
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Add form validation and submission logic
    console.log("Form submitted:", formData);
  };

  return (
    <div className="signup-container">
      <h1 className="signup-title">Create an Account</h1>
      <form className="signup-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="username">
            <span role="img" aria-label="user">
              👤
            </span>{" "}
            Username
          </label>
          <input
            type="text"
            id="username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            placeholder="Enter your username"
            required
          />
        </div>
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
        <div className="form-group">
          <label htmlFor="confirmPassword">
            <span role="img" aria-label="lock">
              🔑
            </span>{" "}
            Confirm Password
          </label>
          <input
            type="password"
            id="confirmPassword"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder="Confirm your password"
            required
          />
        </div>
        <button type="submit" className="signup-button">
          <span role="img" aria-label="rocket">
            🚀
          </span>{" "}
          Sign Up
        </button>
      </form>
      <div className="signup-footer">
        <p>
          Already have an account? <Link to="/signin">Sign in here</Link>
        </p>
      </div>
    </div>
  );
};

export default SignUp;
