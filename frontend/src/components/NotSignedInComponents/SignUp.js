import React, { useState, useEffect } from "react";
import "./../../styles/SignUp.css";
import { Link, useNavigate } from "react-router-dom"; // Import Link for navigation
import { urlList } from "../../urls";
import { useNarration } from '../../context/NarrationContext';
import { getNarrationText } from '../../utils/narrationData';
import axios from "axios"; // Import Axios

const SignUp = () => {
  const { isNarrationActive, toggleNarration, narrate } = useNarration();

  useEffect(() => {
    if (isNarrationActive) {
      narrate(getNarrationText("SignUp"));
    }
  }, [isNarrationActive, narrate]);
  
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
    dob: "",
  });

  const navigate = useNavigate();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevFormData) => ({
      ...prevFormData,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords do not match!");
      return;
    }

    // Create the user data object to be sent to the backend
    const userData = {
      firstName: formData.firstName,
      lastName: formData.lastName,
      username: formData.username,
      email: formData.email,
      dob: formData.dob, // Add Date of Birth field
      completedLevels: [], // Default empty array
      multiPlayerScore: 0, // Default multiplayer score
      streakData: {
        latestPlayed: "0000-00-00", // Dummy value for streak data
        latestStreakStartDate: "0000-00-00", // Dummy value for streak start date
      },
      userProfileImage: {
        format: "url",
        path: "https://png.pngtree.com/background/20230528/original/pngtree-photo-of-a-girl-in-sunglasses-picture-image_2778708.jpg", // Default image
      },
      password: formData.password,
      ongoingLevel: 1,
      badges: [],
      longestStreak: 0,
    };

    try {
      const response = await axios.post(
        `${urlList.backendDatabase}/user/add`,
        userData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.status === 201) {
        console.log("User added successfully");
        navigate("/signin"); // Redirect to sign-in page on success
      }
    } catch (error) {
      console.error(
        "Error:",
        error.response ? error.response.data : error.message
      );
      alert(
        "Error signing up: " +
          (error.response ? error.response.data.message : error.message)
      );
    }
  };

  return (
    <div className="signup-container">
      <h1 className="signup-title">Create an Account</h1>
      <form className="signup-form" onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="firstName">First Name</label>
          <input
            type="text"
            id="firstName"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            placeholder="Enter your first name"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="lastName">Last Name</label>
          <input
            type="text"
            id="lastName"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            placeholder="Enter your last name"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="username">Username</label>
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
          <label htmlFor="email">Email</label>
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
          <label htmlFor="dob">Date of Birth</label>
          <input
            type="date"
            id="dob"
            name="dob"
            value={formData.dob}
            onChange={handleChange}
            placeholder="Enter your date of birth"
            required
          />
        </div>
        <div className="form-group">
          <label htmlFor="password">Password</label>
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
          <label htmlFor="confirmPassword">Confirm Password</label>
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
